document.addEventListener('DOMContentLoaded', () => {
    let fullData = [];
    let priceChart, volumeChart;

    const ctxPrice = document.getElementById('stockChart').getContext('2d');
    const ctxVolume = document.getElementById('volumeChart').getContext('2d');
    const statusText = document.getElementById('status-text');
    const retryBtn = document.getElementById('retry-btn');

    const updateStatus = (msg, isError = false) => {
        statusText.textContent = msg;
        statusText.style.color = isError ? '#ff3e3e' : '#00ff88';
        if (isError) retryBtn.style.display = 'block';
        else retryBtn.style.display = 'none';
    };

    const updateStats = (data) => {
        if (!data || data.length === 0) return;
        const prices = data.map(d => d.Close);
        const max = Math.max(...prices);
        const min = Math.min(...prices);

        document.querySelector('#stat-max .value').textContent = `R$ ${max.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        document.querySelector('#stat-min .value').textContent = `R$ ${min.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    };

    const createCharts = (data) => {
        if (typeof Chart === 'undefined') {
            updateStatus('Erro: Biblioteca de gráficos não carregada (Chart.js). Verifique sua internet.', true);
            return;
        }
        const labels = data.map(d => {
            if (typeof d.Date === 'string') return d.Date.split(' ')[0];
            return d.Date;
        });
        const closePrices = data.map(d => d.Close);
        const volumes = data.map(d => d.Volume);

        const gradient = ctxPrice.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 242, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(112, 0, 255, 0)');

        if (priceChart) priceChart.destroy();
        if (volumeChart) volumeChart.destroy();

        priceChart = new Chart(ctxPrice, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Preço de Fechamento',
                    data: closePrices,
                    borderColor: '#00f2ff',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    fill: true,
                    backgroundColor: gradient,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                scales: {
                    x: { display: false },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            callback: (value) => `R$ ${value}`
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#00f2ff',
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false
                    }
                }
            }
        });

        volumeChart = new Chart(ctxVolume, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Volume',
                    data: volumes,
                    backgroundColor: 'rgba(112, 0, 255, 0.4)',
                    borderColor: '#7000ff',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } },
                plugins: { legend: { display: false } }
            }
        });
    };

    const filterData = (range) => {
        if (fullData.length === 0) return;
        let filtered;
        const lastEntry = fullData[fullData.length - 1];
        if (!lastEntry || !lastEntry.DateObj) {
            filtered = fullData;
        } else {
            const now = new Date(lastEntry.DateObj);
            if (range === 'last1') {
                const oneYearAgo = new Date(now);
                oneYearAgo.setFullYear(now.getFullYear() - 1);
                filtered = fullData.filter(d => d.DateObj >= oneYearAgo);
            } else if (range === 'last5') {
                const fiveYearsAgo = new Date(now);
                fiveYearsAgo.setFullYear(now.getFullYear() - 5);
                filtered = fullData.filter(d => d.DateObj >= fiveYearsAgo);
            } else {
                filtered = fullData;
            }
        }
        createCharts(filtered);
        updateStats(filtered);
    };

    const processData = (data, isLive) => {
        try {
            fullData = data.filter(row => row.Date).map(row => {
                let d = row.Date;
                // Fix potential string format issues
                if (typeof d === 'string' && d.includes('/')) {
                    // unexpected format handling if necessary, but standard constructor usually works for MM/DD/YYYY
                    // If DD/MM/YYYY is suspected and causing issues, we might need manual parse.
                    // For now, let's assume standard behavior or ISO.
                }
                return {
                    ...row,
                    DateObj: new Date(row.Date),
                    Close: parseFloat(row.Close) || 0,
                    Volume: (typeof row.Volume === 'string' && row.Volume.includes('-'))
                        ? parseFloat(row.Volume.split('-')[0])
                        : parseFloat(row.Volume) || 0
                };
            }).filter(row => !isNaN(row.DateObj.getTime())) // Filter out invalid dates
            .sort((a, b) => a.DateObj - b.DateObj);

            if (fullData.length === 0) throw new Error("Dataset vazio após processamento");

            updateStatus(isLive ? '● Dados em tempo real conectados' : '● Usando dados locais (Modo Offline)', !isLive);
            filterData('all');
        } catch (e) {
            console.error(e);
            updateStatus('Erro ao processar dados. Tentando backup...', true);
            if (isLive) loadFallback("Erro de processamento");
        }
    };


    const loadLocalData = () => {
        if (typeof STOCK_DATA !== 'undefined' && Array.isArray(STOCK_DATA)) {
            processData(STOCK_DATA, false);
            updateStatus('● Banco de dados local carregado (v4)');
        } else {
            updateStatus('Erro: Banco de dados local não encontrado.', true);
        }
    };

    const syncWithMarket = () => {
        updateStatus('Sincronizando com o mercado real...');
        // Using the Gviz URL as a way to get the latest row from the published sheet if available
        // or we can use a simpler approach to just simulate or fetch a price.
        // For this project, we'll try to fetch from the general sheet again but ONLY on demand.
        const SYNC_URL = `https://docs.google.com/spreadsheets/d/1vkqc4wkgaXAZrZs_kWy8P8tMX8GullMy6hdWoKOt0pU/gviz/tq?tqx=out:csv&gid=1653202204&t=${new Date().getTime()}`;

        Papa.parse(SYNC_URL, {
            download: true,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data && results.data.length > 5) {
                    // Merge live data with local data to avoid gaps
                    const merged = [...STOCK_DATA];
                    const existingDates = new Set(merged.map(d => d.Date));

                    results.data.filter(row => row.Date).forEach(row => {
                        if (!existingDates.has(row.Date)) {
                            merged.push(row);
                        }
                    });

                    processData(merged, true);
                    updateStatus('● Sincronizado com sucesso! (Dados ao vivo adicionados)');
                } else {
                    updateStatus('Aviso: Nenhum dado novo encontrado na rede.', true);
                }
            },
            error: (err) => {
                updateStatus('Erro de conexão ao sincronizar. Tente mais tarde.', true);
            }
        });
    };

    // Initialize with local data first
    loadLocalData();

    document.getElementById('sync-btn').addEventListener('click', syncWithMarket);
    retryBtn.addEventListener('click', syncWithMarket);

    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterData(e.target.dataset.range);
        });
    });
});

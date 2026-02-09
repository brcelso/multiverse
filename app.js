// Premium Dashboard Logic - Clean Slate Version
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    console.log("Initializing Dashboard...");
    const statusBadge = document.getElementById('status-badge');

    // 1. Validate Data Source
    if (typeof STOCK_DATA === 'undefined' || !Array.isArray(STOCK_DATA)) {
        console.error("Critical: STOCK_DATA not found.");
        statusBadge.textContent = "Data Error";
        statusBadge.style.background = "#ff4444";
        alert("Erro: Banco de dados não encontrado. Verifique stock_db.js.");
        return;
    }

    // 2. Process Data
    // We expect STOCK_DATA items to have: Date (YYYY-MM-DD HH:mm:ss), Close, Volume
    const cleanData = STOCK_DATA.map(item => {
        // Fix space in ISO string for Safari/Older browsers support: "2023-01-01 10:00" -> "2023-01-01T10:00"
        const dateStr = item.Date.replace(' ', 'T');
        const dateObj = new Date(dateStr);

        return {
            date: dateObj,
            close: parseFloat(item.Close),
            volume: parseFloat(item.Volume || 0)
        };
    })
        .filter(item => !isNaN(item.date.getTime()) && !isNaN(item.close)) // Remove bad data
        .sort((a, b) => a.date - b.date); // Sort chronological

    if (cleanData.length === 0) {
        statusBadge.textContent = "Empty Data";
        return;
    }

    console.log(`Loaded ${cleanData.length} valid records.`);

    // 3. Update Stats UI
    const lastRecord = cleanData[cleanData.length - 1];
    document.getElementById('last-close').textContent = lastRecord.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('last-date').textContent = lastRecord.date.toLocaleDateString('pt-BR');
    document.getElementById('total-records').textContent = cleanData.length;

    statusBadge.textContent = "Live System";
    statusBadge.style.background = "#00ff88";
    statusBadge.style.color = "#000";

    // 4. Render Chart
    renderChart(cleanData);
}

function renderChart(data) {
    const ctx = document.getElementById('mainChart').getContext('2d');

    // Create Graticules
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 255, 136, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 255, 136, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.date.toLocaleDateString('pt-BR')),
            datasets: [{
                label: 'Ibovespa (Pontos)',
                data: data.map(d => d.close),
                borderColor: '#00ff88',
                backgroundColor: gradient,
                borderWidth: 2,
                pointRadius: 0, // Clean look, no dots
                pointHoverRadius: 6,
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#00ff88',
                    displayColors: false
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#888', maxTicksLimit: 10 }
                },
                y: {
                    display: true,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#888' }
                }
            }
        }
    });
}

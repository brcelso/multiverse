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

    // 2. Process Data with Hybrid Parsing
    const cleanData = STOCK_DATA.map(item => {
        let dateObj;
        const d = item.Date;

        // Try parsing ISO format (YYYY-MM-DD...)
        if (d.includes('-')) {
            dateObj = new Date(d.replace(' ', 'T'));
        } else {
            // Legacy format (M/D/YYYY...) - leave spaces alone
            dateObj = new Date(d);
        }

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
    document.getElementById('total-records').textContent = cleanData.length.toLocaleString();

    statusBadge.textContent = "Live System";
    statusBadge.style.background = "#00ff88"; // Neon Green
    statusBadge.style.color = "#000";
    statusBadge.style.boxShadow = "0 0 10px #00ff88";

    // 4. Render Chart
    renderChart(cleanData);
}

function renderChart(data) {
    const ctx = document.getElementById('mainChart').getContext('2d');

    // Grafana Style Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 255, 136, 0.2)'); // Low opacity fill
    gradient.addColorStop(1, 'rgba(0, 255, 136, 0.0)');

    // Destroy existing chart if any (though currently we reload page)

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.date.toLocaleDateString('pt-BR')),
            datasets: [{
                label: 'Ibovespa',
                data: data.map(d => d.close),
                borderColor: '#00ff88', // Neon Green Line
                borderWidth: 1.5,
                backgroundColor: gradient,
                pointRadius: 0, // Clean line
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#fff',
                fill: true,
                tension: 0.2 // Slight curve
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
                    backgroundColor: 'rgba(16, 16, 16, 0.9)',
                    titleColor: '#888',
                    bodyColor: '#fff',
                    titleFont: { size: 10 },
                    bodyFont: { size: 14, weight: 'bold' },
                    borderColor: '#333',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false, // Hide X axis dates for cleaner look (Grafana style often minimizes clutter)
                    grid: { display: false }
                },
                y: {
                    position: 'right', // Stats on right like trading platforms
                    grid: {
                        color: 'rgba(255,255,255,0.03)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#666',
                        font: { size: 10 },
                        callback: function (value) {
                            return (value / 1000) + 'k';
                        }
                    }
                }
            }
        }
    });
}

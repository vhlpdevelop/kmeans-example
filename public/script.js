// Função para carregar os dados do backend
async function loadData() {
    const response = await fetch('/clustering');
    const data = await response.json();
    return data;
}

// Função para criar o gráfico de barras das interações
function createInteractionsChart(adTypes, centroids) {
    const ctx = document.getElementById('interactionsChart').getContext('2d');
    const datasets = centroids.map((centroid, index) => ({
        label: `Grupo ${index + 1}`,
        data: centroid,
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
        borderWidth: 1
    }));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: adTypes,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para criar o gráfico do método do cotovelo
function createElbowChart(wcssValues, optimalK) {
    const ctx = document.getElementById('elbowChart').getContext('2d');
    const kValues = wcssValues.map((_, index) => index + 1);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: kValues,
            datasets: [{
                label: 'WCSS',
                data: wcssValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            xMin: optimalK,
                            xMax: optimalK,
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                                content: `k = ${optimalK}`,
                                enabled: true,
                                position: 'end'
                            }
                        }
                    }
                }
            }
        }
    });
}

// Função principal
async function main() {
    const data = await loadData();
    createInteractionsChart(data.adTypes, data.centroids);
    createElbowChart(data.wcssValues, data.optimalK);
}

main();
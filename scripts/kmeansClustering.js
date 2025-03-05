const { kmeans } = require('ml-kmeans');
const generateFakeInteractions = require('../data/generateData');

// Função para transformar interações em uma matriz de features
function prepareData(interactions) {
    const userInteractions = {};

    // Agrupa interações por clientId
    interactions.forEach(interaction => {
        if (!userInteractions[interaction.clientId]) {
            userInteractions[interaction.clientId] = {
                clientId: interaction.clientId,
                interactions: {}
            };
        }

        if (!userInteractions[interaction.clientId].interactions[interaction.adType]) {
            userInteractions[interaction.clientId].interactions[interaction.adType] = 0;
        }

        userInteractions[interaction.clientId].interactions[interaction.adType] += 1;
    });

    // Converte para uma matriz de features
    const users = Object.values(userInteractions);
    const adTypes = ['Restaurant', 'Shop', 'Tech', 'FastFood', 'Bar', 'Passeio', 'Sorveteria', 'Hotel', 'Pousada'];

    const data = users.map(user => {
        return adTypes.map(adType => user.interactions[adType] || 0);
    });

    return { users, data, adTypes };
}

// Função para calcular o WCSS (Within-Cluster-Sum of Squares)
function calculateWCSS(data, centroids, clusters) {
    let wcss = 0;
    data.forEach((point, index) => {
        const centroid = centroids[clusters[index]];
        point.forEach((value, i) => {
            wcss += Math.pow(value - centroid[i], 2);
        });
    });
    return wcss;
}

// Função para encontrar o número ideal de grupos (k)
function findOptimalK(data, maxK = 10) {
    const wcssValues = [];
    for (let k = 1; k <= maxK; k++) {
        const result = kmeans(data, k);
        const wcss = calculateWCSS(data, result.centroids, result.clusters);
        wcssValues.push(wcss);
    }

    // Encontrar o ponto do "cotovelo"
    let optimalK = 1;
    let maxDiff = 0;
    for (let i = 1; i < wcssValues.length - 1; i++) {
        const diff = wcssValues[i - 1] - wcssValues[i];
        if (diff > maxDiff) {
            maxDiff = diff;
            optimalK = i + 1;
        }
    }

    return { optimalK, wcssValues };
}

// Função para atribuir um novo usuário a um grupo
function assignToGroup(newUserInteractions, centroids, adTypes) {
    const newUserVector = adTypes.map(adType => newUserInteractions[adType] || 0);

    // Calcula a distância euclidiana entre o novo usuário e cada centróide
    const distances = centroids.map(centroid => {
        let sum = 0;
        for (let i = 0; i < centroid.length; i++) {
            sum += Math.pow(centroid[i] - newUserVector[i], 2);
        }
        return Math.sqrt(sum);
    });

    // Retorna o grupo com a menor distância
    return distances.indexOf(Math.min(...distances)) + 1;
}

// Função para verificar se o usuário tem interações suficientes
function hasEnoughInteractions(interactions, minInteractions) {
    const totalInteractions = Object.values(interactions).reduce((sum, count) => sum + count, 0);
    return totalInteractions >= minInteractions;
}

// Função principal
async function runClustering() {
    // Gerar 1000 interações falsas
    const interactions = generateFakeInteractions(10000);

    // Preparar os dados para o K-Means
    const { users, data, adTypes } = prepareData(interactions);

    // Encontrar o número ideal de grupos
    const { optimalK, wcssValues } = findOptimalK(data);
    console.log(`Número ideal de grupos (k): ${optimalK}`);

    // Aplicar K-Means com o k ideal
    const result = kmeans(data, optimalK);

    // Exibir resultados
    console.log('Centróides dos grupos:', result.centroids);

    // Validar novas interações
    const newUserInteractions = { Restaurant: 5, Tech: 1, Sorveteria: 3, Hotel: 3 }; // Exemplo de novo usuário
    const MIN_INTERACTIONS = 5; // Número mínimo de interações

    if (hasEnoughInteractions(newUserInteractions, MIN_INTERACTIONS)) {
        const group = assignToGroup(newUserInteractions, result.centroids, adTypes);
        console.log(`Novo usuário atribuído ao Grupo ${group}`);
    } else {
        console.log('Usuário não tem interações suficientes para ser atribuído a um grupo.');
    }

    return { adTypes, centroids: result.centroids, wcssValues, optimalK };
}

module.exports = runClustering;
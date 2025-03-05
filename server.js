const express = require('express');
const path = require('path');
const runClustering = require('./scripts/kmeansClustering');

const app = express();
const PORT = 3000;

// Servir arquivos estáticos (HTML, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obter os dados do clustering
app.get('/clustering', async (req, res) => {
    try {
        const { adTypes, centroids, wcssValues, optimalK } = await runClustering();
        res.json({ adTypes, centroids, wcssValues, optimalK });
    } catch (error) {
        console.error('Erro ao gerar dados de clustering:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
const runClustering = require('../scripts/kmeansClustering');

async function testClustering() {
    try {
        console.log('Iniciando teste de clustering...');
        await runClustering();
        console.log('Teste de clustering concluído!');
    } catch (error) {
        console.error('Erro ao testar clustering:', error);
    }
}



module.exports = testClustering;
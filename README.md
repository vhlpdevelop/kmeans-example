# **Ambiente de Teste para Segmentação de Usuários com K-Means** 🚀

Este repositório contém um ambiente de teste desenvolvido em **Node.js** que utiliza o algoritmo **K-Means** para agrupar usuários com base em suas interações com diferentes tipos de anúncios. O projeto foi criado para simular um cenário real de segmentação de públicos, permitindo a identificação de perfis de usuários e a visualização dos resultados por meio de gráficos interativos.

---

## **Funcionalidades Principais** ✨

- **Geração de Dados Sintéticos:** Utiliza a biblioteca **Faker.js** para criar interações fictícias de usuários com anúncios de diversos tipos, como Restaurantes, Lojas, Tecnologia, Fast Food, Bares, Passeios, Sorveterias, Hotéis e Pousadas.
- **Clusterização com K-Means:** Aplica o algoritmo K-Means para agrupar os usuários com base em suas interações, identificando padrões de comportamento.
- **Método do Cotovelo:** Determina o número ideal de clusters (`k`) analisando a redução do WCSS (Within-Cluster-Sum of Squares).
- **Visualização de Dados:** Utiliza **Chart.js** para criar gráficos interativos que mostram:
  - A distribuição das interações por grupo.
  - O gráfico do método do cotovelo para identificar o número ideal de clusters.
- **API RESTful:** Expõe os resultados do clustering por meio de um endpoint, facilitando a integração com frontends ou outras aplicações.

---

## **Tecnologias Utilizadas** 🛠️

- **Backend:**
  - Node.js
  - Express
  - ml-kmeans (para implementação do K-Means)
- **Frontend:**
  - Chart.js (para visualização dos dados)
- **Ferramentas:**
  - Faker.js (para geração de dados sintéticos)

---

## **Como Executar o Projeto** ▶️

### **Pré-requisitos**
- Node.js (v18 ou superior)
- NPM ou Yarn

### **Passos para Execução**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ambiente-teste-kmeans.git
   cd ambiente-teste-kmeans
2. **Instale as dependencias:**
   ```bash
   npm install
3. **Execute o servidor:**
   ```bash
   node server.js
4. **Acesse a aplicação**
   ```bash
   http://localhost:3000
5. **Visualize os gráficos**
   - O gráfico de Interações por Grupo mostra a distribuição das interações por tipo de anúncio em cada cluster.
   - O gráfico do Método do Cotovelo ajuda a identificar o número ideal de clusters.
  
## **Estrutura do Projeto ** 📂

ambiente-teste-kmeans/
├── public/              # Arquivos estáticos (HTML, JS)
│   ├── index.html       # Página principal
│   └── script.js        # Lógica de visualização com Chart.js
├── scripts/             # Lógica de clusterização
│   ├── kmeansClustering.js  # Implementação do K-Means
│   └── clusteringTests.js   # Testes de clusterização
├── data/                # Geração de dados sintéticos
│   └── generateData.js  # Script para gerar interações fictícias
├── server.js            # Servidor Express
├── package.json         # Dependências do projeto
└── README.md            # Este arquivo


## **EXEMPLOS DE USO ** 💡
Endpoint da API
- **GET /clustering:**
  Retorna os dados do clustering, incluindo:
  - adTypes: Lista de tipos de anúncio.
  - centroids: Centróides dos clusters.
  - wcssValues: Valores de WCSS para o método do cotovelo.
  - optimalK: Número ideal de clusters.
- **Gráficos:**
  - Interações por Grupo:
    Um gráfico de barras que mostra a distribuição das interações por tipo de anúncio em cada cluster.
  - Método do Cotovelo:
    Um gráfico de linha que ajuda a identificar o número ideal de clusters.
    
## **LICENÇA ** 📜
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

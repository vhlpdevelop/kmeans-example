const { faker } = require('@faker-js/faker');

function generateFakeInteractions(numInteractions) {
    const adTypes = ['Restaurant', 'Shop', 'Tech', 'FastFood', 'Bar', 'Passeio', 'Sorveteria', 'Hotel', 'Pousada'];
    const interactions = [];

    for (let i = 0; i < numInteractions; i++) {
        const interaction = {
            clientId: faker.string.uuid(), // UUID do usuário
            adID: faker.database.mongodbObjectId(), // ID da propaganda
            action: faker.helpers.arrayElement(['click', 'view']), // Ação (click ou view)
            adType: faker.helpers.arrayElement(adTypes), // Tipo de propaganda
            dst_url: faker.internet.url(), // URL de destino
            dst_active: faker.datatype.boolean(), // dst_url está ativa?
            cta_active: faker.datatype.boolean(), // cta_text está ativo?
            cta_text: faker.lorem.words(3), // Texto de call-to-action
            duration: faker.helpers.arrayElement([5, 10]), // Duração da propaganda (5 ou 10 segundos)
            timestamp: faker.date.past() // Data e hora da interação
        };
        interactions.push(interaction);
    }

    return interactions;
}

module.exports = generateFakeInteractions;
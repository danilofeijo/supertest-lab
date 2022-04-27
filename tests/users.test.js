const request = require('supertest');


const baseUrl = 'https://serverest.dev';
const routeUsuarios = '/usuarios';

describe('GET' + routeUsuarios, () => {
  it('List all users', async () => {
    const response = await request(baseUrl).get(routeUsuarios).expect(200);
    // console.log(response.status);
    // console.log(response.body);

    // TODO Instalar e utilizar o Chai para validação
  });
});

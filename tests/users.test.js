const request = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;

const baseUrl = 'https://serverest.dev';
const routeUsuarios = '/usuarios';

describe('GET' + routeUsuarios, () => {
  it('List all users', async () => {
    // Action
    const response = await request(baseUrl).get(routeUsuarios).expect(200);

    // Assertions
    expect(response.body).to.have.property('quantidade');
    expect(response.body).to.have.property('usuarios');
  });
});

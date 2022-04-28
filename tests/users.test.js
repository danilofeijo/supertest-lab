const request = require('supertest')
const assert = require('chai').assert
const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))

const baseUrl = 'https://serverest.dev'
const routeUsuarios = '/usuarios'

describe('GET' + routeUsuarios, () => {
  it('Return all users', async () => {
    // Arrange
    const resSchema = {
      title: 'Expected Schema',
      type: 'object',
      required: ['quantidade', 'usuarios'],
      properties: {
        quantidade: { type: 'number' },
        usuarios: { type: 'array' },
      }
    }

    // Act
    const res = await request(baseUrl).get(routeUsuarios).expect(200)
    
    // Assert
    expect(res.body).to.be
      .jsonSchema(resSchema)
      .and.have.keys('quantidade', 'usuarios')
  })

  it('Return empty result', async () => {
    // Arrange
    const resSchema = {
      title: 'Expected Schema',
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string' },
      }
    }

    // Act
    const userId = 'notexist0123'
    const res = await request(baseUrl).get(routeUsuarios + '/' + userId).expect(400)

    // Assert
    expect(res.body, 'Faltou propriedade').to.be
      .jsonSchema(resSchema)
      .and.have.keys('message')
  })

  it('Return user by ID', async() => {
    // Arrange
    const userData = {
      nome: 'Fulano da Silva',
      email: 'fulano@qa.com',
      password: 'teste',
      administrador: 'true',
      _id: '0uxuPY0cbmQhpEz1'
    }
    const resSchema = {
      title: 'Expected Schema',
      type: 'object',
      required: ['nome', 'email', 'password', 'administrador' ,'_id'],
      properties: {
        nome: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        administrador: { type: 'string' },
        _id: { type: 'string' },
      }
    }

    // Act
    const res = await request(baseUrl).get(routeUsuarios + '/' + userData._id).expect(200)

    // Assert
    expect(res.body).to.be
      .jsonSchema(resSchema)
      .and.eql(userData)

    expect(res.body).to.have.property('nome', userData.nome)
    expect(res.body).to.have.property('email', userData.email)
    expect(res.body).to.have.property('password', userData.password)
    expect(res.body).to.have.property('administrador', userData.administrador)
    expect(res.body).to.have.property('_id', userData._id)
  })
})

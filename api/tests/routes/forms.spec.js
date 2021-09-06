const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app')
const {Form, conn} = require('../../src/db')

const agent = session(app)

const form = {
    name: 'Nueva encuesta',
    description: 'Encuesta de prueba',
    questions: [
        {
            text: 'Pregunta',
            question_type: 'sm',
            options: ['opc1', 'opc2', 'opc3']
        }
    ]
}

const badForm ={
    name: ''
}

describe('Forms routes', () => {
    before(() => conn.authenticate()
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    })
    )
    beforeEach(() => Form.sync({force: true})
    .then(() => Form.create(form)))
    describe('GET /forms/1', () => {
        it('sould get 200', () => 
        agent.get('/forms/1').expect(200)
        )
    })
})
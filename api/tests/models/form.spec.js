const {Form, conn} = require('../../src/db')
const {expct} = require('chai');


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

describe('Form model', () => {
    before(() => conn.authenticate()
    .catch((err) => {
        console.error('Unable to connect to the database:', err)
    }));
    describe('Validators', () => {
        beforeEach(() => Form.sync({ force: true}))
        describe('name', () =>{
            it('should throw an error if name is null', (done) => {
                Form.create({})
                .then(() => done(new Error('It requires a valid name')))
                .catch(() => done())
            })
        })
    })
})
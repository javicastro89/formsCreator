const router = require('express').Router()
const { Form, Question, Option } = require('../db');



router.get('/forms/:id', async (req, res) => {

    const form = await Form.findByPk(req.params.id, {
        include: { all: true, nested: true}
    })

    if (form === null) {
        return res.sendStatus(400).send({message: 'Form does not exist'})
    }

    return res.send()


})


router.post('/forms', (req, res) => {
    const {form} = req.body

    console.log(form)

})


module.exports= router;
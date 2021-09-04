const router = require('express').Router()
const { Form, Question, Option } = require('../db');



router.get('/forms/:id', async (req, res) => {


    const form = await Form.findByPk(req.params.id, {
        include: { all: true, nested: true }
    })

    if (form === null) {
        return res.status(400).json({ message: 'Form does not exist' })
    }

    const response = {
        id: form.dataValues.id,
        name: form.dataValues.name,
        description: form.dataValues.description,
        questions: []
    }

    for (let i = 0; i < form.Questions.length; i++) {
        response.questions.push({
            id: form.Questions[i].dataValues.id,
            question_type: form.Questions[i].dataValues.question_type,
            text: form.Questions[i].dataValues.text,
            options: []
        })
        if (form.Questions[i].dataValues.question_type.toLoweCase() !== 'texto') {
            for (let j = 0; j < form.Questions[i].Options.length; j++) {

                response.questions[i].options.unshift(
                    form.Questions[i].Options[j].dataValues.option
                )

            }
        }
    }

    return res.json(response)

})


router.post('/forms', async (req, res) => {
    const { form } = req.body

    try {

        let newForm = await Form.create({
            name: form.name,
            description: form.description,
        })

        while (form.questions.length) {
            let question = form.questions.shift()

            let newQuestion = await Question.create({
                question_type: question.question_type,
                text: question.text
            })

            await newForm.addQuestions(newQuestion)

            if (question.options.length > 0) {
                while (question.options.length) {
                    let option = question.options.pop()

                    let newOption = await Option.create({
                        option: option
                    })

                    await newQuestion.addOption(newOption)

                }
            }
        }


        let lastForm = await Form.findAll()
        // console.log(lastForm[0].Questions[0].Options[0])
        // console.log(lastForm[0].Questions[0].Options[1])
        return res.json({ message: 'Form created', formId: lastForm[lastForm.length - 1].dataValues.id })
    } catch (error) {
        console.log(error)
    }


})


module.exports = router;


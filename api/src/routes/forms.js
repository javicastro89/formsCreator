const router = require('express').Router()
const { Form, Question, Option } = require('../db');



router.get('/forms/:id', async (req, res) => {

    
        const form = await Form.findByPk(req.params.id, {
            include: { all: true, nested: true}
        })

        if (form === null) {
            return res.status(400).json({message: 'Form does not exist'})
        }
        
        console.log(form.dataValues.name)
        console.log(form.dataValues.description)
        form.Questions.map(e => {console.log(e.dataValues.question_type)
        console.log(e.dataValues.text)}
        )
        return res.send()


})


router.post('/forms', async (req, res) => {
    const {form} = req.body
    console.log('aca noo ehh')
    try {
        console.log('aca noo ehh')

    let newForm = await Form.create({        
            name: form.name,
            description: form.description,
    })

    
    // let questions = form.questions.map(async question => {
    //     let newQuestion = await Question.create({
    //         question_type: question.question_type,
    //         text: question.text
    //     })

    //     await newForm.addQuestions(newQuestion)
    //     console.log('Estamos por aca ?')
    //     question.options.map(async option => {
    //         let newOption = await Option.create({
    //             option: option
    //         })

    //         await newQuestion.addOption(newOption)

    //     })
    //     }
    //     )    
    
    
    // console.log('Questions', questions)

    while (form.questions.length) {
        let question = form.questions.shift()

        let newQuestion = await Question.create({
            question_type: question.question_type,
            text: question.text
        })

        await newForm.addQuestions(newQuestion)

        if (question.options.length > 0){
        while (question.options.length){
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
    return res.json({message: 'Form created', formId: lastForm[lastForm.length-1].dataValues.id})
} catch (error) {
    console.log(error)    
}
    

})


module.exports= router;


// {
//     "form": {
//     "name": "las bolas",
//     "description": "Que queri?",
//     "questions": [
//     {
//     "question_type": "ocicione",
//     "text": "Elegi una",
//     "options": ["Option 1", "Option 2", "Option 3"]
//     },
//     {
//     "question_type": "si occione",
//     "text": "No podes elegir",
//     "options": []
//     }
//     ]
//     }
// }
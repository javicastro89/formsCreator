export default function validate(form, setMsg) {
    console.log(form)
    let error = {}
    if (!form.name) error.name = 'El título de la encuesta es requerido'
    if(!form.description) error.description = 'La descripción es requerida'
    if(form.questions.length === 0) error.question = 'Debe agregar al menos una pregunta'

    for (let i = 0; i < form.questions.length; i++) {
        if (form.questions[i] !== null && form.questions[i].text === '') {
            error.question = 'Todas las preguntas deben estar completas'
        }
        if (form.questions[i].question_type !== 'text') {
            console.log(form.questions[i].options.length)
            if (form.questions[i].options.length === 0) error.option = 'Agregar opción en preguntas de selección'
            for (let j = 0; j < form.questions[i].options.length; j++) {
                if (form.questions[i].options[j] === '')
                error.opttion = 'Todas las opciones deben estar completas'
            }
        }
    }
    console.log('andamos por acá ?')
    if (Object.values(error).length > 0) setMsg(() => true)
    else setMsg(() => false)

    return error
}

import { useState, useEffect } from "react"
// import {v4} from 'uuid'

export default function QuestionType({type, index, setForm, form}) {
    
    const [options, setOptions] = useState({ 0: "" });

    const handleChange = (event) => {
        setOptions(() => {return {
            ...options,
            [event.target.name]: event.target.value
        }})  
        options[event.target.name] = event.target.value
        let optionsQuestion = Object.values(options).slice()
        form.questions[index].options = optionsQuestion
        setForm({
            ...form,
            questions: form.questions
        })

    }

    const handleOptions = (event) => {
        event.preventDefault()
        
        if (event.target.value === 'quit') {
            
            delete form.questions[index].options[event.target.name]
            delete options[event.target.name]

            let arrOptions = Object.values(options)
            
            let newObject = {}

            form.questions[index].options = arrOptions.map((element, index) => newObject[index] = element)
            setForm({
                ...form,
                questions: form.questions
            })
            setOptions(newObject)
            
        } else {

            setOptions({
                ...options, 
                [Object.values(options).length]: ''
            })
        }
    }

    useEffect(() => {}, [options])

    
    
    if (type === 'ss' || type === 'sm'){
        return (
            <div>
                {Object.values(options).map((element, index) => 
                <div key={index}>
                    <label htmlFor='option'>Opción {index+1}</label>
                    <input type='text' name={index} value={options[index]} id='option' onChange={handleChange} />
                    <button name={index} value='quit' onClick={handleOptions}>-</button>
                </div>
                )}
                <input type='submit' value='Agregar opción' onClick={handleOptions} />
            </div>
        )
    } 

    return (
        <div>
            
        </div>
    )
}

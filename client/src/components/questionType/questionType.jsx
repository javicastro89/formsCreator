import { useState, useEffect } from "react"
import './questionType.css'
import {MdAddCircle} from 'react-icons/md'

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
        console.log('Llegamos acá', event.target.value)
        console.log('Llegamos acá', event.target.name)
        console.log('Llegamos acá', event.target.id)
        if (event.target.value === 'quit' || event.target.id === 'quit') {
            console.log('Llegmos por acá, no?')
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
            
        } else if (event.target.value === 'add') {

            setOptions({
                ...options, 
                [Object.values(options).length]: ''
            })
        }
    }

    useEffect(() => {}, [options])

    
    
    if (type === 'ss' || type === 'sm'){
        return (
            <div className='questionType'>
                {Object.values(options).map((element, index) => 
                <div className='options' key={index}>
                    <input type='text' name={index} value={options[index]} id={index} onChange={handleChange} placeholder={`Opción ${index+1}`} />
                    <button className='bttn-' name={index} value='quit' id='quit' onClick={handleOptions}>x</button>
                </div>
                )}
                {/* <input className='agregarOpción' type='submit' value='Agregar opción' onClick={handleOptions} /> */}
                <button value='add' className='agregarOpción' onClick={handleOptions}><MdAddCircle/>Agregar opción</button>
            </div>
        )
    } 

    return (
        <div>
            
        </div>
    )
}

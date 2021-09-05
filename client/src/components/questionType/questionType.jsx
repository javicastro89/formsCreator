import {useState} from 'react'
import {v4} from 'uuid';

export default function QuestionType({type, setOptions, options}) {
    const [optionsQuantity, setOptionsQuantity] = useState(['option1'])
    

    const handleChange = (event) => {
        setOptions({
            ...options,
            [event.target.name]: event.target.value
        })  
    }

    const hanldeOptions = (event) => {
        event.preventDefault()
        
        if (event.target.value === 'quit') {
            
            let newQuantity = optionsQuantity.slice()
            newQuantity.splice(event.target.name, 1)
         
            setOptionsQuantity(() => newQuantity)
            delete options[event.target.name]
            let arrOptions = Object.values(options)
            let newObject = {}
            arrOptions.map((element, index) => newObject[index] = element)
            
            setOptions(newObject)
            
        } else {
            setOptionsQuantity([...optionsQuantity, `option${optionsQuantity.length+1}`])
            setOptions({
                ...options, 
                [Object.values(options).length]: ''
            })

        }
    }
    
    if (type === 'ss' || type === 'sm'){
        return (
            <div>
                {optionsQuantity.map((element, index) => 
                <div key={index}>
                    <label htmlFor='option'>Opción {index+1}</label>
                    <input type='text' name={index} value={options[index]} id='option' onChange={handleChange} />
                    <button name={index} value='quit' onClick={hanldeOptions}>-</button>
                </div>
                )}
                <input type='submit' value='Agregar opción' onClick={hanldeOptions} />
            </div>
        )
    } 

    return (
        <div>
            
        </div>
    )
}

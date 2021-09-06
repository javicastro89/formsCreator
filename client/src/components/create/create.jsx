// import { useState } from 'react';
import QuestionType from '../questionType/questionType';
import {MdAddCircle} from 'react-icons/md'
import './create.css'

export default function Create({form, setForm}) {
  
  // const [form, setForm] = useState({
  //   name: '',
  //   description: '',
  //   questions: [],
  // });

  const handleSelect = (event) => {
    console.log('dentro de select',form.questions[event.target.id][event.target.name])
    form.questions[event.target.id][event.target.name] = event.target.value
    console.log('La form questions', form.questions)
    setForm(() => {return {
      ...form,
      questions: form.questions
    }})
  };

  const handleQuestions = (event) => {
    event.preventDefault();

    setForm({
      ...form,
      questions: [...form.questions, {question_type: '', text: '', options: [],}]
    })
    
  };

  const handleForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const eraseQuestion = (event) => {
    event.preventDefault()
    form.questions[event.target.name] = null
    setForm({
      ...form,
      questions: form.questions
    })
  }
  
  return (
    <div className='form'>
      <header>
      <h1>Creación de encuestas</h1>
      </header>
      <form >
      <div className='title'>
          <input
            type='text'
            name='name'
            id='titulo'
            placeholder='Título'
            onChange={handleForm}
          />
          </div>
          <div className='description'>
          <input
            type='text'
            name='description'
            id='description'
            placeholder='Descripción'
            onChange={handleForm}
          />
        </div>
        {form.questions.map((element, index) => 
            <div key={index} >
              {element === null ? null : <div className='questAndBttn'>
                <div className='questionContainer'>
                <div className='question'>
              
              <select name='question_type' id={index} onChange={handleSelect}>
                <option value='' defaultValue hidden>
                  Seleccione tipo de pregunta
                </option>
                <option value='sm'>Selección múltiple</option>
                <option value='ss'>Selección simpe</option>
                <option value='text'>Texto</option>
              </select>

              <input
                  type='text'
                  name='text'
                  id={index}
                  value={element.text}
                  placeholder='Pregunta'
                  onChange={handleSelect}
                />
              </div>
              
                <QuestionType
                  type={element.question_type}
                  index={index}
                  optionsQuestion={element.options}
                  setForm={setForm}
                  form={form}
                  
                />
                </div>

              <button className='eraseQuestion' name={index} onClick={eraseQuestion}>x</button>
                
                
                </div> }
            </div>
        )}
       
        <button className='addQuestion' onClick={handleQuestions}> <MdAddCircle/>Agregar pregunta</button>
      </form>
    </div>
  );
}

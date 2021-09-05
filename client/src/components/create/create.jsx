// import { useState } from "react";
import QuestionType from "../questionType/questionType";

export default function Create({form, setForm}) {
  
  // const [form, setForm] = useState({
  //   name: "",
  //   description: "",
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
      questions: [...form.questions, {question_type: "", text: "", options: [],}]
    })
    
  };

  const handleForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  console.log(form.questions)
  console.log(form.questions.length)
  return (
    <div>
      <h1>Creación de encuestas</h1>
      <form action="">
        <label htmlFor="titulo">
          Titulo
          <input
            type="text"
            name="name"
            id="titulo"
            placeholder="Título"
            onChange={handleForm}
          />
        </label>
        <label htmlFor="description">
          Descripción
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Descripción"
            onChange={handleForm}
          />
        </label>

        {form.questions.map((element, index) => {
          return (
            <div key={index}>
              <select name="question_type" id={index} onChange={handleSelect}>
                <option value="" defaultValue hidden>
                  Seleccione tipo de pregunta
                </option>
                <option value="sm">Selección múltiple</option>
                <option value="ss">Selección simpe</option>
                <option value="text">Texto</option>
              </select>
              <label htmlFor={index}>
                Pregunta
                <input
                  type="text"
                  name="text"
                  id={index}
                  placeholder="Pregunta"
                  onChange={handleSelect}
                />
              </label>
              
                <QuestionType
                  type={element.question_type}
                  index={index}
                  optionsQuestion={element.options}
                  setForm={setForm}
                  form={form}
                  
                />
                
                
            </div>
          );
        })}
       
        <button onClick={handleQuestions}>Agregar pregunta</button>
      </form>
    </div>
  );
}

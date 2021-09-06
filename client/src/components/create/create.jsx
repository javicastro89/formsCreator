// import { useState } from 'react';
import { useState } from "react";
import QuestionType from "../questionType/questionType";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import swal from "sweetalert";
import validate from './validate'
import "./create.css";

export default function Create({ form, setForm }) {
  const [error, setError] = useState({})
  const [msg, setMsg] = useState(false)
  const handleSelect = (event) => {
    form.questions[event.target.id][event.target.name] = event.target.value;

    setForm(() => {
      return {
        ...form,
        questions: form.questions,
      };
    });
    setError(validate(form, setMsg))
  };

  const handleQuestions = (event) => {
    event.preventDefault();

    setForm(() => {return{
      ...form,
      questions: [
        ...form.questions,
        { question_type: "", text: "", options: [] },
      ],
    }});
    setError(validate(form, setMsg))
  };

  const handleForm = (event) => {
    setForm(() => {return{
      ...form,
      [event.target.name]: event.target.value,
    }});
    setError(validate(form, setMsg))
  };

  const eraseQuestion = (event) => {
    event.preventDefault();
    form.questions[event.target.name] = null;
    setForm(() => {return {
      ...form,
      questions: form.questions,
    }});
    setError(validate(form, setMsg))
  };

  const createPoll = async (event) => {
    event.preventDefault();
    form.questions = form.questions.filter((element) => element !== null);
    if(Object.values(error).length > 0) {
      swal({
        title: 'Completar todos los campos de la encuesta', 
        icon: 'warning'
      });
      setMsg(() => true)
    }
    else {
      setMsg(() => false)
    try {
      let id = await axios.post("http://localhost:3001/forms", { form: form });
      swal(
        'Encuesta creada', `Id de la encuesta "${id.data.formId}"`, 'success'
      );
        
      setForm({
        name: "",
        description: "",
        questions: [],
      });
      
    } catch (error) {
      swal({
        title: 'Error al crear la encuesta', 
        icon: 'warning'
      });
    }
  }
  };
  return (
    <div className="form">
      <header>
        <h1>Creación de encuestas</h1>
      </header>
      <form>
        <div className="title">
          <input
            type="text"
            name="name"
            id="titulo"
            value={form.name}
            placeholder="Título"
            onChange={handleForm}
          />
          
        </div>
        <div className="description">
          <input
            type="text"
            name="description"
            id="description"
            value={form.description}
            placeholder="Descripción"
            onChange={handleForm}
          />
          
        </div>
        {form.questions.map((element, index) => (
          <div key={index}>
            {element === null ? null : (
              <div className="questAndBttn">
                <div className="questionContainer">
                  <div className="question">
                    <select
                      name="question_type"
                      id={index}
                      onChange={handleSelect}
                    >
                      <option value="" defaultValue hidden>
                        Seleccione tipo de pregunta
                      </option>
                      <option value="sm">Selección múltiple</option>
                      <option value="ss">Selección simpe</option>
                      <option value="text">Texto</option>
                    </select>

                    <input
                      type="text"
                      name="text"
                      id={index}
                      value={element.text}
                      placeholder="Pregunta"
                      onChange={handleSelect}
                    />
                  </div>

                  <QuestionType
                    type={element.question_type}
                    index={index}
                    setError={setError}
                    validate={validate}
                    setMsg={setMsg}
                    setForm={setForm}
                    form={form}
                  />
                </div>

                <button
                  className="eraseQuestion"
                  name={index}
                  onClick={eraseQuestion}
                >
                  x
                </button>
              </div>
            )}
          </div>
        ))}

        <button className="addQuestion" onClick={handleQuestions}>
          <MdAddCircle />
          Agregar pregunta
        </button>
        {msg ? 
        <div>
        {error.description ? <><small className='danger'>{error.description}</small> <br/></> : null}
        {error.name ? <> <small className='danger'>{error.name}</small> <br/> </>: null}
        {error.question && <><small className='danger'>{error.question}</small> <br/></>}
        {error.option && <><small className='danger'>{error.option}</small> <br/></>}
        </div>
        : null}
        <div className="bttnContainer">
          <button className="createBttn" onClick={createPoll}>
            Crear Encuesta
          </button>
        </div>
      </form>
    </div>
  );
}

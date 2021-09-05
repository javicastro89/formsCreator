import { useState } from "react";
import QuestionType from "../questionType/questionType";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    questions: [],
  });

  const [question, setQuestion] = useState({
    question_type: "",
    text: "",
    options: [],
  });
  const [options, setOptions] = useState({ 0: "" });
  const [questionQuantity, setQuestionQuantity] = useState(["question1"]);
  const [questionType, setQuestionType] = useState("");

  const handleSelect = (event) => {
    setQuestionType(event.target.value);
    setQuestion({
      ...question,
      [event.target.name]: event.target.value
    })
  };

  const handleQuestions = (event) => {
    event.preventDefault();
  };

  const handleForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

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

        {questionQuantity.map((element) => {
          return (
            <div key={element}>
              <select name="question_type" id="tipo" onChange={handleSelect}>
                <option value="" defaultValue hidden>
                  Seleccione tipo de pregunta
                </option>
                <option value="sm">Selección múltiple</option>
                <option value="ss">Selección simpe</option>
                <option value="text">Texto</option>
              </select>
              <label htmlFor="pregunta">
                Pregunta
                <input
                  type="text"
                  name="text"
                  id="pregunta"
                  placeholder="Pregunta"
                  onChange={handleSelect}
                />
              </label>
              <QuestionType
                type={questionType}
                setOptions={setOptions}
                options={options}
              />
            </div>
          );
        })}
        <button onClick={handleQuestions}>Agregar pregunta</button>
      </form>
    </div>
  );
}

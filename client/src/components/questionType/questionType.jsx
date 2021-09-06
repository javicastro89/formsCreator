import { useState, useEffect } from "react";
import "./questionType.css";
import { MdAddCircle } from "react-icons/md";

export default function QuestionType({ type, index, setForm, form, setError, validate, setMsg }) {
  const [options, setOptions] = useState({ 0: "" });

  const handleChange = (event) => {
    setOptions(() => {
      return {
        ...options,
        [event.target.name]: event.target.value,
      };
    });
    options[event.target.name] = event.target.value;
    let optionsQuestion = Object.values(options).slice();
    form.questions[index].options = optionsQuestion;
    setForm(() => {return{
      ...form,
      questions: form.questions,
    }});
    setError(validate(form, setMsg))
  };

  const handleOptions = (event) => {
    event.preventDefault();
    if (event.target.value === "quit" || event.target.id === "quit") {
      delete form.questions[index].options[event.target.name];
      delete options[event.target.name];

      let arrOptions = Object.values(options);

      let newObject = {};

      form.questions[index].options = arrOptions.map(
        (element, index) => (newObject[index] = element)
      );
      setForm(() => {return{
        ...form,
        questions: form.questions,
      }});
      setError(validate(form, setMsg))
      setOptions(newObject);
    } else if (event.target.value === "add") {
      setOptions({
        ...options,
        [Object.values(options).length]: "",
      });
      form.questions[index].options.push('')
      setForm(() => {return{
        ...form,
        questions: form.questions,
      }});
      setError(validate(form, setMsg))

    }
  };

  useEffect(() => {}, [options]);

  if (type === "ss" || type === "sm") {
    return (
      <div className="questionType">
        {Object.values(options).map((element, index) => (
          <div className="options" key={index}>
            <input
              type="text"
              name={index}
              value={options[index]}
              id={index}
              onChange={handleChange}
              placeholder={`Opción ${index + 1}`}
            />
            <button
              className="bttn-"
              name={index}
              value="quit"
              id="quit"
              onClick={handleOptions}
            >
              x
            </button>
          </div>
        ))}
       
        <button value="add" className="agregarOpción" onClick={handleOptions}>
          <MdAddCircle />
          Agregar opción
        </button>
      </div>
    );
  }

  return <div></div>;
}

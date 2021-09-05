import React from "react";

export default function Form({ form }) {
  return (
    <div>
      <h1>{form.name || "Título"}</h1>
      <h4>{form.description || "Descripción"}</h4>
      {form.questions?.map((element) => (
        <div>
          <h4>{element.text}</h4>
          {element.question_type === "sm" ? (
            <div>
              {element.options.map((option, index) => (
                <div>
                  <label htmlFor={index}>
                    <input type="checkbox" name={element.text} id={index} />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ) : element.question_type === "ss" ? (
            <div>
              {element.options.map((option, index) => (
                <div>
                  <label htmlFor={index}>
                    <input type="radio" name={element.text} id={index} />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ) : element.question_type === 'text' ? <textarea placeholder='Respuesta...' /> : null}
        </div>
      ))}
    </div>
  );
}

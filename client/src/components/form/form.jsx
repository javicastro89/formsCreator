import React from "react";
import './form.css'

export default function Form({ form }) {
  return (
    <div className='formDisplay'>
        <header>
      <h1>{form.name || "Título"}</h1>
      <p>{form.description || "Descripción"}</p>
      </header>
      <div className='questionDisplay'>
      {form.questions?.map((element, index) => (
        <div key={index} className='width'>
            {element !== null &&
            <div className='divider'>
            <div className='fullQuestion' >
          <h4>{element.text}</h4>
          {element.question_type === "sm" ? (
            <div className='inputs'>
              {element.options.map((option, index) => (
                <div key={index}>
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
                <div key={index}>
                  <label htmlFor={index}>
                    <input type="radio" name={element.text} id={index} />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ) : element.question_type === 'text' ? <textarea placeholder='Respuesta...' /> : null}
          </div>
          </div>
              }
        </div>
      ))}
      </div>
    </div>
  );
}

import { useState } from 'react'
import Create from '../create/create.jsx'
import Form from '../form/form.jsx'
import './display.css'

export default function Display() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        questions: [],
      });

    return (
        <div className='container'>
            <Create className='create' form={form} setForm={setForm} />
            <Form className='elotro' form={form} />
        </div>
    )
}

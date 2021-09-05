import { useState } from 'react'
import Create from '../components/create/create'
import Form from '../components/form/form'
import './display.css'

export default function Display() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        questions: [],
      });

    return (
        <div className='container'>
            <Create form={form} setForm={setForm} />
            <Form form={form} />
        </div>
    )
}

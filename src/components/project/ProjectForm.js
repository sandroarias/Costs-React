import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"
import styles from "./ProjectForm.module.css"

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)

        navigate('/projects', {state: {message: 'Projeto criado com sucesso!'}})
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    } 

    function handleCategory(e) {
        setProject({ 
            ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }


    return (
        <form className={styles.forms} onSubmit={submit}>
            <Input 
                type="text" 
                text="Insira o nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto" 
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="budget" 
                placeholder="Insira o orçamento total" 
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select 
                name="category_id" 
                text="Selecione uma categoria" 
                options={categories} 
                handleOnChange={handleCategory} 
                value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm
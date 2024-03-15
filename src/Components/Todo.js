import React, { useState, useRef, useEffect } from 'react'
import "./Todo.css"
import { IoMdDoneAll } from 'react-icons/io'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from 'react-icons/md'

function Todo() {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editId, setEditId] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const addTodo = () => {
        if (todo !== '') {
            setTodos([...todos, { list: todo, id: Date.now(), status: false }])
            setTodo('')
        }
        if(editId){
            const editTodo = todos.find((todo)=>todo.id == editId)
            const updateTodo = todos.map((to)=>to.id=== editTodo.id 
            ? (to = {id:to.id ,list: todo}) 
            : (to = {id:to.id ,list: to.list}))
            setTodos(updateTodo)
            setEditId(0)
            setTodo('')
        }
    }
    const inputRef = useRef('null')
    useEffect(() => {
        inputRef.current.focus()
    })
    const onDelete = (id) => {
        setTodos(todos.filter((to) => to.id !== id)
        )
    }
    const onComplete = (id) => {
        let complete = todos.map((list) => {
            if (list.id === id) {
                return ({ ...list, status: !list.status })
            }
            return list
        })
        setTodos(complete)
    }
    const onEdit = (id) => {
        const editTodo = todos.find((to) => to.id === id)
        setTodo(editTodo.list)
        setEditId(editTodo.id)
    }

    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <form className='form-group' onSubmit={handleSubmit}>
                <input value={todo} ref={inputRef} onChange={(event) => { setTodo(event.target.value) }} type="text" placeholder='Enter your todo' className='form-control' />
                <button onClick={addTodo}>{editId ? 'EDIT' : 'ADD'}</button>
            </form>
            <div className='list'>
                <ul>
                    {
                        todos.map((to) => (
                            <li className='list-items'>
                                <div className="list-item-list" id={to.status ? 'list-item' : ''}>{to.list}</div>
                                <span>
                                    <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={() => onComplete(to.id)} />
                                    <FiEdit className='list-item-icons' id='edit' title='Edit' onClick={() => onEdit(to.id)} />
                                    <MdDelete className='list-item-icons' id='delete' title='Delete' onClick={() => onDelete(to.id)} />
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo
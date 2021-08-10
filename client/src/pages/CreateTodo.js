import React, {useCallback, useContext, useEffect, useState,useRef} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from "../components/Loader";
import {TodoList} from "../components/TodoList";
import {useMessage} from "../hooks/message.hook";

export const CreateTodo = () => {
    const input = useRef()
    const auth = useContext(AuthContext)
    const {request,loading} = useHttp()
    const [todo, setTodo] = useState('')
    const [todos,setTodos] = useState([])
    const message = useMessage()
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            if(todo===''){
                return message('Input text are empty,type something!')
            }
            try {
                const data = await request('/api/todo/generate', 'POST', {text: todo}, {
                    Authorization: `Bearer ${auth.token}`
                })
                await fetchTodos()
                setTodo('')
            } catch (e) {}
        }
    }
    const fetchTodos = useCallback(async () => {
        try {
            const fetched = await request('/api/todo', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setTodos(fetched)

        } catch (e) {}
    }, [auth.token, request])

    const deleteHandler = async (id) => {
        try {
               await request('/api/todo/delete', 'POST', {_id:id}, {
                Authorization: `Bearer ${auth.token}`
            })
          await fetchTodos()
            setTodo('')
            message('Todo was deleted')
        } catch (e) {}
    }
    const editHandler = async (id)=> {
        if(todo.length===0){
            return message('Input text are empty,type something!')
        }
      try {
          await request('/api/todo/update','POST',{_id:id,text:todo},{
              Authorization:`Bearer ${auth.token}`
          })
          await fetchTodos()
          setTodo('')
      }catch (e){}
    }
    const completeHandler = async (id,complete)=>{
        try {
           const fetched = await request('/api/todo/complete','POST',{_id:id,isCompleted:!complete},{
                Authorization:`Bearer ${auth.token}`
            })
            console.log(fetched.todo.isCompleted)

            await fetchTodos()
            setTodo('')
        }catch (e){}
    }

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])


    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        id="todo"
                        type="text"
                        ref={input}
                        value={todo}
                        onChange={e => setTodo(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Type WhatTodo</label>
                </div>

                 <TodoList  onComplete={completeHandler} todos={todos} onDelete={deleteHandler} onEdit={editHandler}/>
            </div>
        </div>
    )
}
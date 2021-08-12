import React from "react";



export const TodoList = ({todos,onDelete,onEdit,onComplete})=>{
    if(!todos.length){
        return <p className={"center"}>There are no todos yet</p>
    }
    return (
            todos.map((todo,idx)=>{
                let classList = "card blue-grey darken-1";
                if(todo.isCompleted){
                    classList = "card teal darken-1"
                }
                return (

                    <div key={todo._id} className='row'>
                    <div className="col s12 ">
                    <div  style={{display:'flex',justifyContent:'space-between'}}  className={classList}>
                    <div onClick={()=>onComplete(todo._id,todo.isCompleted)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',cursor:'pointer'}}  className="card-content white-text">
                    <span  className="card-title">{idx+1}</span>
                <p style={{margin:'5px'}}>Text: {todo.text}</p>
                        <span>Time: {new Date(todo.date).toLocaleTimeString()}</span>
            </div>
                <div style={{display:'flex',alignItems:'center'}}  className="card-action">
                    <a onClick={()=>onDelete(todo._id)} className="waves-effect waves-light btn">Delete</a>
                    <a onClick={()=>onEdit(todo._id)} className="waves-effect waves-light btn" style={{marginLeft:10}}>Edit</a>
                </div>
            </div>
            </div>
            </div>
                )
            })
    )
}

import { renderTodosHTML } from "./create-todo-html"



export const renderTodos = (elementId, todos = [])=>{
    
    const element = document.querySelector(elementId);
    element.innerHTML = ""
    
    todos.forEach(todo => {
        element.append(renderTodosHTML(todo));
    })

}
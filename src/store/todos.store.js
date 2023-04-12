import { Todo } from "../todos/models/todo.models"

const Filters = {
    All : "all",
    Completed : "completed",
    Pending : "pending",
}

export const state = {
    todos: [
        new Todo("Hacer la cama"),
        new Todo("Ordenar el escritorio"),
        new Todo("Limpiar el piso"),
        new Todo("Estudiar"),
        new Todo("Comprar Comida"),
    ],
    filter: Filters.All
}

const initStore = ()=>{
    console.log("Initializing 🥭");
    loadStore();
}

const getTodos = ( filter = "all") => {
    switch ( filter ){
        case Filters.All:
            return[...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
    }
}

const loadStore = ()=>{
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'))
    state.todos = todos;
    state.filter = filter;
}

const saveStore = ()=>{
    localStorage.setItem('state', JSON.stringify(state));
}


const toggleTodo = (todoId)=>{
    const findTodo = state.todos.find((todo) => todo.id ===todoId )
    if (findTodo){
        findTodo.done =! findTodo.done;
    }
    saveStore();
}

const addTodo = (description)=>{
    if(!description) throw new Error("Put a description here")
    state.todos.push(new Todo(description))
    saveStore();
    
}

const deleteTodo = (todoId)=>{
    state.todos = state.todos.filter(todo => todo.id !== todoId)
    saveStore();
}

const deleteCompleted = ()=>{
    state.todos = state.todos.filter(todo => !todo.done)
    saveStore();
}

const setFilter = (newFilter = Filters.All)=>{
    state.filter =  newFilter;
    saveStore();
}

const getCurrentFilter = ()=>{
    return state.filter
    
}



export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}
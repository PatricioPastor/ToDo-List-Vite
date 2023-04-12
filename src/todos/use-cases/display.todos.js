import todoStore from '../../store/todos.store';
import { renderTodos } from './render.todos';
import { ElementsId } from '../app';



export const displayTodos = () => {
    const CounterPending = document.querySelector('#pending-count');
    const pendingValue = todoStore.getTodos('pending').length

    CounterPending.innerText = pendingValue;
    

    const todos = todoStore.getTodos(todoStore.getCurrentFilter());

    renderTodos(ElementsId.TodoList, todos)


}
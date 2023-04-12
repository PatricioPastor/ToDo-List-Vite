import html from "./app.html?raw"
import todoStore from "../store/todos.store"
import { displayTodos } from "./use-cases/index"

export const ElementsId = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    DeleteCompleted: '.clear-completed',
    FiltersLi: '.filtro',
    CountPending: '#pending-count'
}


export const App = (elementId) => {

    (() => {
        const app = document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append(app)
        displayTodos();
    })()


    //! HTML elements


    const newDescriptionInput = document.querySelector(ElementsId.NewTodoInput),
          ContainerUl = document.querySelector(ElementsId.TodoList),
          DeleteCompleted = document.querySelector(ElementsId.DeleteCompleted),
          FiltersLi = document.querySelectorAll(ElementsId.FiltersLi);
    
    

    //! Events TODO

    //* Add ToDo element 

    newDescriptionInput.addEventListener('keyup', (event) => {

        if (event.keyCode === 13) {
            todoStore.addTodo(newDescriptionInput.value);
            newDescriptionInput.value = '';
            displayTodos();
        }

    })

    //* Delete ToDo element 

    ContainerUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')

        if (event.target.tagName !== 'BUTTON') {
            todoStore.toggleTodo(element.getAttribute('data-id'));

        } else {
            todoStore.deleteTodo(element.getAttribute('data-id'));
        }
        displayTodos();

    })

    //* Delete ToDo's Completed


    DeleteCompleted.addEventListener('click', () => {

        todoStore.deleteCompleted();
        displayTodos();
    })


    //* Filters ToDo 


    
    FiltersLi.forEach((element) => {

        element.addEventListener('click', (element) => {

            FiltersLi.forEach(e => e.classList.remove('selected'))

            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter('all')
                    return displayTodos();

                case 'Pendientes':
                    todoStore.setFilter('pending')
                    return displayTodos();

                case 'Completados':
                    todoStore.setFilter('completed')
                    return displayTodos();


                default: throw new Error('Unknown filter')

            }
        })

    })


    //* Count ToDo's Pending


}

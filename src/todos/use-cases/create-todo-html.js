




export const renderTodosHTML = (todo) => {
        const item = document.createElement('li');
        item.innerHTML = `<div class="view">
                                <input class="toggle" type="checkbox" ${todo.done ? 'checked' : '' }>
                                <label>${todo.description}</label>
                                <button class="destroy"></button>
                           </div>
                           <input class="edit" value="Create a TodoMVC template">`

        if (todo.done){item.classList.add('completed')};
        item.setAttribute('data-id', todo.id);
        return item;
}
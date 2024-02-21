//Creacion de variables a utilizar
let txtTodoInput = document.querySelector("#txtTodoInput");
let btnAddTodo = document.querySelector("#btnAddTodo");
let todoListItems = document.querySelector("#todoListItems");
let totalTasks = document.querySelector("#totalTasks");
let totalTaskRemaining = document.querySelector("#totalTaskRemaining");
let totalTasksDone = document.querySelector("#totalTasksDone");
let taskListBody = document.querySelector("#taskListBody");


let todoArray = [];

/*
 * Create list item for todo list
 * @param {string} todoText 
 * @param {integer} id 
 * @returns 
 */

//Funcion flecha que nos ayuda  a crear los items de la lista
let todoItemMaker = (todoText, id) => {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-start" data-taskid="${id}">
        <input class="form-check-input me-1 checkbox" type="checkbox" data-taskid="${id}">
        <label class="form-check-label todo-text" for="firstCheckbox" data-taskid="${id}" >${todoText}</label>
        <i class="fa-solid fa-trash-can remove-task" data-taskid="${id}"></i>
    </li>
    `;
};

//Funcion  para actualizar el contador de tareas totales y las tareas pendientes
let updateTotals = () => {
  totalTasks.innerHTML = todoArray.length;
  totalTaskRemaining.innerHTML = todoArray.filter((todo) => !todo.completed).length;
  totalTasksDone.innerHTML = todoArray.filter((todo) => todo.completed).length;
};

//Funcion que agrega  una nueva tarea al array y actualiza la vista
let addTodoItem = () => {
  if (txtTodoInput.value === "" || txtTodoInput.value === " ") {
    return;
  }
  let uuid = todoArray.length + 1;
  while (todoArray.some((todo) => todo.id === uuid)) {
    uuid++;
  }
  todoArray.push({
    id: uuid,
    text: txtTodoInput.value,
    completed: false,
  });


  //Agregar elemento a la lista de tareas
  todoListItems.insertAdjacentHTML ("beforeend", todoItemMaker(txtTodoInput.value, uuid));
  txtTodoInput.value = "";
  updateTotals();
};

//Funcion que nos ayuda a eliminar  un item de la lista
let removeTodoItem = (removeElement) => {
  todoArray.forEach((todo) => {
    if (todo.id === Number(removeElement.dataset.taskid)) {
      todoArray.splice(todoArray.indexOf(todo), 1);
    }
  });
  
  removeElement.parentElement.remove();
  updateTotals();
};

//Funcion  para marcar o desmarcar una tarea como completada
let completeTodoTask = (inputElement) => {
  console.log(inputElement.dataset.taskid);
  todoArray.forEach((todo) => {
    if (todo.id === parseInt(inputElement.dataset.taskid)) {
      todo.completed = !todo.completed;
    }
  });
  if (!inputElement.checked) {
    inputElement.parentElement.classList.remove("text-decoration-line-through");
  } else {
    inputElement.parentElement.classList.add("text-decoration-line-through");
  }
  updateTotals();
};

//Agrega la tarea al hacer click sobre "Ingresar"
btnAddTodo.addEventListener("click", () => {
  addTodoItem();
});

taskListBody.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    completeTodoTask(e.target);
  }
});

txtTodoInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    addTodoItem();
  }
});

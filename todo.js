const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", () => {
  getLocalTodos();
});

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo() {
  event.preventDefault();

  const task = todoInput.value;
  const deadlineDateInput = document.querySelector("#date");
  const deadlineTimeInput = document.querySelector("#time");
  const deadlineDate = new Date(deadlineDateInput.value);
  const deadlineTime = deadlineTimeInput.value;

  if (
    task.trim() !== "" &&
    deadlineDateInput.value.trim() !== "" &&
    deadlineTime.trim() !== ""
  ) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = task;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const deadlineSpan = document.createElement("span");
    const deadlineOptions = { weekday: "long", day: "numeric", month: "long" };
    deadlineSpan.innerText =
      deadlineDate.toLocaleDateString(undefined, deadlineOptions) +
      " " +
      deadlineTime;
    deadlineSpan.classList.add("deadline");
    todoDiv.appendChild(deadlineSpan);

    saveLocalTodos(task, deadlineDate, deadlineTime);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
    deadlineDateInput.value = "";
    deadlineTimeInput.value = "";
  }
}

function deleteCheck(event) {
  const item = event.target;
  const todo = item.parentElement;

  if (item.classList.contains("trash-btn")) {
    todo.classList.add("slide");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList.contains("complete-btn")) {
    todo.classList.toggle("completed");
  }
}

function filterTodo() {
  const todos = Array.from(todoList.children);
  todos.forEach(function (todo) {
    switch (filterOption.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(task, deadlineDate, deadlineTime) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push({ task, deadlineDate, deadlineTime });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo.task;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const deadlineSpan = document.createElement("span");
    const deadlineOptions = { weekday: "long", day: "numeric", month: "long" };
    const deadlineDate = new Date(todo.deadlineDate);
    deadlineSpan.innerText =
      deadlineDate.toLocaleDateString(undefined, deadlineOptions) +
      " " +
      todo.deadlineTime;
    deadlineSpan.classList.add("deadline");
    todoDiv.appendChild(deadlineSpan);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  const todoTask = todo.querySelector(".todo-item").innerText;
  const todoDeadline = todo.querySelector(".deadline").innerText;
  const deadlineDate = todoDeadline.split(" ")[0];
  const deadlineTime = todoDeadline.split(" ")[1];

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter(
    (item) =>
      item.task !== todoTask ||
      item.deadlineDate !== deadlineDate ||
      item.deadlineTime !== deadlineTime
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}

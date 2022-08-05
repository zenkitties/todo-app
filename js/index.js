const toDoList = [];
const addInput = document.querySelector("#add-to-list");
const addButton = document.querySelector("#add-btn");
const ul = document.querySelector("#todo-container");
const div = document.createElement("div");
const idNumber = Math.round(Math.random(100) * 100);

const renderToDo = (todo) => {
  const li = createTodoElement(todo);
  const editElDiv = createEditElement(
    li,
    todo,
    `edit-input-id-${idNumber}`,
    todo
  );

  li.appendChild(editElDiv);
  ul.appendChild(li);
};

const render = () => {
  ul.innerHTML = "";

  toDoList.forEach(renderToDo);
};

const actionButton = (src, cl) => {
  const el = document.createElement("img");
  el.type = "button";
  el.src = src;
  el.setAttribute("class", `action-button ${cl}`);
  return el;
};

const createContainer = (id, cl) => {
  const div = document.createElement("div");
  div.setAttribute("id", id);
  div.classList.add(cl);
  return div;
};

const createListItemElement = (id, cl) => {
  const li = document.createElement("li");
  li.setAttribute("id", id);
  li.classList.add(cl);
  ul.appendChild(li);
  return li;
};

const createTodoElement = (todo) => {
  const doneButton = actionButton("./icons/check-square.svg", "doneButton");
  const editButton = actionButton("./icons/edit.svg", "editButton");
  const removeButton = actionButton("./icons/x.svg", "removeButton");
  const span = document.createElement("span");
  const div = createContainer(
    `list-item-container-${idNumber}`,
    "list-item-container"
  );
  const li = createListItemElement(todo, "list-item");
  span.classList.add("todo-text");
  span.innerHTML = todo;
  div.appendChild(span);
  div.appendChild(doneButton);
  div.appendChild(editButton);
  div.appendChild(removeButton);
  li.appendChild(div);

  doneButton.addEventListener("click", function () {
    markingDone(li);
  });

  editButton.addEventListener("click", function () {
    const el = document.getElementById(todo);
    el.firstChild.classList.add("hidden");
    el.lastChild.classList.remove("hidden");
  });

  removeButton.addEventListener("click", function () {
    removeToDo(li);
  });
  return li;
};

const createEditElement = (li, placeholder, id, todo) => {
  const el = document.getElementById(todo);
  const save = actionButton("./icons/check.svg", "save-button");
  const cancel = actionButton("./icons/x.svg", "cancel-edit-button");
  const input = document.createElement("input");
  const editDiv = createContainer(`edit-todo-${idNumber}`, "edit-container");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("id", id);
  input.classList.add("edit-input");
  editDiv.classList.add("hidden");
  editDiv.appendChild(input);
  editDiv.appendChild(save);
  editDiv.appendChild(cancel);
  li.appendChild(editDiv);

  cancel.addEventListener("click", function () {
    el.firstChild.classList.remove("hidden");
    el.lastChild.classList.add("hidden");
    input.value = "";
  });

  save.addEventListener("click", function () {
    if (input.value === "") {
      el.firstChild.classList.remove("hidden");
      el.lastChild.classList.add("hidden");
    } else {
      toDoList.splice(toDoList.indexOf(el.id), 1, input.value);
      render();
      el.firstChild.classList.remove("hidden");
      el.lastChild.classList.add("hidden");
    }
  });

  return editDiv;
};

const editToDo = (todo) => {
  const el = document.getElementById(`${todo}`);
  el.innerHTML = "";
  el.appendChild(createEditElement(el.id, `bacon-edit`));
};

const removeToDo = (todo) => {
  toDoList.splice(toDoList.indexOf(todo.id), 1);
  todo.remove();
};

const markingDone = (todo) => {
  todo.classList.toggle("done-line-through");
};

const addToDo = (todo) => {
  toDoList.push(todo);
  addInput.value = "";
  renderToDo(todo);
};

addButton.addEventListener("click", function () {
  addToDo(addInput.value);
  addInput.value = "";
});

render();

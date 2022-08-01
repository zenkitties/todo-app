const toDoList = ["Walk the Dog", "Buy Groceries", "Cook Dinner"];
const addInput = document.querySelector("#add-to-list");
const addButton = document.querySelector("#add-btn");
const ul = document.querySelector("#todo-container");
// const insertAfter = (referenceNode, newNode) => {
//   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// };

const renderToDo = (todo) => {
  const li = createListItemElement(todo, "todo-item", todo);
  const doneButton = actionButton("./icons/check-square.svg", "doneButton");
  const editButton = actionButton("./icons/edit.svg", "editButton");
  const removeButton = actionButton("./icons/x.svg", "removeButton");

  doneButton.addEventListener("click", function () {
    markingDone(li);
  });

  editButton.addEventListener("click", function () {
    li.classList.add("hidden");
    editToDo(li.id);
  });

  removeButton.addEventListener("click", function () {
    removeToDo(li);
  });

  li.appendChild(doneButton);
  li.appendChild(editButton);
  li.appendChild(removeButton);
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

const createListItemElement = (id, cl, html) => {
  const el = document.createElement("li");
  el.setAttribute("id", id);
  el.classList.add(cl);
  el.innerHTML = html;
  ul.appendChild(el);
  return el;
};

const createEditElement = (divId, placeholder, id) => {
  const save = actionButton("./icons/check.svg", "save-button");
  const cancel = actionButton("./icons/x.svg", "cancel-edit-button");
  const el = document.createElement("div");
  el.id = divId;
  el.setAttribute("class", "edit-container");
  let input = document.createElement("input");
  input.setAttribute("placeholder", placeholder);
  input.id = id;
  input.setAttribute("class", "edit-input");
  el.appendChild(input);
  insertAfter(input, save);
  insertAfter(save, cancel);
  return el;
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

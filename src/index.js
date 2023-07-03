import { formatRelative } from 'date-fns';

const addProjectButton = document.querySelector("#add-project");
const submitProjectButton = document.querySelector(".submit-project");
const homeButton = document.querySelector("#home");

const projectList = ProjectList();
const defaultProject = Project("Home");

homeButton.addEventListener("click", () => {
    displayProject(defaultProject);
});

function Todo(title, description, dueDate){
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;

    return {getTitle, getDescription, getDueDate};
}

function TodoList(){
    let list = [];

    const addTodo = todo => {
        list.push(todo);
    };

    const removeTodo = index => {
        list.splice(index, 1);
    };

    const getList = () => list;

    return {getList, addTodo, removeTodo};
}

function Project(name){  
    const getName = () => name;
    const todoList = TodoList();
    const getList = () => todoList;
    const addTodo = todoList.addTodo;
    const removeTodo = todoList.removeTodo;

    return {getName, getList, addTodo, removeTodo};
}

function ProjectList(){
    const list = [];

    const addProject = project => {
        list.push(project);
    };

    const getList = () => list;

    return {addProject, getList};
}

function updateProjectButtons(){
    const projectButtons = document.querySelector("#project-buttons");
    projectButtons.innerHTML = '';
    for(let i = 0; i < projectList.getList().length; i++){
        const projectButton = document.createElement("button");
        projectButton.classList.add("sidebar-button");
        projectButton.dataset.index = i;
        projectButton.textContent = projectList.getList()[i].getName();
        projectButton.addEventListener("click", () => {
            const project = projectList.getList()[projectButton.dataset.index];
            displayProject(project);
        });
        projectButtons.appendChild(projectButton);
    }
}

function displayProject(project){
    const content = document.querySelector(".content");
    content.innerHTML = '';
    const header = document.createElement("div");
    header.classList.add("todo-header");
    const projectTitle = document.createElement("h2");
    projectTitle.id = "project-title";
    projectTitle.textContent = project.getName();
    header.appendChild(projectTitle);
    const newTaskButton = document.createElement("button");
    newTaskButton.id = "new-task-button";
    newTaskButton.textContent = "New Task";
    const newTaskForm = document.createElement("div");
    newTaskForm.classList.add("hidden-form");
    newTaskButton.addEventListener("click", () => {
        newTaskForm.classList.toggle("revealed-form");
    });
    const nameLabel = document.createElement("label");
    nameLabel.for = "name";
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "name";
    nameInput.name = "name";
    const desLabel = document.createElement("label");
    desLabel.for = "description";
    desLabel.textContent = "Description:";
    const desInput = document.createElement("textarea");
    desInput.id = "description";
    desInput.name = "description";
    const dateLabel = document.createElement("label");
    dateLabel.for = "date";
    dateLabel.textContent = "Date";
    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";
    dateInput.id = "date";
    dateInput.name = "date";
    const submitTaskButton = document.createElement("button");
    submitTaskButton.id = "submit-task";
    submitTaskButton.textContent = "Enter";
    submitTaskButton.addEventListener("click", () => {
        createTask(project.getList());
        displayProject(project);
    });
    newTaskForm.appendChild(nameLabel);
    newTaskForm.appendChild(nameInput);
    newTaskForm.appendChild(desLabel);
    newTaskForm.appendChild(desInput);
    newTaskForm.appendChild(dateLabel);
    newTaskForm.appendChild(dateInput);
    newTaskForm.appendChild(submitTaskButton);
    header.appendChild(newTaskButton);
    header.appendChild(newTaskForm);
    content.appendChild(header);

    content.appendChild(renderTasks(project.getList(), project));
}

function createTask(taskList){
    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const date = new Date(document.querySelector("#date").value);
    const task = Todo(name, description, date);
    taskList.addTodo(task);
}

function renderTasks(taskList, project){
    const wrapper = document.createElement("div");
    wrapper.classList.add("todo-wrapper");
    for(let i = 0; i < taskList.getList().length; i++){
        wrapper.appendChild(createDOMTask(taskList.getList()[i], i, project));
    }
    return wrapper;
}

function createDOMTask(task, index, project){
    const taskElement = document.createElement("div");
    const titleElement = document.createElement("h3");
    titleElement.textContent = task.getTitle();
    taskElement.appendChild(titleElement);
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = task.getDescription();
    taskElement.appendChild(descriptionElement);
    const dateElement = document.createElement("h4");
    dateElement.textContent = `Due ${formatRelative(task.getDueDate(), new Date)}`;
    taskElement.appendChild(dateElement);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.dataset.index = index;
    deleteButton.addEventListener("click", () => {
        project.getList().removeTodo(deleteButton.dataset.index);
        displayProject(project);
    });
    taskElement.appendChild(deleteButton);
    taskElement.classList.add("todo-element");
    return taskElement;

}

addProjectButton.addEventListener("click", () => {
    const form = document.querySelector(".new-project");
    form.classList.toggle("new-project-revealed");
});

submitProjectButton.addEventListener("click", () => {
    const form = document.querySelector(".new-project");
    const projectName = document.querySelector("#project-name");    
    form.classList.remove("new-project-revealed");
    projectList.addProject(Project(projectName.value));
    projectName.value = '';
    updateProjectButtons();
});
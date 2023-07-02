import { format, compareAsc } from 'date-fns';

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
    const list = [];

    const sortTodo = () => {
        //Need to have it actually for the list of 
        //list = list.sort((left, right) => compareAsc(left.getDueDate, right.getDueDate));
    };

    const addTodo = todo => {
        list.push(todo);
        sortTodo();
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

    const removeProject = index => {
        list.splice(index, 1);
    };

    const getList = () => list;

    return {addProject, getList, removeProject};
}

function updateProjectButtons(){
    const projectButtons = document.querySelector("#project-buttons");
    projectButtons.innerHTML = '';
    for(let i = 0; i < projectList.getList().length; i++){
        const projectButton = document.createElement("button");
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
    content.textContent = project.getName();
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
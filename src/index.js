import { format, compareAsc } from 'date-fns';

function Todo(title, description, dueDate){
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;

    return {getTitle, getDescription, getDueDate};
}

function TodoList(){
    const list = [];

    const sortTodo = () => {
        list.sort(compareAsc);
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
import Task from "./task.js"

export default class Project {
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.taskList = [];
    }

    addTask(title,description,dueDate,priority,duration){
        const task = new Task(title,description,dueDate,priority,duration);
        this.taskList.push(task);
    }

    removeTask(id) {
        this.taskList = this.taskList.filter((task)=>task.id != id);
    }

    getTaskList(){
        return this.taskList;
    }

    findTaskById(id) {
        return this.taskList.find((task) => task.id === id);
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }
}
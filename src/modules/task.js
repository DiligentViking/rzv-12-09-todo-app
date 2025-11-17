export default class Task {
    constructor(title,description,dueDate,priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggle(){
        this.completed = !this.completed;
    }

    getCompleted(){
        return this.completed;
    }

    getTitle(){
        return this.title;
    }

    getDesc(){
        return this.description;
    }

    getDueDate(){
        return this.dueDate;
    }

    getId(){
        return this.id;
    }

    getPriority(){
        return this.priority;
    }

    setTitle(title){
        this.title = title;
    }

    setDesc(desc){
        this.description= desc;
    }

    setDate(date) {
        this.dueDate = date;
    }

    setPriority(priority){
        this.priority = priority;
    }
}


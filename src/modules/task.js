export default class Task {
    constructor(title,description,dueDate,priority,duration){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.duration = duration;
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

    getDuration(){
        return this.duration;
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

    setDuration(duration){
        this.duration = duration;
    }
}


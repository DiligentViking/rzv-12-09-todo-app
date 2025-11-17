import Project from "./project";
import ProjectController from "./projectController";

const StorageController = (()=>{

    const storeProjects = ()=>{
        const projectList = ProjectController.getProjects();
        localStorage.setItem("projects",JSON.stringify(projectList));
    }

    const restoreProjects = () =>{
        const localProjects = JSON.parse(localStorage.getItem("projects"));
        if(!localProjects)
            return;
        localProjects.forEach((project,index) => {
            const name = project.name;
            const tasks = project.taskList;
            if(index != 0)
                ProjectController.addProject(name);
            const currentProject = ProjectController.getProjects()[index];

            tasks.forEach((task,index2) => {

            currentProject.addTask(task.title,task.description,task.dueDate,task.priority);  
            if(task.completed){
                currentProject.getTaskList()[index2].toggle();
            }

            });{

            }
        });
    }

    return{
        storeProjects,
        restoreProjects,
    }
})();

export default StorageController;
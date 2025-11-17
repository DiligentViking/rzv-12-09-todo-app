import ProjectController from "./projectController";
import ModalController from "./modalController";
import ContentController from "./contentController";
import StorageController from "./storageController";

const SidebarController = (() => {
    const sidebar = document.querySelector(".sidebar");
    let selectedProject = null;

    const render = () => {

        sidebar.textContent = "";
        const previousSelectedId = selectedProject ? selectedProject.dataset.id : null;

        const sidebarHeader = document.createElement("div");
        sidebarHeader.textContent = "To Do App";

        const addTaskBtn = document.createElement("button");
        addTaskBtn.id = "newTask";
        addTaskBtn.textContent = "Add Task";

        const inbox = document.createElement("button");
        inbox.textContent = "Inbox";
        inbox.dataset.id = ProjectController.getProjects()[0].getId();
        inbox.classList.add("project");
        if(!selectedProject)
            inbox.classList.add("active");


        const myProjects = document.createElement("div");
        myProjects.classList.add("myProjects");

        const myProjectsHeader = document.createElement("button");
        myProjectsHeader.textContent = "My projects";
        myProjectsHeader.id = "newProject";

        myProjects.appendChild(myProjectsHeader)

        const projects = ProjectController.getProjects();
        for (let project of projects) {
            if (project.getName() === "Inbox") continue;

            const projectItem = document.createElement("div");
            projectItem.classList.add("project-item");

            const projectButton = document.createElement("button");
            projectButton.textContent = project.getName();
            projectButton.dataset.id = project.getId();
            projectButton.classList.add("project");
            
            if (previousSelectedId === project.getId()) {
                projectButton.classList.add("active");
                selectedProject = projectButton;
            }

            projectItem.appendChild(projectButton)
            const delBtn = document.createElement("button");
            delBtn.classList.add("project-delete-btn")
            delBtn.appendChild(document.createElement('span'));
            delBtn.dataset.id = project.getId();

            delBtn.addEventListener("click",()=>{
                
                const confirmed = confirm("Are you sure you want to delete this project?");
                if (!confirmed) return;
            
                ProjectController.deleteProject(delBtn.dataset.id);
                render();
                ContentController.renderProjectTasks(ProjectController.getProjects()[0]);
                StorageController.storeProjects();
            })

            projectItem.appendChild(delBtn);

            myProjects.appendChild(projectItem);
        }

        sidebar.appendChild(sidebarHeader);
        sidebar.appendChild(addTaskBtn);
        sidebar.appendChild(inbox);
        sidebar.appendChild(myProjects)

        if(!selectedProject){
            inbox.classList.add("active");
            selectedProject = inbox;
        }

    }

    
    const bindEvents = () => {
        sidebar.addEventListener("click", (e) => {
            if (e.target.id === "newProject") {
                ModalController.handleNewProject();
            }
            if (e.target.id === "newTask") {
                ModalController.handleNewTask();
                
            }
            if (e.target.classList.contains("project")) {
                if(selectedProject)
                    selectedProject.classList.remove("active");
                selectedProject = e.target;
                selectedProject.classList.add("active");
                const projectId = e.target.dataset.id;
                ContentController.renderProjectTasks(ProjectController.findProjectById(projectId));
            }

        })
    }


    return {
        render,
        bindEvents,
    }
})();

export default SidebarController;

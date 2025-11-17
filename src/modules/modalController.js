import ProjectController from "./projectController";
import SidebarController from "./sidebarController";
import ContentController from "./contentController";
import StorageController from "./storageController";

const ModalController = (()=>{
    const dialog = document.createElement("dialog");
    document.querySelector("body").appendChild(dialog);

    // Private Funcs //
    const openModal = ()=>{
        dialog.showModal();
        dialog.classList.add('open');
        dialog.classList.remove('cancel');
    }

    const cancelModal = ()=>{
        dialog.classList.add('cancel');
        dialog.classList.remove('open');
        dialog.addEventListener('transitionend', function handler() {
            dialog.close();
            dialog.removeEventListener('transitionend', handler);
        });
    }

    const closeModal = ()=>{
        dialog.classList.remove('open');
        dialog.close();
    }
    // ----- //

    const handleNewProject = ()=>{
        dialog.innerHTML = ``;

        const dialogDiv = document.createElement("div");
        dialogDiv.className = "new-project";

        const title = document.createElement("div");
        title.textContent = "New Project Name";
        const input = document.createElement("input");
        input.setAttribute("required", "");
        const okBtn = document.createElement("button");
        okBtn.textContent = "Save";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click",()=>{
            cancelModal();
        
        })

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actionsDiv");
        actionsDiv.appendChild(cancelBtn);
        actionsDiv.appendChild(okBtn);

        dialogDiv.appendChild(title);
        dialogDiv.appendChild(input);
    
        dialogDiv.appendChild(actionsDiv)

        dialog.appendChild(dialogDiv);
        
        openModal();

        okBtn.addEventListener("click", ()=>{
            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }
            ProjectController.addProject(input.value);
            closeModal();
            StorageController.storeProjects();
            SidebarController.render();
        })
    }

    const handleNewTask = () =>{
    

        dialog.innerHTML = ``;

        const dialogDiv = document.createElement("div");
        dialogDiv.className = "new-task";

        const nameInput = document.createElement("input");
        nameInput.placeholder = "Task name";
        nameInput.required = true;

        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Description";

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        const today = new Date().toISOString().split('T')[0];
        dueDateInput.min = today;

        const projectComboBox = document.createElement("div");
        const label = document.createElement("label");
        label.for = "project-select";
        projectComboBox.appendChild(label);
        const select = document.createElement("select");
        select.name = "projects";
        select.id = "project-select";

        const projectList = ProjectController.getProjects();
        for(let project of projectList){
            const option = document.createElement("option");
            option.textContent = project.getName();
            option.value = project.getId();

            if (project.name === 'Inbox') {
                option.selected = true;
            }

            select.appendChild(option);
        }
        projectComboBox.appendChild(select);
        
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click",()=>{
            cancelModal();
        
        })

        const priorityComboBox = document.createElement("div");
        const labelPriority = document.createElement("label");
        labelPriority.for = "priority-select";
        priorityComboBox.appendChild(labelPriority);
        const selectPriority = document.createElement("select");
        selectPriority.name = "priority";
        selectPriority.id = "priority-select";
        const option1 = document.createElement("option");
        option1.textContent = "Priority High"
        option1.value = "high";

        const option2 = document.createElement("option");
        option2.textContent = "Priority Medium"
        option2.value = "medium";

        const option3 = document.createElement("option");
        option3.textContent = "Prioriy Low"
        option3.value = "low";
        option3.selected = true;


        selectPriority.appendChild(option1);
        selectPriority.appendChild(option2);
        selectPriority.appendChild(option3);


        priorityComboBox.appendChild(selectPriority);

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add task";
        addBtn.addEventListener("click",()=>{
            if (!nameInput.checkValidity()) {
                nameInput.reportValidity();
                return;
            }
            const projectId = select.value;
            const name = nameInput.value;
            const desc = descriptionInput.value;
            const dueDate = dueDateInput.value;
            const projectObj = ProjectController.findProjectById(projectId);
            const priority = selectPriority.value;
            projectObj.addTask(name,desc,dueDate,priority);

            if(projectId === ContentController.getActiveProject().getId())
                ContentController.renderProjectTasks(projectObj);
            closeModal();
            StorageController.storeProjects();
        })

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actionsDiv");
        actionsDiv.appendChild(cancelBtn);
        actionsDiv.appendChild(addBtn);

        dialogDiv.appendChild(nameInput);
        dialogDiv.appendChild(descriptionInput);
        dialogDiv.appendChild(dueDateInput);
        dialogDiv.appendChild(projectComboBox);
        dialogDiv.appendChild(priorityComboBox);
        dialogDiv.appendChild(actionsDiv);

        dialog.appendChild(dialogDiv);

        openModal();
    }

    return {
        handleNewProject,
        handleNewTask
    }
})();

export default ModalController;
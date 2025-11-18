import ModalController from "./modalController";
import StorageController from "./storageController";


const ContentController = (() => {
    const content = document.querySelector(".content");
    let activeProject = null;

    const renderProjectTasks = (project) => {
        activeProject = project;
        content.innerHTML = '';

        const taskList = project.getTaskList();

        const titleDiv = document.createElement("div");
        titleDiv.textContent = project.getName();

        const tasksDiv = document.createElement("div");
        tasksDiv.classList.add("tasks-container")
        if (taskList.length === 0)
            tasksDiv.textContent = "This project has no tasks";
        else {
            for (let taskObj of taskList) {
                const task = document.createElement("div");
                const title = document.createElement("div");
                title.className = taskObj.getPriority();

                const desc = document.createElement("div");
                const dueDate = document.createElement("div");

                title.textContent = taskObj.getTitle();
                desc.textContent = taskObj.getDesc();
                dueDate.textContent = taskObj.getDueDate();

                const editBtn = document.createElement("button");
                editBtn.classList.add("task-edit-btn");
                editBtn.textContent = "Edit";

                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("task-delete-btn");
                deleteBtn.textContent = "Delete";

                const toggleBtn = document.createElement("button");
                toggleBtn.textContent = "✔";
                toggleBtn.classList.add("task-toggle-btn");
                toggleBtn.addEventListener("click", () => {
                    task.classList.toggle("completed");
                    taskObj.toggle();
                    StorageController.storeProjects();
                })

                if (taskObj.getCompleted())
                    task.classList.add("completed")

                task.appendChild(title);
                task.appendChild(desc);
                task.appendChild(dueDate);
                task.appendChild(editBtn);
                task.appendChild(deleteBtn);
                task.appendChild(toggleBtn);

                task.dataset.id = taskObj.getId()
                task.classList.add("task-item")
                tasksDiv.appendChild(task);
            }

        }

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add Task";
        addBtn.id = "add-task-content-div";
        addBtn.addEventListener("click",()=>{
            ModalController.handleNewTask();
        })
        content.appendChild(titleDiv);
        content.appendChild(tasksDiv);
        content.appendChild(addBtn);
    }

    const getActiveProject = () => {
        return activeProject;
    }

    const handleEditTask = (taskId) => {
        const selectedTask = activeProject.findTaskById(taskId);
        console.log(taskId);
        const editDiv = document.querySelector(`div[data-id="${taskId}"]`);
        editDiv.classList.add("editing");
        editDiv.textContent = '';

        const titleInput = document.createElement("input");
        titleInput.placeholder = "Task name";
        titleInput.value = selectedTask.getTitle();

        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Description";
        descriptionInput.value = selectedTask.getDesc();

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        const today = new Date().toISOString().split('T')[0];
        dueDateInput.min = today;
        dueDateInput.value = selectedTask.getDueDate();

        // Duration //
        const durationComboBox = document.createElement("div");
        const labelDuration = document.createElement("label");
        labelDuration.for = "duration-select";
        durationComboBox.appendChild(labelDuration);
        const selectDuration = document.createElement("select");
        selectDuration.name = "duration";
        selectDuration.id = "duration-select";
        const option1Duration = document.createElement("option");
        option1Duration.textContent = "short!";
        option1Duration.value = "short";

        const option2Duration = document.createElement("option");
        option2Duration.textContent = "normal";
        option2Duration.value = "normal";

        const option3Duration = document.createElement("option");
        option3Duration.textContent = "very long";
        option3Duration.value = "long";

        selectDuration.value = selectedTask.getDuration();
        console.log({duration: selectedTask.getDuration()});

        selectDuration.appendChild(option1Duration);
        selectDuration.appendChild(option2Duration);
        selectDuration.appendChild(option3Duration);

        durationComboBox.appendChild(selectDuration);
        // ----- //

        const priorityComboBox = document.createElement("div");
        const labelPriority = document.createElement("label");
        labelPriority.for = "priority-select";
        priorityComboBox.appendChild(labelPriority);
        const selectPriority = document.createElement("select");
        selectPriority.name = "priority";
        selectPriority.id = "priority-select";
        const option1Priority = document.createElement("option");
        option1Priority.textContent = "Priority Low"
        option1Priority.value = "low";

        const option2Priority = document.createElement("option");
        option2Priority.textContent = "Priority Medium"
        option2Priority.value = "medium";

        const option3Priority = document.createElement("option");
        option3Priority.textContent = "Priority High"
        option3Priority.value = "high";

        selectPriority.value = selectedTask.getPriority()
        console.log({priority: selectedTask.getPriority()});

        selectPriority.appendChild(option1Priority);
        selectPriority.appendChild(option2Priority);
        selectPriority.appendChild(option3Priority);

        priorityComboBox.appendChild(selectPriority);

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", () => {
            editDiv.classList.remove("editing");
            renderProjectTasks(activeProject);
            return;
        })

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", () => {
            selectedTask.setTitle(titleInput.value);
            selectedTask.setDesc(descriptionInput.value);
            selectedTask.setDate(dueDateInput.value);
            selectedTask.setPriority(selectPriority.value);
            selectedTask.setDuration(selectDuration.value);
            editDiv.classList.remove("editing");
            renderProjectTasks(activeProject);
            StorageController.storeProjects();
            return;
        })

        cancelBtn.classList.add("cancel-btn");
        saveBtn.classList.add("save-btn");
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("edit-actions");
        actionsDiv.appendChild(cancelBtn);
        actionsDiv.appendChild(saveBtn);




        editDiv.appendChild(titleInput);
        editDiv.appendChild(descriptionInput);
        editDiv.appendChild(dueDateInput);
        editDiv.appendChild(durationComboBox);
        editDiv.appendChild(priorityComboBox);
        editDiv.appendChild(actionsDiv);

    }

    const handleDeleteTask = (taskId) => {
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;

        activeProject.removeTask(taskId);
        renderProjectTasks(activeProject);
        StorageController.storeProjects();
    }

    const bindEvents = () => {
        content.addEventListener("click", (e) => {
            if (e.target.classList.contains("task-edit-btn")) {
                const taskDiv = e.target.closest('[data-id]')
                const taskId = taskDiv.dataset.id;
                handleEditTask(taskId);
            }
            if (e.target.classList.contains("task-delete-btn")) {
                const taskId = e.target.closest('[data-id]').dataset.id;
                handleDeleteTask(taskId);
            }
        })
    }

    return {
        renderProjectTasks,
        getActiveProject,
        bindEvents
    }
})();

export default ContentController;
const addTaskBtn = document.getElementById("add-task-btn");
const descTaskInput = document.getElementById("description-task");
const todoWrapper = document.querySelector(".todos-wrapper");

let tasks;
!localStorage.tasks
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? "checked" : ""}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index}) "class="btn-complete" type="checkbox" ${
        task.completed ? "checked" : ""
    }/>
                <button onclick="deleteTask(${index})"class="btn-delete">Delete</button>
            </div>
        </div>
    `;
};

const filterTasks = () => {
    const activeTasks =
        tasks.length && tasks.filter((i) => i.completed == false);
    const completedTasks =
        tasks.length && tasks.filter((i) => i.completed == true);
    tasks = [...activeTasks, ...completedTasks];
};

const fillHtmlList = () => {
    todoWrapper.innerHTML = "";
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll(".todo-item");
    }
};

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add("checked");
    } else {
        todoItemElems[index].classList.remove("checked");
    }
    updateLocal();
    fillHtmlList();
};

addTaskBtn.addEventListener("click", () => {
    if (descTaskInput.value == "") {
        return;
    } else {
        tasks.push(new Task(descTaskInput.value));
    }
    updateLocal();
    fillHtmlList();
});

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
};

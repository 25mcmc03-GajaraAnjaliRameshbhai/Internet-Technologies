let tasks = [];
let currentFilter = "all";

function addTask() {
    const text = document.getElementById("taskText").value;
    const date = document.getElementById("taskDate").value;
    const energy = document.getElementById("taskEnergy").value;

    if (text === "" || date === "") {
        alert("please enter task and due date");
        return;
    }

    tasks.push({
        text: text,
        dueDate: new Date(date),
        energy: energy,
        completed: false
    });

    document.getElementById("taskText").value = "";
    document.getElementById("taskDate").value = "";

    sortTasks();
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const today = new Date().toDateString();

    tasks.forEach((task, index) => {
        if (
            currentFilter === "completed" && !task.completed ||
            currentFilter === "pending" && task.completed
        ) return;

        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) li.classList.add("completed");

        if (!task.completed) {
            if (task.dueDate < new Date()) li.classList.add("overdue");
            else if (task.dueDate.toDateString() === today) li.classList.add("today");
        }

        li.innerHTML = `
            <span>
                <input type="checkbox" ${task.completed ? "checked" : ""} 
                onclick="toggleTask(${index})">
                ${task.text} (${task.energy})
                <br><small>due: ${task.dueDate.toDateString()}</small>
            </span>
            <button onclick="deleteTask(${index})">✕</button>
        `;

        list.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(type, button) {
    currentFilter = type;

    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    renderTasks();
}


function sortTasks() {
    tasks.sort((a, b) => a.dueDate - b.dueDate);
}

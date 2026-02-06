let tasks = [];
let currentFilter = "all";

function addTask() {
    const textInput = document.getElementById("taskText");
    const dateInput = document.getElementById("taskDate");
    const energyInput = document.getElementById("taskEnergy");

    if (textInput.value === "" || dateInput.value === "") {
        alert("Please enter task and date");
        return;
    }

    tasks.push({
        text: textInput.value,
        dueDate: new Date(dateInput.value),
        energy: energyInput.value,
        completed: false
    });

    textInput.value = "";
    dateInput.value = "";

    sortTasks();
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const today = new Date().toDateString();

    tasks.forEach((task, index) => {
        if (currentFilter === "completed" && !task.completed) return;
        if (currentFilter === "pending" && task.completed) return;

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
                <br><small>Due: ${task.dueDate.toDateString()}</small>
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

    document.querySelectorAll(".filter-btn").forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");
    renderTasks();
}

function sortTasks() {
    tasks.sort((a, b) => a.dueDate - b.dueDate);
}

class Task {
    text: string;
    dueDate: Date;
    energy: string;
    completed: boolean;

    constructor(text: string, dueDate: Date, energy: string) {
        this.text = text;
        this.dueDate = dueDate;
        this.energy = energy;
        this.completed = false;
    }
}

let tasks: Task[] = [];
let currentFilter: string = "all";

function addTask(): void {
    const textInput = document.getElementById("taskText") as HTMLInputElement;
    const dateInput = document.getElementById("taskDate") as HTMLInputElement;
    const energyInput = document.getElementById("taskEnergy") as HTMLSelectElement;

    if (textInput.value === "" || dateInput.value === "") {
        alert("Please enter task and date");
        return;
    }

    const task = new Task(
        textInput.value,
        new Date(dateInput.value),
        energyInput.value
    );

    tasks.push(task);
    textInput.value = "";
    dateInput.value = "";

    sortTasks();
    renderTasks();
}

function renderTasks(): void {
    const list = document.getElementById("taskList") as HTMLUListElement;
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

function toggleTask(index: number): void {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index: number): void {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(type: string, button: HTMLElement): void {
    currentFilter = type;

    document.querySelectorAll(".filter-btn").forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");
    renderTasks();
}

function sortTasks(): void {
    tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}

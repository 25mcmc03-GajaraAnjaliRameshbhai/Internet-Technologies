var Task = /** @class */ (function () {
    function Task(text, dueDate, energy) {
        this.text = text;
        this.dueDate = dueDate;
        this.energy = energy;
        this.completed = false;
    }
    return Task;
}());
var tasks = [];
var currentFilter = "all";
function addTask() {
    var textInput = document.getElementById("taskText");
    var dateInput = document.getElementById("taskDate");
    var energyInput = document.getElementById("taskEnergy");
    if (textInput.value === "" || dateInput.value === "") {
        alert("Please enter task and date");
        return;
    }
    var task = new Task(textInput.value, new Date(dateInput.value), energyInput.value);
    tasks.push(task);
    textInput.value = "";
    dateInput.value = "";
    sortTasks();
    renderTasks();
}
function renderTasks() {
    var list = document.getElementById("taskList");
    list.innerHTML = "";
    var today = new Date().toDateString();
    tasks.forEach(function (task, index) {
        if (currentFilter === "completed" && !task.completed)
            return;
        if (currentFilter === "pending" && task.completed)
            return;
        var li = document.createElement("li");
        li.className = "task";
        if (task.completed)
            li.classList.add("completed");
        if (!task.completed) {
            if (task.dueDate < new Date())
                li.classList.add("overdue");
            else if (task.dueDate.toDateString() === today)
                li.classList.add("today");
        }
        li.innerHTML = "\n            <span>\n                <input type=\"checkbox\" ".concat(task.completed ? "checked" : "", "\n                onclick=\"toggleTask(").concat(index, ")\">\n                ").concat(task.text, " (").concat(task.energy, ")\n                <br><small>Due: ").concat(task.dueDate.toDateString(), "</small>\n            </span>\n            <button onclick=\"deleteTask(").concat(index, ")\">\u2715</button>\n        ");
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
    document.querySelectorAll(".filter-btn").forEach(function (btn) {
        return btn.classList.remove("active");
    });
    button.classList.add("active");
    renderTasks();
}
function sortTasks() {
    tasks.sort(function (a, b) { return a.dueDate.getTime() - b.dueDate.getTime(); });
}

const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear existing list items
  tasks.forEach(task => addTaskToList(task));
}

// Function to add a task to the list (used by both adding and loading)
function addTaskToList(task) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
      <span>${task.text}</span>
      <span class="due-date">${task.dueDate || ""}</span>  
      <button class="delete-button">Delete</button>
  `;
  taskList.appendChild(taskItem);

  const deleteButton = taskItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
      const index = tasks.findIndex(t => t.text === task.text); // Find task by text
      if (index > -1) {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks(); // Re-render the list after deletion
      }
  });
}



addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const newTask = { text: taskText, dueDate: "" }; // Add due date property
        tasks.push(newTask);
        saveTasks();
        addTaskToList(newTask);  // Add to the list
        taskInput.value = "";
    }
});

renderTasks(); // Initial rendering of tasks
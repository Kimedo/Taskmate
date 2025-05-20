document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskNameInput = document.getElementById("taskName");
  const taskDateInput = document.getElementById("taskDate");
  const taskPriorityInput = document.getElementById("taskPriority");
  const taskList = document.getElementById("taskList");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const addTaskPanel = document.getElementById("addTaskPanel");
  const cancelAddTaskBtn = document.getElementById("cancelAddTaskBtn");

  let isEditing = false;
  let editingElement = null;

  addTaskBtn.addEventListener("click", () => {
    addTaskPanel.classList.remove("hidden");
    taskForm.reset();
    isEditing = false;
    editingElement = null;
  });

  cancelAddTaskBtn.addEventListener("click", () => {
    addTaskPanel.classList.add("hidden");
    taskForm.reset();
    isEditing = false;
    editingElement = null;
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = taskNameInput.value.trim();
    const dueDate = taskDateInput.value;
    const priority = taskPriorityInput.value;

    if (!name || !dueDate || !priority) return;

    if (isEditing && editingElement) {
      updateTask(editingElement, name, dueDate, priority);
    } else {
      const taskItem = createTaskItem(name, dueDate, priority);
      taskList.appendChild(taskItem);
    }

    taskForm.reset();
    addTaskPanel.classList.add("hidden");
    isEditing = false;
    editingElement = null;
  });

  function createTaskItem(name, dueDate, priority) {
    const item = document.createElement("div");
    item.className = `task-item ${priority}`;
    item.innerHTML = `
      <h3>${name}</h3>
      <p>Срок: ${dueDate}</p>
      <div class="task-actions">
        <button class="done-btn">✔</button>
        <button class="edit-btn">✏</button>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    item.querySelector(".done-btn").addEventListener("click", () => {
      item.classList.toggle("completed");
    });

    item.querySelector(".edit-btn").addEventListener("click", () => {
      taskNameInput.value = name;
      taskDateInput.value = dueDate;
      taskPriorityInput.value = priority;
      addTaskPanel.classList.remove("hidden");
      isEditing = true;
      editingElement = item;
    });

    item.querySelector(".delete-btn").addEventListener("click", () => {
      item.remove();
    });

    return item;
  }

  function updateTask(item, name, dueDate, priority) {
    item.className = `task-item ${priority}`;
    item.querySelector("h3").textContent = name;
    item.querySelector("p").textContent = `Срок: ${dueDate}`;
  }

  // Навигация
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", function () {
      document.querySelectorAll(".menu-item").forEach((el) => el.classList.remove("active"));
      this.classList.add("active");

      const section = this.getAttribute("data-section");
      document.querySelectorAll(".section").forEach((sec) => sec.classList.remove("active"));
      document.getElementById(section).classList.add("active");
    });
  });
});

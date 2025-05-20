const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const optimizeBtn = document.getElementById("optimizeBtn");
const aiAdvice = document.getElementById("aiAdvice");

let tasks = [];

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    const task = { text, done: false };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.textContent = task.text;

    li.addEventListener("click", () => {
      task.done = !task.done;
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

optimizeBtn.addEventListener("click", async () => {
  if (tasks.length === 0) {
    aiAdvice.textContent = "Добавьте задачи, чтобы их можно было оптимизировать.";
    return;
  }

  const response = await fetch("/api/ai/optimize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tasks }),
  });

  const data = await response.json();
  aiAdvice.textContent = "AI советует: " + data.advice;
});

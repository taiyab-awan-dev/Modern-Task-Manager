const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

window.onload = function () {
  loadTasks();
};

taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  createTaskElement(taskText, false);

  saveTask(taskText, false);

  taskInput.value = '';
}

function createTaskElement(taskText, completed) {
  const li = document.createElement('li');

  if (completed) {
    li.classList.add('completed');
  }

  li.innerHTML = `
    <div class="task-content">
      <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
      <span>${taskText}</span>
    </div>

    <span class="delete-btn">Delete</span>
  `;

  const checkbox = li.querySelector('.checkbox');

  checkbox.addEventListener('change', function () {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  li.querySelector('.delete-btn').addEventListener('click', function () {
    li.remove();
    updateLocalStorage();
  });

  taskList.appendChild(li);
}

function saveTask(taskText, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.push({
    text: taskText,
    completed: completed
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function updateLocalStorage() {
  const tasks = [];

  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

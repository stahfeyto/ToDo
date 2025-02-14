let tasks = [];

// Carregar tarefas do localStorage quando a página for carregada
document.addEventListener('DOMContentLoaded', loadTasks);

// Função para carregar tarefas do localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

// Função para adicionar uma tarefa
function addTask(taskContent) {
  const task = {
    id: Date.now(),
    content: taskContent,
    completed: false
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Função para remover uma tarefa
function removeTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Função para marcar ou desmarcar tarefa como completa
function toggleTaskCompletion(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

// Função para renderizar tarefas na interface
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.classList.add(task.completed ? 'completed' : '');
    taskElement.innerHTML = `
      <span>${task.content}</span>
      <button onclick="removeTask(${task.id})">Remover</button>
      <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Desmarcar' : 'Marcar'}</button>
    `;
    taskList.appendChild(taskElement);
  });
}

// Exemplo de como adicionar uma nova tarefa
document.getElementById('add-task-button').addEventListener('click', () => {
  const taskContent = document.getElementById('task-input').value;
  if (taskContent) {
    addTask(taskContent);
    document.getElementById('task-input').value = ''; // Limpa o campo de input
  }
});

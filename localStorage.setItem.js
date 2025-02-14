const addTask = (task) => {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }
  };
  const removeTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  
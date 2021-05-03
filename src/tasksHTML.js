import { addTaskToTasks } from './tasksLogic.js';

const TaskHTML = (task) => {
  const taskItem = document.createElement('div');
  taskItem.setAttribute('class', 'itemCard flexColumn');
  taskItem.setAttribute('id', `task${task.id}`)

  const flexContainer1 = document.createElement('div');
  flexContainer1.setAttribute('class', 'flexContainer');

  const title = document.createElement('h2');
  title.setAttribute('class', 'title');
  title.textContent = task.name;
  flexContainer1.appendChild(title);

  const date = document.createElement('p');
  date.setAttribute('class', 'dateFormat');
  date.textContent = task.name;
  flexContainer1.appendChild(date);

  const flexColumn = document.createElement('div');
  flexColumn.setAttribute('class', 'flexColumn');

  const completeTask = document.createElement('i');
  completeTask.setAttribute('class', 'alignUp projectBtn far fa-calendar completeTask');
  completeTask.setAttribute('id', `completeTask${task.id}`)
  flexColumn.appendChild(completeTask);

  const showDetail = document.createElement('i');
  showDetail.setAttribute('class', 'alignDown projectBtn fas fa-angle-double-down showDetail');
  showDetail.setAttribute('id', `showDetail${task.id}`)
  flexColumn.appendChild(showDetail);

  flexContainer1.appendChild(flexColumn);

  taskItem.appendChild(flexContainer1);

  const taskDetail = document.createElement('div');
  taskDetail.setAttribute('class', 'taskDetail');
  taskDetail.setAttribute('id', `taskDetail${task.id}`)
  taskDetail.setAttribute('hidden', 'true')

  taskItem.appendChild(editIcon);
  taskItem.appendChild(deleteIcon);

  return taskItem;
};

function appendTaskToTasks(task) {
  const tasksContent = document.querySelector('#tasksContent');
  const taskItem = TaskHTML(task);
  tasksContent.appendChild(taskItem);
}

function saveNewTask() {
  const taskName = document.querySelector('#taskName').value;
  const taskDescription = document.querySelector('#taskDescription').value;
  const taskPriority = document.querySelector('#taskPriority').value;
  const taskProject = document.querySelector('#taskProject').value;
  const taskDueDate = document.querySelector('#taskDueDate').value;
  const task = addTaskToTasks(taskName.value, taskDescription.value, taskPriority.value, taskProject.value, taskDueDate.value);
  appendTaskToTasks(task);
  taskName.value = '';
  taskDescription.value = '';
  taskPriority.value = '';
  taskProject.value = '';
  taskDueDate.value = '';
}

function drawTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    appendTaskToTasks(tasks[i])
  }
}

export { saveNewTask, drawTasks };

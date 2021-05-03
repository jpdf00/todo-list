import { addTaskToTasks } from './tasksLogic.js';

const TaskHTML = (task) => {
  const taskItem = document.createElement('div');
  taskItem.setAttribute('class', 'itemCard flexColumn');
  taskItem.setAttribute('id', `task${task.id}`)

  const flexContainer1 = document.createElement('div');
  flexContainer1.setAttribute('class', 'flexContainer');

  const name = document.createElement('h2');
  name.setAttribute('class', 'title');
  name.textContent = task.name;
  flexContainer1.appendChild(name);

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

  const flexContainer2 = document.createElement('div');
  flexContainer2.setAttribute('class', 'flexContainer');

  const detailStyle1 = document.createElement('div');
  detailStyle1.setAttribute('class', 'flexContainer detailStyle detailSize');

  const description = document.createElement('p');
  description.setAttribute('class', 'textFormat marginRight');
  description.textContent = task.description;
  detailStyle1.appendChild(description);

  const priority = document.createElement('p');
  priority.setAttribute('class', 'textFormat marginRight');
  priority.textContent = task.priority;
  detailStyle1.appendChild(priority);

  const project = document.createElement('p');
  project.setAttribute('class', 'textFormat marginRight');
  project.textContent = task.project;
  detailStyle1.appendChild(project);

  flexContainer2.appendChild(detailStyle1);

  const detailStyle2 = document.createElement('div');
  detailStyle2.setAttribute('class', 'flexContainer detailStyle');

  const editTask = document.createElement('i');
  editTask.setAttribute('class', 'editTask projectBtn marginRight fas fa-edit');
  editTask.setAttribute('id', `editTask${task.id}`)
  detailStyle2.appendChild(editTask);

  const deleteTask = document.createElement('i');
  deleteTask.setAttribute('class', 'deleteTask projectBtn marginRight far fa-trash-alt');
  deleteTask.setAttribute('id', `deleteTask${task.id}`)
  detailStyle2.appendChild(deleteTask);

  flexContainer2.appendChild(detailStyle2);

  taskDetail.appendChild(flexContainer2);

  taskItem.appendChild(taskDetail);

  return taskItem;
};

function appendTaskToTasks(task) {
  const tasksContent = document.querySelector('#tasksContent');
  const taskItem = TaskHTML(task);
  tasksContent.appendChild(taskItem);
}

function saveNewTask() {
  const taskName = document.querySelector('#taskName');
  const taskDescription = document.querySelector('#taskDescription');
  const taskPriority = document.querySelector('#taskPriority');
  const taskProject = document.querySelector('#taskProject');
  const taskDueDate = document.querySelector('#taskDueDate');
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

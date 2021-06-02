import {
  addTaskToTasks,
  retrieveTask,
  editTask,
  deleteTask,
} from './tasksLogic.js';

const TaskHTML = (task) => {
  const currentProject = JSON.parse(localStorage.getItem('currentProject'));

  let taskCardClass = 'taskCard';

  switch (task.priority) {
    case 'Lowest Priority':
      taskCardClass += ' taskPriorityLowest'
      break;
    case 'Low Priority':
      taskCardClass += ' taskPriorityLow'
      break;
    case 'Medium Priority':
      taskCardClass += ' taskPriorityMedium'
      break;
    case 'High Priority':
      taskCardClass += ' taskPriorityHigh'
      break;
    case 'Highest Priority':
      taskCardClass += ' taskPriorityHighest'
      break;
    default:
      taskCardClass += ''
      break;
  }

  const taskItem = document.createElement('div');

  if (task.project !== currentProject && currentProject) {
    taskItem.setAttribute('hidden', 'true')
  }

  const taskCard = document.createElement('div');
  taskCard.setAttribute('class', `${taskCardClass}`);
  taskCard.setAttribute('id', `task${task.id}`);

  const taskCardTop = document.createElement('div');
  taskCardTop.setAttribute('class', 'taskCardInfo');

  const completeTask = document.createElement('i');
  const completeClass = (task.completed) ? 'taksCompleted far fa-calendar-check completeTask' : 'taksPending far fa-calendar completeTask';
  completeTask.setAttribute('class', `${completeClass}`);
  completeTask.setAttribute('id', `completeTask${task.id}`);
  taskCardTop.appendChild(completeTask);

  const taskCardInfo = document.createElement('div');
  const toggleContainer = (task.completed) ? 'taskCardInfo  disabled' : 'taskCardInfo';
  taskCardInfo.setAttribute('class', `${toggleContainer}`);
  taskCardInfo.setAttribute('id', `taskCardInfo${task.id}`);

  const name = document.createElement('h2');
  name.setAttribute('class', 'title');
  name.setAttribute('id', `taskName${task.id}`);
  name.textContent = task.name;
  taskCardInfo.appendChild(name);

  const date = document.createElement('p');
  date.setAttribute('class', 'taskDate');
  date.setAttribute('id', `taskDueDate${task.id}`);
  date.textContent = task.dueDate.split('-').reverse().join('/');
  taskCardInfo.appendChild(date);

  taskCardTop.appendChild(taskCardInfo);

  const showDetail = document.createElement('i');
  showDetail.setAttribute('class', 'alignDown projectBtn fas fa-angle-double-down taskShow');
  showDetail.setAttribute('id', `taskShow${task.id}`);
  taskCardTop.appendChild(showDetail);


  taskCard.appendChild(taskCardTop);

  const taskDetail = document.createElement('div');
  taskDetail.setAttribute('class', 'taskDetail');
  taskDetail.setAttribute('id', `taskDetail${task.id}`);
  taskDetail.setAttribute('hidden', 'true');

  const displayFlex2 = document.createElement('div');
  displayFlex2.setAttribute('class', 'taskCardInfo');

  const detailStyle1 = document.createElement('div');
  detailStyle1.setAttribute('class', 'taskDetailInfo');

  const description = document.createElement('p');
  description.setAttribute('class', 'taskDetailText');
  description.setAttribute('id', `taskDescription${task.id}`);
  description.textContent = task.description;
  detailStyle1.appendChild(description);

  const priority = document.createElement('p');
  priority.setAttribute('class', 'taskDetailText');
  priority.setAttribute('id', `taskPriority${task.id}`);
  priority.textContent = task.priority;
  detailStyle1.appendChild(priority);

  const project = document.createElement('p');
  project.setAttribute('class', 'taskDetailText');
  project.setAttribute('id', `taskProject${task.id}`);
  project.textContent = task.project;
  detailStyle1.appendChild(project);

  displayFlex2.appendChild(detailStyle1);

  const detailStyle2 = document.createElement('div');
  detailStyle2.setAttribute('class', 'taskDetailBtns');

  const editTask = document.createElement('i');
  editTask.setAttribute('class', 'taskEdit fas fa-edit');
  editTask.setAttribute('id', `taskEdit${task.id}`);
  detailStyle2.appendChild(editTask);

  const deleteTask = document.createElement('i');
  deleteTask.setAttribute('class', 'taskDelete far fa-trash-alt');
  deleteTask.setAttribute('id', `taskDelete${task.id}`);
  detailStyle2.appendChild(deleteTask);

  displayFlex2.appendChild(detailStyle2);

  taskDetail.appendChild(displayFlex2);

  taskCard.appendChild(taskDetail);

  taskItem.appendChild(taskCard);

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
  const task = addTaskToTasks(
    taskName.value,
    taskDescription.value,
    taskPriority.value,
    taskProject.value,
    taskDueDate.value,
  );
  appendTaskToTasks(task);
  taskName.value = '';
  taskDescription.value = '';
  taskPriority.value = 'Low';
  taskProject.value = 'Default Project';
  taskDueDate.value = '';
}

function callEditFormTasks(id) {
  const taskName = document.querySelector('#taskName');
  const taskDescription = document.querySelector('#taskDescription');
  const taskPriority = document.querySelector('#taskPriority');
  const taskProject = document.querySelector('#taskProject');
  const taskDueDate = document.querySelector('#taskDueDate');
  const task = retrieveTask(id);
  taskName.value = task.name;
  taskDescription.value = task.description;
  taskPriority.value = task.priority;
  taskProject.value = task.project;
  taskDueDate.value = task.dueDate;
}

function saveEditedTask(id) {
  const taskName = document.querySelector('#taskName');
  const taskDescription = document.querySelector('#taskDescription');
  const taskPriority = document.querySelector('#taskPriority');
  const taskProject = document.querySelector('#taskProject');
  const taskDueDate = document.querySelector('#taskDueDate');
  const taskCard = document.querySelector(`#task${id}`);
  const taskNameId = document.querySelector(`#taskName${id}`);
  const taskDescriptionId = document.querySelector(`#taskDescription${id}`);
  const taskPriorityId = document.querySelector(`#taskPriority${id}`);
  const taskProjectId = document.querySelector(`#taskProject${id}`);
  const taskDueDateId = document.querySelector(`#taskDueDate${id}`);
  editTask(
    id,
    taskName.value,
    taskDescription.value,
    taskPriority.value,
    taskProject.value,
    taskDueDate.value,
  );
  taskNameId.textContent = taskName.value;
  taskDescriptionId.textContent = taskDescription.value;
  taskPriorityId.textContent = taskPriority.value;
  taskProjectId.textContent = taskProject.value;
  taskDueDateId.textContent = taskDueDate.value.split('-').reverse().join('/');
  switch (taskPriority.value) {
    case 'Lowest Priority':
      taskCard.setAttribute('class','taskCard taskPriorityLowest')
      break;
    case 'Low Priority':
      taskCard.setAttribute('class','taskCard taskPriorityLow')
      break;
    case 'Medium Priority':
      taskCard.setAttribute('class','taskCard taskPriorityMedium')
      break;
    case 'High Priority':
      taskCard.setAttribute('class','taskCard taskPriorityHigh')
      break;
    case 'Highest Priority':
      taskCard.setAttribute('class','taskCard taskPriorityHighest')
      break;
    default:
      taskCard.setAttribute('class','taskCard')
      break;
  }
  taskName.value = '';
  taskDescription.value = '';
  taskPriority.value = 'Low';
  taskProject.value = 'Default Project';
  taskDueDate.value = '';
}

function changeTaskByProject(projectOld, projectNew) {
  const tasksContent = document.querySelector('#tasksContent').children;
  for (let i = 0; i < tasksContent.length; i += 1) {
    const taskProject = tasksContent[i]
      .firstElementChild
      .lastElementChild
      .firstElementChild
      .firstElementChild
      .lastElementChild;
    if (projectOld === taskProject.textContent) {
      taskProject.textContent = projectNew;
    }
  }
}

function removeTaskFromTasks(id) {
  const taskItem = document.querySelector(`#task${id}`);
  deleteTask(id);
  taskItem.parentElement.removeChild(taskItem);
}

function removeTaskByProject(project) {
  const tasksContent = document.querySelector('#tasksContent').children;
  for (let i = 0; i < tasksContent.length; ) {
    const taskProject = tasksContent[i]
      .firstElementChild
      .lastElementChild
      .firstElementChild
      .firstElementChild
      .lastElementChild;
    if (project === taskProject.textContent) {
      tasksContent[i].parentElement.removeChild(tasksContent[i]);
    } else {
      i += 1
    }
  }
}

function drawTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    appendTaskToTasks(tasks[i]);
  }
}

export {
  saveNewTask,
  drawTasks,
  callEditFormTasks,
  saveEditedTask,
  removeTaskFromTasks,
  removeTaskByProject,
  changeTaskByProject,
};

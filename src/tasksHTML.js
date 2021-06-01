import {
  addTaskToTasks,
  retrieveTask,
  editTask,
  deleteTask,
} from './tasksLogic.js';

const TaskHTML = (task) => {
  const currentProject = JSON.parse(localStorage.getItem('currentProject'));

  const taskItemClass = (task.project === currentProject || !currentProject) ? 'itemCard flexColumn' : 'itemCard displayNone';

  const taskItem = document.createElement('div');
  taskItem.setAttribute('class', `${taskItemClass}`);
  taskItem.setAttribute('id', `task${task.id}`);

  const displayFlex1 = document.createElement('div');
  const toggleContainer = (task.completed) ? 'displayFlex  disabled' : 'displayFlex';
  displayFlex1.setAttribute('class', `${toggleContainer}`);

  const name = document.createElement('h2');
  name.setAttribute('class', 'title');
  name.setAttribute('id', `taskName${task.id}`);
  name.textContent = task.name;
  displayFlex1.appendChild(name);

  const date = document.createElement('p');
  date.setAttribute('class', 'dateFormat');
  date.setAttribute('id', `taskDueDate${task.id}`);
  date.textContent = task.dueDate.split('-').reverse().join('/');
  displayFlex1.appendChild(date);

  const flexColumn = document.createElement('div');
  flexColumn.setAttribute('class', 'flexColumn');

  const completeTask = document.createElement('i');
  const completeClass = (task.completed) ? 'taksCompleted alignUp projectBtn far fa-calendar-check completeTask' : 'taksPending alignUp projectBtn far fa-calendar completeTask';
  completeTask.setAttribute('class', `${completeClass}`);
  completeTask.setAttribute('id', `completeTask${task.id}`);
  flexColumn.appendChild(completeTask);

  const showDetail = document.createElement('i');
  showDetail.setAttribute('class', 'alignDown projectBtn fas fa-angle-double-down showDetail');
  showDetail.setAttribute('id', `showDetail${task.id}`);
  flexColumn.appendChild(showDetail);

  displayFlex1.appendChild(flexColumn);

  taskItem.appendChild(displayFlex1);

  const taskDetail = document.createElement('div');
  taskDetail.setAttribute('class', 'taskDetail');
  taskDetail.setAttribute('id', `taskDetail${task.id}`);
  taskDetail.setAttribute('hidden', 'true');

  const displayFlex2 = document.createElement('div');
  displayFlex2.setAttribute('class', 'displayFlex');

  const detailStyle1 = document.createElement('div');
  detailStyle1.setAttribute('class', 'displayFlex detailStyle detailSize');

  const description = document.createElement('p');
  description.setAttribute('class', 'marginRight');
  description.setAttribute('id', `taskDescription${task.id}`);
  description.textContent = task.description;
  detailStyle1.appendChild(description);

  const priority = document.createElement('p');
  priority.setAttribute('class', 'marginRight');
  priority.setAttribute('id', `taskPriority${task.id}`);
  priority.textContent = task.priority;
  detailStyle1.appendChild(priority);

  const project = document.createElement('p');
  project.setAttribute('class', 'marginRight');
  project.setAttribute('id', `taskProject${task.id}`);
  project.textContent = task.project;
  detailStyle1.appendChild(project);

  displayFlex2.appendChild(detailStyle1);

  const detailStyle2 = document.createElement('div');
  detailStyle2.setAttribute('class', 'displayFlex detailStyle');

  const editTask = document.createElement('i');
  editTask.setAttribute('class', 'editTask projectBtn marginRight fas fa-edit');
  editTask.setAttribute('id', `editTask${task.id}`);
  detailStyle2.appendChild(editTask);

  const deleteTask = document.createElement('i');
  deleteTask.setAttribute('class', 'deleteTask projectBtn marginRight far fa-trash-alt');
  deleteTask.setAttribute('id', `deleteTask${task.id}`);
  detailStyle2.appendChild(deleteTask);

  displayFlex2.appendChild(detailStyle2);

  taskDetail.appendChild(displayFlex2);

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

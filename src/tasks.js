import { getProjects } from './projects';

let taskList = [];
let isEdited = false;

if (localStorage.getItem('taskList') === null) {
  taskList = [];
} else {
  taskList = JSON.parse(localStorage.getItem('taskList'));
}

const Task = (name, description, priority, project, dueDate, completed) => ({
  name, description, priority, project, dueDate, completed,
});

const TaskHTML = (task, i) => {
  const taskItem = document.createElement('tr');
  taskItem.setAttribute('id', `tr${i}`);

  const tdName = document.createElement('td');
  const tdDescription = document.createElement('td');
  const tdPriority = document.createElement('td');
  const tdProject = document.createElement('td');
  const tdDueDate = document.createElement('td');
  const tdCompleted = document.createElement('td');
  const chkCompleted = document.createElement('button');
  const dltButton = document.createElement('button');
  const editButton = document.createElement('button');
  const priorityDropdown = document.createElement('select');
  const pLow = document.createElement('option');
  const pNormal = document.createElement('option');
  const pUrgent = document.createElement('option');

  pLow.textContent = 'Low';
  pNormal.textContent = 'Normal';
  pUrgent.textContent = 'Urgent';

  pLow.setAttribute('value', 'Low');
  pNormal.setAttribute('value', 'Normal');
  pUrgent.setAttribute('value', 'Urgent');

  priorityDropdown.appendChild(pLow);
  priorityDropdown.appendChild(pNormal);
  priorityDropdown.appendChild(pUrgent);
  priorityDropdown.value = task.priority;

  priorityDropdown.setAttribute('class', 'form-select changePriority');
  priorityDropdown.setAttribute('id', `changePriority${i}`);

  tdName.textContent = task.name;
  tdDescription.textContent = task.description;
  tdPriority.appendChild(priorityDropdown);
  tdProject.textContent = task.project;
  tdDueDate.textContent = task.dueDate;

  dltButton.setAttribute('id', `dlt${i}`);
  dltButton.setAttribute('class', 'm-2 btn btn-danger deleteTask');
  dltButton.textContent = 'Delete';

  editButton.setAttribute('id', `edit${i}`);
  editButton.setAttribute('class', 'm-2 btn btn-primary editTask');
  editButton.textContent = 'Edit';

  const btnColor = (task.completed) ? 'btn-success' : 'btn-danger';
  const btnText = (task.completed) ? 'Completed' : 'Pending';

  chkCompleted.setAttribute('class', `completTask btn ${btnColor}`);
  chkCompleted.setAttribute('id', `btnCompleted${i}`);
  chkCompleted.textContent = btnText;

  tdCompleted.appendChild(chkCompleted);
  tdCompleted.appendChild(dltButton);
  tdCompleted.appendChild(editButton);
  taskItem.appendChild(tdName);
  taskItem.appendChild(tdDescription);
  taskItem.appendChild(tdPriority);
  taskItem.appendChild(tdProject);
  taskItem.appendChild(tdDueDate);

  taskItem.appendChild(tdCompleted);

  return taskItem;
};

function drawTasksByProject(projectName) {
  const taskView = document.createElement('table');
  const thead = document.createElement('thead');
  const thRow = document.createElement('tr');
  const headName = document.createElement('th');
  const headDescription = document.createElement('th');
  const headPriority = document.createElement('th');
  const headProject = document.createElement('th');
  const headDueDate = document.createElement('th');
  const headCompleted = document.createElement('th');

  const tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tableBody');

  taskView.setAttribute('class', 'table');
  thead.setAttribute('class', 'thead-dark');
  headName.textContent = 'Name';
  headDescription.textContent = 'Description';
  headPriority.textContent = 'Priority';
  headProject.textContent = 'Project';
  headDueDate.textContent = 'Due date';
  headCompleted.textContent = 'Options';

  thRow.appendChild(headName);
  thRow.appendChild(headDescription);
  thRow.appendChild(headPriority);
  thRow.appendChild(headProject);
  thRow.appendChild(headDueDate);
  thRow.appendChild(headCompleted);

  thead.appendChild(thRow);
  taskView.appendChild(thead);

  for (let i = 0; i < taskList.length; i += 1) {
    if (taskList[i].project === projectName || projectName === 'all') {
      const task = TaskHTML(taskList[i], i);
      tbody.appendChild(task);
    }
  }

  taskView.appendChild(tbody);
  return taskView;
}

function addTask(name, description, priority, project, dueDate) {
  const task = Task(name, description, priority, project, dueDate, false);
  taskList.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskList));

  return drawTasksByProject('all');
}

function changeTask(index) {
  if (taskList[index].completed) {
    taskList[index].completed = false;
    const chkCompleted = document.getElementById(`btnCompleted${index}`);
    chkCompleted.setAttribute('class', 'completTask btn btn-danger');
    chkCompleted.textContent = 'Pending';
  } else {
    taskList[index].completed = true;
    const chkCompleted = document.getElementById(`btnCompleted${index}`);
    chkCompleted.setAttribute('class', 'completTask btn btn-success');
    chkCompleted.textContent = 'Completed';
  }
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function changePriority(index, priority) {
  taskList[index].priority = priority;
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function dltTask(index) {
  const taskRow = document.getElementById(`tr${index}`);
  const tBody = document.getElementById('tableBody');
  tBody.removeChild(taskRow);
  taskList.splice(index, 1);
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function createFormTasks(task, i) {
  const taskForm = document.createElement('tr');
  taskForm.setAttribute('id', 'trForm');

  const tdName = document.createElement('td');
  const tdDescription = document.createElement('td');
  const tdPriority = document.createElement('td');
  const tdProject = document.createElement('td');
  const tdDueDate = document.createElement('td');
  const tdOptions = document.createElement('td');

  const pLow = document.createElement('option');
  const pNormal = document.createElement('option');
  const pUrgent = document.createElement('option');

  const saveTask = document.createElement('button');

  saveTask.setAttribute('class', 'btn btn-primary updateTask');
  saveTask.setAttribute('id', `task${i}`);
  saveTask.textContent = 'Save';

  pLow.textContent = 'Low';
  pNormal.textContent = 'Normal';
  pUrgent.textContent = 'Urgent';

  pLow.setAttribute('value', 'Low');
  pNormal.setAttribute('value', 'Normal');
  pUrgent.setAttribute('value', 'Urgent');

  const inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('id', 'formName');

  const inputDescription = document.createElement('input');
  inputDescription.setAttribute('type', 'text');
  inputDescription.setAttribute('id', 'formDescription');

  const inputPriority = document.createElement('select');
  inputPriority.appendChild(pLow);
  inputPriority.appendChild(pNormal);
  inputPriority.appendChild(pUrgent);
  inputPriority.setAttribute('id', 'formPriority');

  const inputProject = document.createElement('select');
  inputProject.setAttribute('id', 'editProjectForm');

  const inputDueDate = document.createElement('input');
  inputDueDate.setAttribute('type', 'date');
  inputDueDate.setAttribute('id', 'formDate');

  inputName.value = task.name;
  inputDescription.value = task.description;
  inputPriority.value = task.priority;
  inputDueDate.value = task.dueDate;

  tdName.appendChild(inputName);
  tdDescription.appendChild(inputDescription);
  tdPriority.appendChild(inputPriority);
  tdProject.appendChild(inputProject);
  tdDueDate.appendChild(inputDueDate);
  tdOptions.appendChild(saveTask);

  taskForm.appendChild(tdName);
  taskForm.appendChild(tdDescription);
  taskForm.appendChild(tdPriority);
  taskForm.appendChild(tdProject);
  taskForm.appendChild(tdDueDate);
  taskForm.appendChild(tdOptions);

  return taskForm;
}

function insertAfter(newNode, existingNode) {
  if (!isEdited) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    isEdited = true;
  }
}

function updateTask(index) {
  taskList[index].name = document.querySelector('#formName').value;
  taskList[index].description = document.querySelector('#formDescription').value;
  taskList[index].priority = document.querySelector('#formPriority').value;
  taskList[index].project = document.querySelector('#editProjectForm').value;
  taskList[index].dueDate = document.querySelector('#formDate').value;
  localStorage.setItem('taskList', JSON.stringify(taskList));
  isEdited = false;
  return taskList[index].project;
}

function drawFormTasks(index) {
  const task = taskList[index];
  const editForm = createFormTasks(task, index);
  const taskRow = document.getElementById(`tr${index}`);
  taskRow.setAttribute('hidden', true);
  insertAfter(editForm, taskRow);
  getProjects('#editProjectForm');
}

export {
  addTask, drawTasksByProject, changeTask, dltTask, changePriority, drawFormTasks, updateTask,
};

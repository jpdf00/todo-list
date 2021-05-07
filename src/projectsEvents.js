// Sort tasks by project
function eventSortTaskByProject(e) {
  const button = e.target;
  const tasksContent = document.querySelector('#tasksContent').children;
  const projectsAll = document.querySelectorAll('.projectSort');
  if (button.parentElement.attributes[0].value === 'itemCardReversed flexContainer') {
    button.parentElement.attributes[0].value = 'itemCard flexContainer';
    for (let i = 0; i < tasksContent.length; i += 1) {
      tasksContent[i].setAttribute('class', 'itemCard flexColumn');
    }
    localStorage.setItem('currentProject', JSON.stringify(''));
  } else {
    button.parentElement.attributes[0].value = 'itemCardReversed flexContainer';
    projectsAll.forEach((item) => {
      if (item !== button) {
        item.parentElement.attributes[0].value = 'itemCard flexContainer';
      }
    });
    for (let i = 0; i < tasksContent.length; i += 1) {
      const taskProject = tasksContent[i].lastElementChild.firstElementChild.firstElementChild.lastElementChild;
      if (button.textContent === taskProject.textContent) {
        tasksContent[i].setAttribute('class', 'itemCard flexColumn');
      } else {
        tasksContent[i].setAttribute('class', 'itemCard displayNone');
      }
    }
    localStorage.setItem('currentProject', JSON.stringify(button.textContent));
  }
}

function refreshProjectsListener() {
  // Get the projects that to shows tasks by project
  const projectsAll = document.querySelectorAll('.projectSort');
  projectsAll.forEach((button) => {
    button.addEventListener('click', eventSortTaskByProject);
  });
}

export default refreshProjectsListener;

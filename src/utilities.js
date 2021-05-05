import { Project } from './projectsLogic.js';

function populateStorage(title) {
  if (localStorage.getItem(`${title}`) === null) {
    let item;

    switch (title) {
      case 'projects':
        item = [Project(0, 'Default Project')];
        break;
      case 'tasks':
        item = [];
        break;
      case 'projectCount':
      case 'taskCount':
        item = 0;
        break;
      case 'currentProject':
        item = '';
        break;
      default:
        item = null;
        break;
    }

    localStorage.setItem(`${title}`, JSON.stringify(item));
  }
}

export { populateStorage };

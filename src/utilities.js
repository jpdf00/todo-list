import { Project } from './projectsLogic.js';

function populateStorage(title){
  if (localStorage.getItem(`${title}`) === null){
    let item;
    if (title === 'projects') {
      item = [Project(0, 'Default Project')];
    } else if (title === 'tasks') {
      item = [];
    } else if (title.match(/Count/g).toString() === 'Count') {
      item = 0
    }
    localStorage.setItem(`${title}`, JSON.stringify(item))
  }
}

export { populateStorage };

(()=>{"use strict";const e=(e,t)=>({id:e,name:t}),t=function(t){if(null===localStorage.getItem(`${t}`)){let r;switch(t){case"projects":r=[e(0,"Default Project")];break;case"tasks":r=[];break;case"projectCount":case"taskCount":r=0;break;case"currentProject":r="";break;default:r=null}localStorage.setItem(`${t}`,JSON.stringify(r))}};function r(e){const t=document.querySelector("#projectsContent"),r=(e=>{const t=JSON.parse(localStorage.getItem("currentProject")),r=e.name===t?"itemCardReversed flexContainer":"itemCard flexContainer",n=document.createElement("div");n.setAttribute("class",`${r}`),n.setAttribute("id",`project${e.id}`);const a=document.createElement("p");a.setAttribute("class","project projectSort"),a.setAttribute("id",`project${e.id}`),a.textContent=e.name;const o=document.createElement("i");o.setAttribute("class","editProject projectBtn fas fa-edit"),o.setAttribute("id",`editProject${e.id}`);const c=document.createElement("i");return c.setAttribute("class","deleteProject projectBtn far fa-trash-alt"),c.setAttribute("id",`deleteProject${e.id}`),n.appendChild(a),n.appendChild(o),n.appendChild(c),n})(e);t.appendChild(r)}function n(e){const t=document.querySelector("#taskProject"),r=document.createElement("option");r.setAttribute("value",`${e}`),r.textContent=e,t.appendChild(r)}function a(e){const t=document.querySelector("#tasksContent"),r=(e=>{const t=JSON.parse(localStorage.getItem("currentProject")),r=e.project!==t&&t?"itemCard displayNone":"itemCard flexColumn",n=document.createElement("div");n.setAttribute("class",`${r}`),n.setAttribute("id",`task${e.id}`);const a=document.createElement("div"),o=e.completed?"flexContainer  disabled":"flexContainer";a.setAttribute("class",`${o}`);const c=document.createElement("h2");c.setAttribute("class","title"),c.setAttribute("id",`taskName${e.id}`),c.textContent=e.name,a.appendChild(c);const s=document.createElement("p");s.setAttribute("class","dateFormat"),s.setAttribute("id",`taskDueDate${e.id}`),s.textContent=e.dueDate.split("-").reverse().join("/"),a.appendChild(s);const l=document.createElement("div");l.setAttribute("class","flexColumn");const i=document.createElement("i"),u=e.completed?"taksCompleted alignUp projectBtn far fa-calendar-check completeTask":"taksPending alignUp projectBtn far fa-calendar completeTask";i.setAttribute("class",`${u}`),i.setAttribute("id",`completeTask${e.id}`),l.appendChild(i);const d=document.createElement("i");d.setAttribute("class","alignDown projectBtn fas fa-angle-double-down showDetail"),d.setAttribute("id",`showDetail${e.id}`),l.appendChild(d),a.appendChild(l),n.appendChild(a);const m=document.createElement("div");m.setAttribute("class","taskDetail"),m.setAttribute("id",`taskDetail${e.id}`),m.setAttribute("hidden","true");const p=document.createElement("div");p.setAttribute("class","flexContainer");const f=document.createElement("div");f.setAttribute("class","flexContainer detailStyle detailSize");const S=document.createElement("p");S.setAttribute("class","marginRight"),S.setAttribute("id",`taskDescription${e.id}`),S.textContent=e.description,f.appendChild(S);const k=document.createElement("p");k.setAttribute("class","marginRight"),k.setAttribute("id",`taskPriority${e.id}`),k.textContent=e.priority,f.appendChild(k);const C=document.createElement("p");C.setAttribute("class","marginRight"),C.setAttribute("id",`taskProject${e.id}`),C.textContent=e.project,f.appendChild(C),p.appendChild(f);const v=document.createElement("div");v.setAttribute("class","flexContainer detailStyle");const b=document.createElement("i");b.setAttribute("class","editTask projectBtn marginRight fas fa-edit"),b.setAttribute("id",`editTask${e.id}`),v.appendChild(b);const g=document.createElement("i");return g.setAttribute("class","deleteTask projectBtn marginRight far fa-trash-alt"),g.setAttribute("id",`deleteTask${e.id}`),v.appendChild(g),p.appendChild(v),m.appendChild(p),n.appendChild(m),n})(e);t.appendChild(r)}const o=function(){const e=document.querySelectorAll(".showDetail"),t=document.querySelectorAll(".completeTask"),r=document.querySelectorAll(".editTask"),n=document.querySelectorAll(".deleteTask");e.forEach((e=>{e.addEventListener("click",(()=>{!function(e){const t=parseInt(e.id.match(/\d+/gm),10),r=document.querySelector(`#taskDetail${t}`);r.hasAttribute("hidden")?(r.removeAttribute("hidden"),e.setAttribute("class","alignDown projectBtn fas fa-angle-double-up showDetail")):(r.setAttribute("hidden","true"),e.setAttribute("class","alignDown projectBtn fas fa-angle-double-down showDetail"))}(e)}))})),t.forEach((e=>{e.addEventListener("click",(()=>{!function(e){const t=parseInt(e.id.match(/\d+/gm),10),r=document.querySelector(`#task${t}`).firstChild;!function(e){const t=JSON.parse(localStorage.getItem("tasks")),r=t.findIndex((t=>t.id===e));return t[r].completed=!t[r].completed,localStorage.setItem("tasks",JSON.stringify(t)),t[r].completed}(t)?(e.setAttribute("class","taksPending alignUp projectBtn far fa-calendar completeTask"),r.setAttribute("class","flexContainer")):(e.setAttribute("class","taksCompleted alignUp projectBtn far fa-calendar-check completeTask"),r.setAttribute("class","flexContainer  disabled"))}(e)}))})),r.forEach((e=>{e.addEventListener("click",(()=>{!function(e){const t=document.querySelector("#taskFormModal"),r=document.querySelector("#saveTask");(function(e){const t=document.querySelector("#taskName"),r=document.querySelector("#taskDescription"),n=document.querySelector("#taskPriority"),a=document.querySelector("#taskProject"),o=document.querySelector("#taskDueDate"),c=function(e){const t=JSON.parse(localStorage.getItem("tasks")),r=t.findIndex((t=>t.id===e));return t[r]}(e);t.value=c.name,r.value=c.description,n.value=c.priority,a.value=c.project,o.value=c.dueDate})(e),t.removeAttribute("hidden"),r.setAttribute("value",`${e}`)}(parseInt(e.id.match(/\d+/gm),10))}))})),n.forEach((e=>{e.addEventListener("click",(()=>{!function(e){const t=document.querySelector(`#task${e}`);!function(e){const t=JSON.parse(localStorage.getItem("tasks")),r=t.findIndex((t=>t.id===e));t.splice(r,1),localStorage.setItem("tasks",JSON.stringify(t)),t[r]}(e),t.parentElement.removeChild(t)}(parseInt(e.id.match(/\d+/gm),10))}))}))};t("projects"),t("tasks"),t("projectCount"),t("taskCount"),t("currentProject"),function(){const e=JSON.parse(localStorage.getItem("tasks"));for(let t=0;t<e.length;t+=1)a(e[t])}(),function(){const e=JSON.parse(localStorage.getItem("projects"));for(let t=0;t<e.length;t+=1)r(e[t]),n(e[t].name)}(),o();const c=document.querySelector("#projectFormModal"),s=document.querySelector("#taskFormModal"),l=document.querySelector("#btnNewProject"),i=document.querySelector("#btnNewTask"),u=document.querySelector("#btnCloseProject"),d=document.querySelector("#btnCloseTask"),m=document.querySelector("#saveProject"),p=document.querySelector("#saveTask"),f=document.querySelectorAll(".projectSort");l.addEventListener("click",(()=>{c.removeAttribute("hidden"),m.setAttribute("value","new")})),i.addEventListener("click",(()=>{s.removeAttribute("hidden"),p.setAttribute("value","new")})),u.addEventListener("click",(()=>{c.setAttribute("hidden","true"),m.value=""})),d.addEventListener("click",(()=>{s.setAttribute("hidden","true"),p.value=""})),window.onclick=e=>{e.target===c&&(c.setAttribute("hidden","true"),m.value=""),e.target===s&&(s.setAttribute("hidden","true"),p.value="")},m.addEventListener("click",(()=>{(function(){const t=document.querySelector("#projectName"),a=function(t){const r=JSON.parse(localStorage.getItem("projects"));let n=JSON.parse(localStorage.getItem("projectCount"));n+=1;const a=e(n,t);return r.push(a),localStorage.setItem("projectCount",JSON.stringify(n)),localStorage.setItem("projects",JSON.stringify(r)),a}(t.value);r(a),n(a.name),t.value=""})(),c.setAttribute("hidden","true"),m.value=""})),p.addEventListener("click",(()=>{"new"===p.value?(function(){const e=document.querySelector("#taskName"),t=document.querySelector("#taskDescription"),r=document.querySelector("#taskPriority"),n=document.querySelector("#taskProject"),o=document.querySelector("#taskDueDate");a(function(e,t,r,n,a){const o=JSON.parse(localStorage.getItem("tasks"));let c=JSON.parse(localStorage.getItem("taskCount"));const s=((e,t,r,n,a,o,c=!1)=>({id:e,name:t,description:r,priority:n,project:a,dueDate:o,completed:c}))(c,e,t,r,n,a);return c+=1,o.push(s),localStorage.setItem("taskCount",JSON.stringify(c)),localStorage.setItem("tasks",JSON.stringify(o)),s}(e.value,t.value,r.value,n.value,o.value)),e.value="",t.value="",r.value="Low",n.value="Default Project",o.value=""}(),o()):function(e){const t=document.querySelector("#taskName"),r=document.querySelector("#taskDescription"),n=document.querySelector("#taskPriority"),a=document.querySelector("#taskProject"),o=document.querySelector("#taskDueDate"),c=document.querySelector(`#taskName${e}`),s=document.querySelector(`#taskDescription${e}`),l=document.querySelector(`#taskPriority${e}`),i=document.querySelector(`#taskProject${e}`),u=document.querySelector(`#taskDueDate${e}`);!function(e,t,r,n,a,o){const c=JSON.parse(localStorage.getItem("tasks")),s=c.findIndex((t=>t.id===e));c[s].name=t,c[s].description=r,c[s].priority=n,c[s].project=a,c[s].dueDate=o,localStorage.setItem("tasks",JSON.stringify(c)),c[s]}(e,t.value,r.value,n.value,a.value,o.value),c.textContent=t.value,s.textContent=r.value,l.textContent=n.value,i.textContent=a.value,u.textContent=o.value.split("-").reverse().join("/"),t.value="",r.value="",n.value="Low",a.value="Default Project",o.value=""}(parseInt(p.value,10)),s.setAttribute("hidden","true"),p.value=""})),f.forEach((e=>{e.addEventListener("click",(()=>{const t=document.querySelector("#tasksContent").children;if("itemCardReversed flexContainer"===e.parentElement.attributes[0].value){e.parentElement.attributes[0].value="itemCard flexContainer";for(let e=0;e<t.length;e+=1)t[e].setAttribute("class","itemCard flexColumn");localStorage.setItem("currentProject",JSON.stringify(""))}else{e.parentElement.attributes[0].value="itemCardReversed flexContainer",f.forEach((t=>{t!==e&&(t.parentElement.attributes[0].value="itemCard flexContainer")}));for(let r=0;r<t.length;r+=1){const n=t[r].lastElementChild.firstElementChild.firstElementChild.lastElementChild;e.textContent===n.textContent?t[r].setAttribute("class","itemCard flexColumn"):t[r].setAttribute("class","itemCard displayNone")}localStorage.setItem("currentProject",JSON.stringify(e.textContent))}}))}))})();
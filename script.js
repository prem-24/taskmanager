let form = document.querySelector("#task-form");
let input = document.querySelector(".input");
let taskList = document.querySelector("#task-list");
let clearAllBtn = document.querySelector(".clear-btn");
let alertt = document.querySelector("h2");

let search = document.querySelector(".search-input");


function loadEventListeners() {
  // form submit event
  form.addEventListener("submit", addTask);

  // clear all
  clearAllBtn.addEventListener("click", clearAll);

  // remove individually
  taskList.addEventListener("click", remove);

  // clear all local store
  clearAllBtn.addEventListener("click", removeAllLocalStore);

  // getTask from local storage
  document.addEventListener("DOMContentLoaded", getTask);

  // search list
  search.addEventListener("input",searchFilter);
}

loadEventListeners();


// search Filter
function searchFilter() {
 let input = document.querySelector(".search-input");
 let filter = input.value.toUpperCase();
 let ul = document.querySelector("#task-list");
 let listCont = ul.querySelectorAll(".list-cont");

 listCont.forEach((items)=>{

  let taskText = items.querySelector("li").textContent || items.querySelector("li").innerText;

if(taskText.toUpperCase().includes(filter)){
  items.style.display = "";
}else{
  items.style.display = "none";
 }
}

 )}

//  function searchFilter() {
//   let input, filter, ul, taskContainers;

//   input = document.querySelector(".search-input");
//   filter = input.value.toUpperCase();
//   ul = document.querySelector("#task-list");
//   taskContainers = ul.querySelectorAll(".list-cont");

//   taskContainers.forEach(taskContainer => {
//     let taskText = taskContainer.querySelector("li").textContent || taskContainer.querySelector("li").innerText;
//     if (taskText.toUpperCase().includes(filter)) {
//       taskContainer.style.display = "";
//     } else {
//       taskContainer.style.display = "none";
//     }
//   });
// }



// function searchFilter(){
//   let input, filter, ul, li, a, i, txtValue;
//   input = document.querySelector(".search-input");
//   filter = input.value.toUpperCase();
//   ul = document.querySelector("#task-list");
//   li = ul.querySelectorAll(".list-cont"); // Select list containers instead of direct list items
//   for (i = 0; i < li.length; i++) {
//     a = li[i].querySelector("li"); // Query the li element within each list container
//     txtValue = a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }

// local storage

function addTask(e) {
  e.preventDefault();
  let task = input.value.trim(); // Trim whitespace from input value
  if (task === "") {
    alertt.textContent = "Please enter a task";
    alertt.style.color = "red";
  } else {
    let li = document.createElement("li");
    li.textContent = task; // Set text content directly
    taskList.appendChild(li);
    let listCont = document.createElement("div");
    listCont.className = "list-cont";
    let closeBtn = document.createElement("a");
    closeBtn.innerHTML = `<img src="carbon_close-outline.svg" alt="" />`;
    listCont.appendChild(li);
    listCont.appendChild(closeBtn);
    taskList.appendChild(listCont);
    storeLocalValue(task); // Store task in local storage
    input.value = "";
    alertt.textContent = "Do Task";
    alertt.style.color = "white";
  }
}

function clearAll() {
  taskList.innerHTML = "";
  // Clear tasks from local storage
  localStorage.removeItem("tasks");
}

function remove(e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.parentElement.remove();
    // Remove task from local storage
    removeLocalValue(e.target.parentElement.previousSibling.textContent);
  }
}

function storeLocalValue(value) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
    // console.log("1");
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    // console.log("2");
  }

  tasks.push(value);
  // console.log();
  

  localStorage.setItem("tasks", JSON.stringify(tasks));
   // localstorage doesn't allow array
}

function removeLocalValue(value) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = tasks.filter((task) => task !== value);

  localStorage.setItem("tasks", JSON.stringify(tasks)); 
  // localstorage doesn't allow array
}

function getTask() {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks);

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.textContent = task; // Set text content directly
    taskList.appendChild(li);
    let listCont = document.createElement("div");
    listCont.className = "list-cont";
    let closeBtn = document.createElement("a");
    closeBtn.innerHTML = `<img src="carbon_close-outline.svg" alt="" />`;
    listCont.appendChild(li);
    listCont.appendChild(closeBtn);
    taskList.appendChild(listCont);
  });
}

function removeAllLocalStore() {
  taskList.innerHTML = "";
  localStorage.clear("tasks");
}

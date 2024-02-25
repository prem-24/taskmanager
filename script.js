
let form = document.querySelector("#task-form");
let input = document.querySelector(".input");

let taskList = document.querySelector("#task-list");
let claerAll = document.querySelector(".clear-btn");

// console.log(form, input, taskList, claerAll);

function loadEventslisterners() {
    // form submit event
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let task = input.value;
    if (task == "") {
      alert("Please enter a task");
    } else {
      let li = document.createElement("li");
      li.innerHTML = task;
      taskList.appendChild(li);
      let listcont = document.createElement("div");
      listcont.className = "list-cont";
      let closebtn = document.createElement("a");
      closebtn.innerHTML = `<img src="carbon_close-outline.svg" alt="" />`;

      listcont.appendChild(li);
      listcont.appendChild(closebtn);
      taskList.append(listcont);

      input.value = "";
    }
  });


//   claer all 

  claerAll.addEventListener("click", () => {
    taskList.innerHTML = "";
  });


//   remove individually

  taskList.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
      e.target.parentElement.parentElement.remove();
    }
  });
}

loadEventslisterners();







// <ul id="task-list">
//      <div class="list-cont">
//             <li style="text-decoration: line-through">
//                 Hello this is my first task
//             </li>
//             <a href="#"><img src="carbon_close-outline.svg" alt="" /></a>
//       </div>
//  </ul>

let taskInput = document.getElementById("task");
let endInput = document.getElementById("End");
let startInput = document.getElementById("Start");
let addBtn = document.getElementById("addTask");
let taskList = document.getElementById("list");

addBtn.addEventListener("click", () => {
  let taskName = taskInput.value.trim();
  let endTime = endInput.value.trim();
  let startTime = startInput.value.trim();

  taskInput.style.border = "";
  endInput.style.border = "";
  startInput.style.border = "";

  if (taskName === "" || endTime === "" || startTime === "") {
    if (taskName === "") taskInput.style.border = "1px dotted red";
    if (endTime === "") endInput.style.border = "1px dotted red";
    if (startTime === "") startInput.style.border = "1px dotted red";
    return;
  }

  let startConvert = +startTime.replace(":", ".");
  let endConvert = +endTime.replace(":", ".");
  if (endConvert <= startConvert) {
    endInput.style.border = '2px solid red'
    startInput.style.border = '2px solid red'
    endInput.value = ''
    startInput.value = ''
    return;
  }

  let countHours = endConvert - startConvert;
  let countSecs = Math.floor(countHours * 3600);

  let tr = document.createElement("tr");

  let tdTask = document.createElement("td");
  tdTask.textContent = taskName;
  tdTask.classList.add("p-2");

  let tdTime = document.createElement("td");
  tdTime.classList.add("p-2");

  let tdActions = document.createElement("td");

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML =
    '<i class="fa-solid fa-trash text-red-500 hover:text-red-700"></i>';
  deleteBtn.classList.add("px-2");

  let editBtn = document.createElement("button");
  editBtn.innerHTML =
    '<i class="fa-solid fa-pen text-blue-500 hover:text-blue-700"></i>';
  editBtn.classList.add("px-2");

  let markBtn = document.createElement("button");
  markBtn.innerHTML =
    "<i class='fa-solid fa-check text-green-500 hover:text-green-700'></i>";
  markBtn.classList.add("px-2");

  tdActions.append(deleteBtn, editBtn, markBtn);

  tr.append(tdTask, tdTime, tdActions);
  taskList.appendChild(tr);

  let interval = setInterval(() => {
    if (countSecs <= 0) {
      clearInterval(interval);
      tdTime.textContent = "Completed";
      tdTime.style.color = "green";
      return;
    }

    let hours = Math.floor(countSecs / 3600);
    let mins = Math.floor((countSecs % 3600) / 60);
    let secs = countSecs % 60;

    tdTime.textContent = `${hours}h : ${mins}m : ${secs}s`;
    countSecs--;
  }, 1000);

  deleteBtn.addEventListener("click", () => {
    let check = confirm("Are you sure you want to delete this task?");
    if (check) {
      clearInterval(interval);
      tr.remove();
    }
  });

  editBtn.addEventListener("click", () => {
    clearInterval(interval);
    tr.remove();
    taskInput.value = taskName;
    startInput.value = startTime;
    endInput.value = endTime;
    taskInput.focus();
  });

  markBtn.addEventListener("click", () => {
    clearInterval(interval);
    tdTime.textContent = "Completed";
    tdTime.style.color = "green";
  });

  taskInput.value = "";
  startInput.value = "";
  endInput.value = "";
});

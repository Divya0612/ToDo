let input = document.querySelector(".input");
let addBtn = document.querySelector(".add");
let blockOne = document.querySelector(".block1");
let blockTwo = document.querySelector(".block2");
let taskList = [];
let check;

if(localStorage.getItem("toDo")){

    taskList = JSON.parse(localStorage.getItem("toDo"));
    taskList.forEach((taskObj) => {
        if(taskObj.check === false)
            +createTask(taskObj.inputValue, taskObj.tid);
        else
            completedTask(taskObj.inputValue, taskObj.tid);
    })
}

addBtn.addEventListener("click", (e) => {
    if(!input.value) return;
    view1.click();
    let inputValue = input.value;
    createTask(inputValue);

})

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        if(!input.value) return;
        view1.click();
        let inputValue = input.value;
        createTask(inputValue);
    }
})

function createTask(inputValue, tid){
    let id = tid || shortid();
    let toDoTask = document.createElement("div");
    toDoTask.setAttribute("class", "todo-task");
    toDoTask.innerHTML = `
    <div class="task-name">${inputValue}</div>
    <div class="id">${id}</div>
    <div class="todo-action">
        <span class="material-icons delete">
            delete_outline
        </span>
        <span class="material-icons check">
            check_circle_outline
        </span>
    </div>
    `;
    blockOne.appendChild(toDoTask);
    if(!tid){
        taskList.push({inputValue, tid: id, check:false});
        localStorage.setItem("toDo", JSON.stringify(taskList));
    }
    input.value = "";
    console.log(taskList);


    let checkBtn = toDoTask.querySelector(".check");
    checkBtn.addEventListener("click", (e) => {
        let idx = getIndex(id);
        taskList[idx].check = "true";
        localStorage.setItem("toDo", JSON.stringify(taskList));

        toDoTask.remove();
        completedTask(inputValue, id);
    })

    let deleteBtn = toDoTask.querySelector(".delete");
    deleteBtn.addEventListener("click", (e) => {
        let idx = getIndex(id);

        taskList.splice(idx, 1);
        let temp = JSON.stringify(taskList);
        localStorage.setItem("toDo", temp);

        toDoTask.remove();
    })
}


function completedTask(inputValue, id){
    let doneTask = document.createElement("div");
    doneTask.setAttribute("class", "todo-task");
    doneTask.innerHTML = `
    <div class="task-name">${inputValue}</div>
    <div class="id">${id}</div>
    <div class="todo-action">
        <span class="material-icons delete">
            delete_outline
        </span>
        <span class="material-icons checked">
            check_circle_outline
        </span>
    </div>
    `;

    blockTwo.appendChild(doneTask);

    let uncheckBtn = doneTask.querySelector(".checked");
    uncheckBtn.addEventListener("click", (e) => {
        let idx = getIndex(id);
        taskList[idx].check = "false";
        localStorage.setItem("toDo", JSON.stringify(taskList));

        doneTask.remove();
        createTask(inputValue, id);

    })

    let deleteBtn = doneTask.querySelector(".delete");
    deleteBtn.addEventListener("click", (e) => {
        let idx = getIndex(id);
        taskList.splice(idx, 1);
        let temp = JSON.stringify(taskList);
        localStorage.setItem("toDo", temp);

        doneTask.remove();
    })
}

function getIndex(id){
    let taskIdx = taskList.findIndex((taskObj) => {
        return taskObj.tid === id;
    })
    return taskIdx;
}

let view1 = document.querySelector(".view1");
view1.addEventListener("click", (e) => {
    view1.style.backgroundColor = "rgba(152, 161, 161, 0.747)";
    view2.style.backgroundColor = "#96eceb";
    let inputValue = input.value;
    blockOne.style.display = "block";
    blockTwo.style.display = "none";
    createTask(inputValue, tid);
})
let view2 = document.querySelector(".view2");
view2.addEventListener("click", (e) => {
    let inputValue = input.value;
    view1.style.backgroundColor = "#96eceb";
    view2.style.backgroundColor = "rgba(152, 161, 161, 0.747)";
    blockOne.style.display = "none";
    blockTwo.style.display = "block";
    completedTask(inputValue, tid);
})
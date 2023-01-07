const taskList = document.getElementById("tasklist");
const addTaskButton = document.getElementById("add_task");
const inputField = document.getElementById("the_task");

async function updateStatusTask(id){
    const result = await getTask(id);
    result.done = !result.done;
    updateTask(result);
}

const addCheckbox = function(){
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", function(){
        checkbox.nextElementSibling.classList.toggle("strikethrough");
        const idnumber = checkbox.parentElement.getAttribute("id");
        updateStatusTask(idnumber);
    })
    return checkbox;
}

async function updateDescription(id, description){
    const result = await getTask(id);
    result.description = description;
    updateTask(result);
}

const addDescriptionParagraph = function(description){
    const pItem = document.createElement("p");
    pItem.innerHTML = description;
    pItem.style.cursor = "pointer";
    pItem.addEventListener("click", function() {
        const newTask = prompt("update task desripton from:  '" + description + "'  to:");
        if (newTask != null && newTask.length > 0 )
        {
            pItem.innerHTML = newTask;
            description = newTask;
            updateDescription(pItem.parentElement.getAttribute("id"),newTask);
        }
    })
    return pItem;
}

const removeTask = function(id){
    const task = document.getElementById(id);
    task.remove();
    deleteTask(id);
}

const addDeleteButton = function(id){
    const trashbin = document.createElement("i");
    trashbin.classList.add("fa-solid");     //font-awesome
    trashbin.classList.add("fa-trash");
    trashbin.classList.add("binstyle");
    trashbin.style.cursor = "pointer";
    trashbin.addEventListener("click", function(){
        removeTask(id);
    })
    return trashbin;
}

const addtaskDiv = function(id){
    const divItem = document.createElement("div");
    divItem.setAttribute("id", id);
    return divItem;
}

const displayTask = function(task){
    const checkbox = addCheckbox();
    if (task.done) checkbox.checked = true;
    const pItem = addDescriptionParagraph(task.description);
    if (task.done) pItem.classList.add("strikethrough");
    const wastebin = addDeleteButton(task._id);
    const taskBlock = addtaskDiv(task._id);
    taskBlock.classList.add("taskblock");
    taskBlock.append(checkbox);
    taskBlock.append(pItem);
    taskBlock.append(wastebin);
    taskList.append(taskBlock);
}

async function addTask(taskDescription){
    const result = await postTask(taskDescription);
    displayTask(result);
}

addTaskButton.addEventListener("click", function(){
    const task = inputField.value;
    if(task.length > 0) {
        addTask(task);
    }
    else alert("please enter task description");
})

async function showTodoList()
{
    const tasks = await getList();
    tasks.forEach(element => { displayTask(element)});
}

showTodoList();
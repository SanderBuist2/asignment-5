const baseUrl = "http://localhost:3000/"

async function getList(){
    try
    {
        const result = await fetch(baseUrl, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            }});
        const information = await result.json().then(data => { return data; })
        return information;
    }
    catch(error) { console.log(error) };
}

async function getTask(taskId){
    try
    {
        const result = await fetch(baseUrl + taskId, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            }});
        const information = await result.json().then(data => { return data; })
        return information;
    }
    catch(error) { console.log(error) };
}

async function postTask(theTask){
    const data = {description: theTask, done: false};
    const result = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
    },
    });
    const postedTask = await result.json().then(data => { return data; })
    return postedTask;
}

async function deleteTask(taskId){
    try
    {
        const result = await fetch(baseUrl + taskId, {
            method: "DELETE"
        });
   }
    catch(error) { console.log(error) };
}

async function updateTask(changedTask){
    try
    {
        const result = await fetch(baseUrl + changedTask._id, {
            method: "PUT",
            body:  JSON.stringify(changedTask),
            headers: {
                "Content-Type": "application/json",
            },
            });
        const updatedTask = await result.json().then(data => { return data; })
        return updatedTask;
    }
    catch(error) { console.log(error) };
}

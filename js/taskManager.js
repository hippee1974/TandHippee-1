//taskManager input
class TaskManager{
    constructor(currentId=0){
        this.tasks = [] 
        this.currentId = currentId         
    }

// add new task
    addTask(name,description,assignedTo,dueDate)
{

    const task= {
        id :this.currentId++,
        name : name,
        description: description,
        assignedTo : assignedTo,
        dueDate : dueDate,
    //Change status to "inProgress"
        staTus : 'In Progress',
    }
    this.tasks.push(task);
}
   

//delete task
   deleteTask(taskId){
       const newTasks = [];
       for (let i =0; i<this.tasks.length; i++)
       {
         const task = this.tasks[i];
         if (task.id !== taskId){
             newTasks.push(task)
             //newTasks.splice(task,1);
        }
     }
     //set this.tasks to newTasks
     this.tasks = newTasks;
    
 } //closed delete task

    //Update task
    getTaskById(taskId) {
        let updateTask;
        for (let i =0; i<this.tasks.length; i++){
            const task = this.tasks[i];
            if (task.id === taskId){
                updateTask = task;
            };
        };
        return updateTask;
    };
//display tasks on card
    render(){
        const tasksHtmlList = [];
        for (let i=0; i<this.tasks.length; i++){
            const task = this.tasks[i];

    const due = new Date(task.dueDate);
    //format date dd/mm/yy 
    const formattedDate = due.getDate() + '/' + (due.getMonth()+1) + '/' 
    + (due.getFullYear());

    const taskHtml = createTaskHtml(task.id, task.name,task.description,task.assignedTo,formattedDate,task.staTus);
    tasksHtmlList.push(taskHtml);
    }//closed render for loop
    const tasksHtml = tasksHtmlList.join('\n');
    
    const tasksList = document.querySelector('#taskCard');
    tasksList.innerHTML = tasksHtml;
 
} //closed render

//Save task
    save(){
    
    //create a JSON string to the tasks

    //Store the JSON string in localStorage
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentId = String(this.currentId);

//convert the currentId in localStorage
    localStorage.setItem('currentId', currentId)
} //close save task

//loadTask
   loadTask() {
  
    //check if the localStoge is empty
    if (localStorage.getItem('tasks')) {
        const tasksJson = localStorage.getItem('tasks');
    // convert into array
    this.tasks = JSON.parse(tasksJson);
    }
    //check if the currentId is save in localStorage
    if (localStorage.getItem('currentId')) {
        const currentId = localStorage.getItem('currentId');

    //convert the currentId to a Number and store in taskManager
    this.currentId = Number(currentId);

    }
} //closed loadtask

// clear task from storage
   clearTasksInStorage(){
    window.localStorage.clear();
} //closed cleartask from storage

//clear task list
    clearTasksCard(){
    while (tasksCard.firstChild){
        tasksCard.removeChild(tasksCard.firstChild);
    } //closed clear task list

  //  clearTasksInStorage()

  }



}; //closed class

  

//added Task on cards 
const createTaskHtml = (id,name,description,assignedTo,dueDate,staTus) =>
{
   return `
   <li class="list-group-item mt-2" data-task-id=${id}>
   <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
   <h5>Task: ${name}</h5>
   <span class="badge ${staTus === 'In Progress' ? 'badge-danger' : 'badge-success'}">${staTus}</span>
   </div>
   <div class="d-flex w-100 mb-3 justify-content-between">
   <small>task Description: ${description}</small>
  
   <small>Assiged Name: ${assignedTo}</small>
  
    </div>
   <div class="d-flex w-100 mt-3 justify-content-between align-items-center">
   <small>Due Date: ${dueDate}</small>
    
   <button class="btn btn-outline-success done-button ${staTus === 'In Progress' ? 'visible' : 'invisible'}">Make it Done</button>
   <button class="btn btn-outline-primary delete-button"> Delete</button>
   </div>
   </li>
 `; 
}

module.exports = TaskManager;
  






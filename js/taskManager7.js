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
    console.log(this.tasks.push(task));

}
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
}; //closed class

   /* const list = document.createElement('ul');
    list.className = 'list-group';
   */
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
   </div>
   </li>
 `; 
   
}







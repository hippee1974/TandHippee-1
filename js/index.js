
const taskManager = new TaskManager(0);
//console.log(taskManager);

//loadtask from localstorage
taskManager.loadTask();

//Render the task to page
taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener('submit', (event) => {
	// Prevent default action

	event.preventDefault();

	// Select the inputs
	let newTaskNameInput = document.querySelector('#inputTask');
	let newTaskDescription = document.querySelector('#inputDescription');
	let newTaskAssignedTo = document.querySelector('#inputAssignee');
	let newTaskDueDate = document.querySelector('#inputDate');
	let newTaskStatus = document.querySelector('#inputStatus');
  const errorMessageName = document.querySelector('#alertMessageName');
  const errorMessageDescription = document.querySelector('#alertMessageDesc');
  const errorMessageAssignedTo = document.querySelector('#alertMessageAssign');
  const errorMessagedueDate = document.querySelector('#alertMessageDue');
  

	// Get the values of the inputs
	const name = newTaskNameInput.value;
	const description = newTaskDescription.value;
	const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;


  //var d = Math.floor(Date.parse(dueDate)/1000);  //dueDate in seconds from 1970
  //var d2 = new Math.floor(Date().getTime()/1000); //currentDate in seconds from 1970
  //alert(d); //this is in milliseconds
  //alert(d2);  
    
	if (!validFormFieldInput(name)) {
		errorMessageName.innerHTML = '\xa0\xa0What would you like to do?';
		errorMessageName.style.display = 'inline';
	} else {
		errorMessageName.style.display = 'none';
	}
	if (!validFormFieldInput(description)) {
		errorMessageDescription.innerHTML = '\xa0\xa0Please type in some details';
		errorMessageDescription.style.display = 'inline';
	} else {
		errorMessageDescription.style.display = 'none';
  }
  if (!validFormFieldInput(assignedTo)) {
		errorMessageAssignedTo.innerHTML = '\xa0\xa0Please assign it to someone';
		errorMessageAssignedTo.style.display = 'inline';
	} else {
		errorMessageAssignedTo.style.display = 'none';
  }
/*	if (Math.floor(Date.parse(dueDate)/1000) < Math.floor(new Date().getTime()/1000)) {
		errorMessagedueDate.innerHTML = '\xa0\xa0';
		errorMessagedueDate.style.display = 'inline';
 delete else
  } */
  if (!dueDate) {
    errorMessagedueDate.innerHTML = '\xa0\xa0Please select a date';
		errorMessagedueDate.style.display = 'inline';
  }
  else 
  {
		errorMessagedueDate.style.display = 'none';
		taskManager.addTask(name,description,assignedTo,dueDate);

		event.target.reset();
		
	}


//new addTask today
//taskManager.addTask(name, description, assignedTo, dueDate);
//close added addTask	

//save the task to localstorage
taskManager.save();
//render the tasks
taskManager.render();


});
function validFormFieldInput(data) {
	return data !== null && data !== '';
	
};

//update status
const tasksCard = document.querySelector('#taskCard');

//add onclick envent listener
tasksCard.addEventListener('click', (event)=>{
	if (event.target.classList.contains('done-button')){
		const parentTask = event.target.parentElement.parentElement;
		const taskId = Number(parentTask.dataset.taskId);
		const task = taskManager.getTaskById(taskId);
		task.staTus = "DONE";
	//save task
	    taskManager.save();
		taskManager.render();
	
	}
	//add delete button
	if (event.target.classList.contains('delete-button')){
		const parentTask = event.target.parentElement.parentElement;
		const taskId = Number(parentTask.dataset.taskId);

	//delete the task
	    taskManager.deleteTask(taskId);
	//save task
		taskManager.save();
	//render the task
		taskManager.render();
	//storeTask
	//	taskManager.storeTask();
	}
	
	
	
//add save button
//save.addEventListener("click", save);
//const clearBtn = document.querySelector('#clear');
//clearBtn.addEventListener("click", clearTasksInStorage());
});


PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };
// console.log(PRIORITY["LOW"]);

function validInteger (value) { // value can be a string or a number (integer)
  const regexInteger = /^\d+$/;
  return (regexInteger.test(value))
}  

// test validInteger
// console.log(validInteger ( '10' ) )// returns True
// console.log(validInteger ( 10 )) // returns True 
// console.log(validInteger ( '-10' )) // returns False
// console.log(validInteger ( -10 ))// returns False
// console.log(validInteger ( 0.0 ))// returns False
// console.log(validInteger ( 10.0 ))// returns False
// console.log(validInteger ( 10.3 ))// returns False
// console.log(validInteger ( -10.0 )) // returns False


function validatePriority(priority) { // value can be a string or a number (integer)
  const validPriorties = [1, 3, 5, 7];
  priority = parseInt(priority)
  return (validPriorties.includes(priority)) ? priority : 1
}

// test validPriorty
// console.log(validatePriority ( 0 )) // returns 1
// console.log(validatePriority ( 1 )) // returns 1
// console.log(validatePriority ( 'A' )) // returns 1
// console.log(validatePriority ( '7' )) // returns 7
// console.log(validatePriority ( '10' )) // returns 1



function todaysDate () {
  const todaysDate = new Date();
  const todaysYear = todaysDate.getFullYear();
  const todaysMonth = todaysDate.getMonth() +1;
  const todaysDay = todaysDate.getDate();
  const todaysHours = String(todaysDate.getHours()).padStart(2, "0");
  const todaysMinutes = String(todaysDate.getMinutes()).padStart(2, "0");
  const todaysSeconds = String(todaysDate.getSeconds()).padStart(2, "0");
  return `${todaysDay}/${todaysMonth}/${todaysYear} ${todaysHours}:${todaysMinutes}:${todaysSeconds}`
}

// test todaysDate
// console.log(todaysDate());

class Task  {
  _added;
  _title;
  _priority;
  constructor(title, priority){
    this._added = todaysDate();
    this._title = title;
    this._priority = validatePriority(priority);
  }
  // (title; priority)
  get added(){
    return this._added;
  }

  get title(){
    return this._title;
  }

  get priority(){
    return this._priority;
  }

  set priority(priority){
    this._priority = validatePriority(priority);
  }
}


// test Task 
// task = new Task('Get Cappuccino', PRIORITY['MEDIUM'])  // Creates an instance of a Task (named task)
// console.log(task.added)//-> '30/4/2023 12:26:26' // Checking the 'added' attribute of a Task instance returns the date/time it was added.
// console.log(task.title) //-> 'Get Cappuccino' // Checking the 'title' attribute for a Task instance returns the title of the task.'
// console.log(task.priority) //-> 3 // Checking the 'priority' attribute for a Task instance returns an integer 3 (Remember MEDIUM == 3).
// task.priority = PRIORITY['URGENT'] // Setting the 'priority' attribute for a Task instance to URGENT (Remember URGENT == 7).
// task.priority //-> 7 // Checking the 'priority' attribute for a Task instance returns an integer 7 (Remember URGENT == 7).
// task.priority = '10' // Setting the 'priority' attribute for a Task instance to the string '10' (an invalid priority).
// task.priority //-> 1 // Checking the 'priority attribute for a Task instance returns an integer 1 (because '10' was an invalid priority so it defaults to 1).


class ToDo {
  _tasks;

  constructor() {
    this._tasks = [];
  }

  add(task) {
    this._tasks.push(task)
    return this._tasks.length;
  }

  remove(title){
    // console.log(this._tasks)
    const taskIndex = this._tasks.findIndex(task => task.title === title);
    // // console.log(taskIndex)
    if (taskIndex !== -1) {
      this._tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
    // const foundTask = this._tasks.filter(task => task.title === title)
    // if (foundTask === undefined){
    //   return false;
    // } else {
    //   this._tasks = this._tasks.filter(task => task._title !== title)
    //   return true;
    // }
  }

  list(priority = 0){
    if (priority !== 0){
      let filteredTasks = this._tasks.filter(task => task.priority  === priority)
      console.log(filteredTasks);
      let filteredTasksArray = filteredTasks.map(task => [task.added, task.title, task.priority])
      return filteredTasksArray
    } 
    // console.log(this.tasks)
    let filteredTasksArray = this._tasks.map(task => [task.added, task.title, task.priority])
    return filteredTasksArray
  }

  task(title){
    const foundTask = this._tasks.find(task => task.title === title);
    if (foundTask) {
      return foundTask
    }
    throw new Error(`Task '${title}' Not found`)
  }

}

// test ToDo
// taskList = new ToDo () // Creates an instance of ToDo named taskList
// taskList.add (new Task( 'Get Cappuccino', PRIORITY [ 'HIGH' ]) ) //-> 1  // Adds a new Task instance to the taskList instance and returns the number of tasks in the list: (1) in this case.
// taskList.add (new Task( 'Order Lunch', PRIORITY [ 'MEDIUM' ]) ) //-> 2 // Adds a second Task instance to the taskList instance and returns the number of tasks in the list: (2) now.
// taskList.add (new Task( 'Complete Project Sprint', PRIORITY [ 'MEDIUM' ]) ) //-> 3 // Adds a third Task instance to the taskList instance and returns the number of tasks in the list: (3) now. 
// // console.log(taskList.list())
// // taskList.list (PRIORITY [ 'MEDIUM' ] ) //->  // Calls the list method of the taskList instance and a list of lists is returned with all the MEDIUM priority tasks.
// // console.log(taskList.list ( PRIORITY['MEDIUM'] )) 
// // [
//   //   [ '28/3/2023 10:16:56', 'Order Lunch', 3 ], 
//   //   [ '28/3/2023 10:16:56', 'Complete Project Sprint', 3 ]
//   // ]
// // taskList.list ( PRIORITY['HIGH'] ) //->  //  Calls the list method of the taskList instance and a list of lists is returned with all the HIGH priority tasks.
// // console.log(taskList.list ( PRIORITY['HIGH'] )) 
// // [
//   //   [ '28/3/2023 10:16:56', 'Get Cappuccino', 5 ]
//   // ]
// // taskList.task ('Complete Project Sprint').priority = PRIORITY['HIGH'] // Changes a specific task to have a HIGH priority.
// // taskList.list ( PRIORITY['HIGH'] ) // Calls the list method of the taskList instance and a list of lists is returned with all the HIGH priority tasks.
// // console.log(taskList.list ( PRIORITY['HIGH'] )) // Calls the list method of the taskList instance and a list of lists is returned with all the HIGH priority tasks.
// // [
//   //   [ '28/3/2023 10:16:56', 'Get Cappuccino', 5 ], 
//   //   [ '28/3/2023 10:16:56', 'Complete Project Sprint', 5 ]
//   // ]
// // taskList.list ( PRIORITY['HIGH'] ) [0] [1] //-> 'Get Cappuccino'   // Calls the list method of the taskList instance and accesses the [0][1] position of the object, returning the task name.
// taskList.remove ( 'Complete Project Sprint1' ) //-> false  // Calls the remove method and 'false' is returned, as a task with this name doesn't exist.
// taskList.remove ( 'Complete Project Sprint' ) //-> true // Calls the remove method and 'true' is returned, as a task with this name DOES exist.
// // taskList.list ( PRIORITY['HIGH'] ) //-> //  Calls the list method of the taskList instance and a list of lists is returned with all the HIGH priority tasks. (Only one now)
//   // [
//   //   [ '28/3/2023 10:16:56', 'Get Cappuccino', 5 ], 
//   // ]
// // taskList.task ( 'WrongTitle' ) //-> // throw error <Task 'WrongTitle' Not Found> as task with this name doesn't exist.

const taskList = new ToDo() // creates an instance of a ToDo() object name taskList
taskList.add(new Task ('Get Pasta', PRIORITY ['MEDIUM'])) // returns 1 as 1 task in list
taskList.add (new Task ('Get Breakfast Cereal', PRIORITY ['MEDIUM'] )) // returns 2 as 2 tasks in list
// console.log(taskList.list())
taskList.remove ('Get Breakfast Cereal') // returns true (as task exists, and then removes it)
taskList.remove ('Get dinner') // returns true (as task exists, and then removes it)
// console.log(taskList.list())







// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}
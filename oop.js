// Priority levels 
PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

// Function to check if a value is a valid integer using regular expression
function validInteger (value) { 
  const regexInteger = /^\d+$/;
  return (regexInteger.test(value))
}  

// Function to validate and normalize a priority value
function validatePriority(priority) { 
  const validPriorties = [1, 3, 5, 7];
  return (validPriorties.includes(parseInt(priority))) ? parseInt(priority) : 1
}

// Function to get the formatted date string for today
function todaysDate () {
  const todaysDate = new Date();
  const todaysYear = String(todaysDate.getFullYear()).padStart(2, "0");
  const todaysMonth = String(todaysDate.getMonth() +1).padStart(2, "0");
  const todaysDay = String(todaysDate.getDate()).padStart(2, "0");
  const todaysHours = String(todaysDate.getHours()).padStart(2, "0");
  const todaysMinutes = String(todaysDate.getMinutes()).padStart(2, "0");
  const todaysSeconds = String(todaysDate.getSeconds()).padStart(2, "0");
  return `${todaysDay}/${todaysMonth}/${todaysYear} ${todaysHours}:${todaysMinutes}:${todaysSeconds}`
}

// Class representing a single task with properties: added date, title, and priority
class Task  {
  _added;
  _title;
  _priority;
  constructor(title, priority){
    this._added = todaysDate();
    this._title = title;
    this._priority = validatePriority(priority);
  }

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

// Class ToDo representing a task management system (array) with functionalities for adding, removing, getting specific task, and listing the tasks
class ToDo {
  _tasks;

  constructor() {
    this._tasks = [];
  }

  add(task) {
    this._tasks.push(task)
    return this._tasks.length;
  }

  // Removes a task from the list by title and returns true if successful, false otherwise
  remove(title){
    const foundTask = this._tasks.find(task => task.title === title);
    if (foundTask !== undefined){
      this._tasks = this._tasks.filter(task => task._title !== title);
      return true;
    }
    return false;
  }

  // Returns a list of tasks (filtered by priority) with formatted data [task.added, task.title, task.priority]
  list(priority = 0){
    let mappedTasksArray = this._tasks.map(task => [task.added, task.title, task.priority]);
    if (priority !== 0){
      return mappedTasksArray.filter(task => task[2]  === priority);
    } 
    return mappedTasksArray;
  }

  // Retrieves a specific task by title and returns it or throws an error if not found
  task(title){
    const foundTask = this._tasks.find(task => task.title === title);
    if (foundTask) return foundTask;
    throw new Error(`Task '${title}' Not Found`);
  }

}


// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}
const defaultTasks = [
    {text: 'Hello', id: 'task1',},
    {text: 'What Is Your Name?', id: 'task2',},
    {text: 'How are you?', id: 'task3',},
    {text: 'What is you like?', id: 'task4',},
    {text: 'Buy', id: 'task5'},
];

const todoList = [];
const doneList = [];

const changeTaskStatus = (taskElement) => {
    if (taskElement.checked) {
        doneList.push(taskElement);
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        // https://stackoverflow.com/questions/55532767/how-to-find-an-element-by-data-selector-in-an-array-of-html-dom-objects-using-ja
        todoList.splice(todoList.findIndex(elem), 0);
        // remove from display in old list
        // add to display in new list
    } else {
        todoList.push(taskElement);
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        doneList.splice(doneList.findIndex(elem), 0);
        // same shit
    }
}

const createTask = (id, text) => {
    const taskElement = document.createElement("div");
    taskElement.innerHTML = `<input type="checkbox" id="${id}" name="scales"><label for="${id}">${text}</label><button>DELETE</button>`;
    const checkBox = taskElement.firstChild;
    // const deleteButton = не taskElement.firstChild; вибирати по іншому
    todoList.push(taskElement);
    document.querySelector('#toDoList').append(taskElement);

    checkBox.addEventListener('click', (event) => {
        console.log(event);
        changeTaskStatus(event.target);
    })
    // deleteButton.addEventListener
}

defaultTasks.map(task => createTask(task.id, task.text));

// add event listener which use createTask() on ADD click
// const addNewListener (input) => {
//     createTask(input.text, randomId);
// }



const defaultTasks = [
    {text: 'Hello', id: 'task1',},
    {text: 'What Is Your Name?', id: 'task2',},
    {text: 'How are you?', id: 'task3',},
    {text: 'What is you like?', id: 'task4',},
    {text: 'Buy', id: 'task5'},
];

let idCount = 5;


const todoList = [];
const doneList = [];

const changeTaskStatus = (taskElement) => {
    if (taskElement.checked) {

        console.log('taskElement', taskElement.checked);

        console.log('taskElement', taskElement);
        doneList.push(taskElement.parentElement);
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        elem.remove();
        console.log('elem', elem);
        // https://stackoverflow.com/questions/55532767/how-to-find-an-element-by-data-selector-in-an-array-of-html-dom-objects-using-ja
        // todoList.splice(todoList.findIndex(elem), 0);
        console.log('doneList', doneList);
        console.log('todoList after', todoList);
        let doneListElement = document.querySelector('#doneList');
        doneList.map(function(task){
            console.log('doneListElement', doneListElement);
            console.log('todoList before', todoList);
            console.log('task', task);
            return doneListElement.prepend(task);
            
        });
        // remove from display in old list
        // add to display in new list
    } else {
        todoList.push(taskElement);
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        let toDoListElement = document.querySelector('#toDoList');
        toDoListElement.append(elem);
        console.log('elem 2', elem)
        // doneList.splice(doneList.findIndex(elem), 0);
        // same shit
    }
}



const createTask = (id, text) => {
    const taskElement = document.createElement("div");
    taskElement.setAttribute('id', `${'div_'+id}`)
    taskElement.innerHTML = `<input type="checkbox" id="${id}" name="scales"><label for="${id}">${text}</label><button>DELETE</button>`;
    const checkBox = taskElement.firstChild;
    const deleteButton = taskElement.lastChild;
    todoList.push(taskElement);
    document.querySelector('#toDoList').append(taskElement);
    //
    checkBox.addEventListener('click', (event) => {
        console.log('CheckedCheckbox', event.target);
        changeTaskStatus(event.target);
    })

    deleteButton.addEventListener('click', (event) => {
        console.log('deleteButton', event);
        taskElement.remove();
    })
}



let addNewTaskElementToField = () => {
    let addButton = document.querySelector('#addNewTaskField');
    let idTaskNumber = () => {
        return ++idCount;
    }

    console.log('addButton', addButton);
    addButton.addEventListener('change', (event) => {
        console.log('event', event.target.value);
        todoList.push(createTask(`${'task'+ idTaskNumber()}`, event.target.value));
        console.log('todoList', todoList);
        event.target.value = '';
    })
}

addNewTaskElementToField();


defaultTasks.map(task => createTask(task.id, task.text ));

// add event listener which use createTask() on ADD click
// const addNewListener (input) => {
//     createTask(input.text, randomId);
// }



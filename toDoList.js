const defaultTasks = [
    {text: 'Hello', id: 'task0', taskstatus: false, },
    {text: 'What Is Your Name?', id: 'task1', taskstatus: false, },
    {text: 'How are you?', id: 'task2', taskstatus: false, },
    {text: 'What is you like?', id: 'task3', taskstatus: false, },
    {text: 'Buy', id: 'task4', taskstatus: false, },
];



let idCount = 4;
let addTask = false;
let showDoneList = true;
let hideDoneList = true;
const todoList = [];
const doneList = [];

const changeTaskStatus = (taskElement) => {

    if (taskElement.checked) {

           doneList.push(taskElement.parentElement);

        todoList.splice(todoList.indexOf(taskElement, 0));
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;

        elem.remove();

        // https://stackoverflow.com/questions/55532767/how-to-find-an-element-by-data-selector-in-an-array-of-html-dom-objects-using-ja


        let doneListElement = document.querySelector('#doneList');
        doneList.map(function(task){

            // console.log('doneList prepend', doneList);
            doneListElement.prepend(task);

            return doneListElement;
        });
        // remove from display in old list
        // add to display in new list
    } else {
        todoList.push(taskElement);

        // console.log('elem 2', elem)
        // doneList.splice(doneList.findIndex(elem), 0);
        // same shit
    }

    if (taskElement.checked == false) {
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        let toDoListElement = document.querySelector('#toDoList');
        toDoListElement.append(elem);
        doneList.splice(doneList.indexOf(taskElement, 0));
    }
}


const createTask = (id, text) => {
    const taskElement = document.createElement("div");
    taskElement.setAttribute('id', `${'div_'+id}`);
    taskElement.setAttribute('taskstatus', `${false}`);
    taskElement.innerHTML = `<input type="checkbox" id="${id}" name="scales"><label for="${id}">${text}</label><button>DELETE</button>`;
    const checkBox = taskElement.firstChild;
    const deleteButton = taskElement.lastChild;
    todoList.push(taskElement);
    document.querySelector('#toDoList').append(taskElement);

    checkBox.addEventListener('click', (event) => {
        changeTaskStatus(event.target);
    })

    deleteButton.addEventListener('click', (event) => {
        taskElement.remove();
        let taskElementForDeleted = taskElement.id;

        todoList.map(task => {
            if (task.id == taskElementForDeleted) {
                let indexElementTask = todoList.indexOf(task);
                todoList.splice(indexElementTask,1);
            }
        });

        doneList.map(taskDone => {
            if (taskDone.id == taskElementForDeleted) {
                let indexTaskDone = doneList.indexOf(taskDone);
                doneList.splice(indexTaskDone, 1);
            }
        });

        if(todoList.length == 0 && doneList.length == 0) {
            console.log('toDoList if Zero', 'toDoList if Zero');
            defaultTasks.map(task => createTask(task.id, task.text ));
            console.log('todoList', todoList);
            console.log('doneList', doneList);
        }



    })
}

let addNewTaskElementToField = document.querySelector('#addNewTaskField');
let idTaskNumber = () => {
    return ++idCount;
}

addNewTaskElementToField.addEventListener('change', (event)=> {
            todoList.push(createTask(`${'task'+ idTaskNumber()}`, event.target.value));
            todoList.map((element) => {
                if(element === undefined) {
                    todoList.splice(todoList.indexOf(element, 0),1);
                }
            })
        event.target.value = '';
    })

defaultTasks.map(task => createTask(task.id, task.text ));

if(hideDoneList) {
    const elemShowDoneTasks = document.querySelector(`#showDoneTaskList`)
    elemShowDoneTasks.addEventListener('click', () => {
        let elementDoneList = document.querySelector('#doneList');
        let elementToDoList = document.querySelector('#ToDoList');
        let cloneDeepElementDoneList = elementDoneList.cloneNode(true);
        console.log('elementDoneList 1', elementDoneList);
        console.log('cloneDeepElementDoneList', cloneDeepElementDoneList);

        if (hideDoneList) {
            elementDoneList.remove();
            // console.log('hello', 'hello');
            hideDoneList = false;
            console.log('elementDoneList 2', elementDoneList);
        } else {
            cloneDeepElementDoneList.after(elementToDoList);
            console.log('show', 'show');
            hideDoneList = true;
            console.log('elementDoneList 3', elementDoneList);
        }
    });

}




// console.log('elemShowDoneTasks', elemShowDoneTasks);




// add event listener which use createTask() on ADD click
// const addNewListener (input) => {
//     createTask(input.text, randomId);
// }



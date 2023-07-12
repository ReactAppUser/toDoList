const defaultTasks = [
    {text: 'Hello', id: 'task0', taskstatus: false, },
    {text: 'What Is Your Name?', id: 'task1', taskstatus: false, },
    {text: 'How are you?', id: 'task2', taskstatus: false, },
    {text: 'What is you like?', id: 'task3', taskstatus: false, },
    {text: 'Buy', id: 'task4', taskstatus: false, },
];

let idCount = 4;
let addTask = false;


const todoList = [];
const doneList = [];







const changeTaskStatus = (taskElement) => {

    if (taskElement.checked) {
        // console.log('taskElement', taskElement);
        doneList.push(taskElement.parentElement);
        todoList.splice(todoList.indexOf(taskElement, 0));
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        // console.log('elem after', elem.getAttribute('taskstatus'));
        // elem.setAttribute('taskstatus', 'true');
        // console.log('elem before', elem.getAttribute('taskstatus'));
        // taskElement.checked = true;
        elem.remove();

        // https://stackoverflow.com/questions/55532767/how-to-find-an-element-by-data-selector-in-an-array-of-html-dom-objects-using-ja

        // console.log('doneList 1', doneList);
        // console.log('todoList 1', todoList);
        let doneListElement = document.querySelector('#doneList');
        doneList.map(function(task){
            doneListElement.prepend(task);
            // console.log('doneListElement', doneListElement);
            // console.log('task', task);
            // console.log('todoList.indexOf(task.id)', todoList.indexOf(task));
            // console.log('todoList before', todoList);

            // if (elem.getAttribute('taskstatus')) {
            //
            //     // taskElement.addEventListener('click', (event) => {
            //     //     const elem = document.querySelector(`#${taskElement.id}`).parentElement;
            //     //     let toDoListElement = document.querySelector('#toDoList');
            //     //     // setElementStatus = false;
            //     //     console.log('returnCheckedParagraphOnToDoList', 'returnCheckedParagraphOnToDoList');
            //     //     toDoListElement.append(elem);
            //     // });
            //     todoList.push(taskElement);
            //     elem.setAttribute('taskstatus', 'false');
            //     // taskElement.checked = false;
            //     console.log('elementStatus', (elem.getAttribute('taskstatus')));
            //
            //
            // };

            return doneListElement;
            // if (doneList.length == 0) {
            //     canChecked = false;
            // }
        });
        // remove from display in old list
        // add to display in new list
    } else {
        // const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        // let toDoListElement = document.querySelector('#toDoList');
        // toDoListElement.append(elem);
        todoList.push(taskElement);

        // taskElement.checked = false;



        // if (canChecked) {
        //
        // }
        // console.log('elem 2', elem)
        // doneList.splice(doneList.findIndex(elem), 0);
        // same shit
    }

    if (taskElement.checked == false) {
        // console.log('taskElement.checked == false', 'askElement.checked == false');
        // console.log('doneList 2', doneList);
        // console.log('todoList 2', todoList);
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        let toDoListElement = document.querySelector('#toDoList');
        toDoListElement.append(elem);
        doneList.splice(doneList.indexOf(taskElement, 0));
        // console.log('doneList 3', doneList);
        //
        //
        //
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

    //
    checkBox.addEventListener('click', (event) => {
        // console.log('CheckedCheckbox', event.target);
        changeTaskStatus(event.target);
    })

    deleteButton.addEventListener('click', (event) => {
        // console.log('deleteButton', event);
        taskElement.remove();
        let taskElementForDeleted = taskElement.id;
        console.log('task element delete button', taskElementForDeleted);
        todoList.map(task => {
            if (task.id == taskElementForDeleted) {
                let deletedTaskId = task.id.slice(8,9);
                todoList.splice(deletedTaskId,1);
                console.log('task', task.id);
            }
        });

        doneList.map(taskDone => {
            if (taskDone.id == taskElementForDeleted) {
                let deletedTaskDoneId = taskDone.id.slice(8, 9);
                doneList.splice(deletedTaskDoneId, 1);
                console.log('taskDone', taskDone.id);
            }
        });

        console.log('toDoList in delete button after',  todoList);
        console.log('doneList in delete button after',  doneList);
        if(todoList.length == 0 && doneList.length == 0) {

            console.log('toDoList if Zero', 'toDoList if Zero');
            defaultTasks.map(task => createTask(task.id, task.text ));

        }

        console.log('toDoList in delete button before',  todoList);
    })
}



let addNewTaskElementToField = document.querySelector('#addNewTaskField');
let idTaskNumber = () => {
    return ++idCount;
}

addNewTaskElementToField.addEventListener('change', (event)=> {
        // console.log('addNewTaskElementToField event', event.target.value);
            todoList.push(createTask(`${'task'+ idTaskNumber()}`, event.target.value));
            todoList.map((element) => {
                if(element === undefined) {
                    todoList.splice(todoList.indexOf(element, 0),1);
                }
            })
        // console.log('todoList', todoList);
        event.target.value = '';
    })


console.log('toDoList before', todoList);
defaultTasks.map(task => createTask(task.id, task.text ));
console.log('toDoList after', todoList);



// add event listener which use createTask() on ADD click
// const addNewListener (input) => {
//     createTask(input.text, randomId);
// }



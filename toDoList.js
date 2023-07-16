const defaultTasks = [
    {text: 'Hello', id: 'task0', taskstatus: false, },
    {text: 'What Is Your Name?', id: 'task1', taskstatus: false, },
    {text: 'How are you?', id: 'task2', taskstatus: false, },
    {text: 'What is you like?', id: 'task3', taskstatus: false, },
    {text: 'Buy', id: 'task4', taskstatus: false, },
];

let idCount = 4;
let addTask = false;
let addElementToDoneList = true;

const todoList = [];
const doneList = [];

const changeTaskStatus = (taskElement) => {

    if (taskElement.checked) {

       if (addElementToDoneList == true) {
           doneList.push(taskElement.parentElement);
           addElementToDoneList =true;
           console.log('doneList push', doneList);
       }
        todoList.splice(todoList.indexOf(taskElement, 0));
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;

        elem.remove();

        // https://stackoverflow.com/questions/55532767/how-to-find-an-element-by-data-selector-in-an-array-of-html-dom-objects-using-ja


        let doneListElement = document.querySelector('#doneList');
        doneList.map(function(task){
            doneListElement.prepend(task);


            return doneListElement;

        });
        // remove from display in old list
        // add to display in new list
    } else {

        todoList.push(taskElement);




        // if (canChecked) {
        //
        // }
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

    //
    checkBox.addEventListener('click', (event) => {
        // console.log('CheckedCheckbox', event.target);
        changeTaskStatus(event.target);
    })

    deleteButton.addEventListener('click', (event) => {
        addElementToDoneList = false;
        console.log('addElementToDoneList', addElementToDoneList);
        taskElement.remove();
        let taskElementForDeleted = taskElement.id;
        console.log('task element delete button', taskElementForDeleted);

        todoList.map(task => {
            if (task.id == taskElementForDeleted) {
                let deletedTaskId = task.id.slice(8,9);
                todoList.splice(deletedTaskId,1, '');

                console.group('toDoList');
                console.log('task task.id', task.id);
                console.log('task deletedTaskId', deletedTaskId);
                console.log('toDoList in delete button before',  todoList);
                console.groupEnd();
            }
        });

        doneList.map(taskDone => {
            if (taskDone.id == taskElementForDeleted) {
                let deletedTaskDoneId = taskDone.id.slice(8, 9);
                doneList.splice(deletedTaskDoneId, 1, '');
                console.group('doneList');
                console.log('taskDone taskDone.id', taskDone.id);
                console.log('taskDone taskElementForDeleted', taskElementForDeleted);
                console.log('taskDone doneList',  doneList);
                console.groupEnd();
            }
        });

        console.log('Done list after', doneList)


        if(todoList.length == 0 && doneList.length == 0) {

            console.log('toDoList if Zero', 'toDoList if Zero');
            defaultTasks.map(task => createTask(task.id, task.text ));

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


console.log('toDoList before', todoList);
defaultTasks.map(task => createTask(task.id, task.text ));
console.log('toDoList after', todoList);



// add event listener which use createTask() on ADD click
// const addNewListener (input) => {
//     createTask(input.text, randomId);
// }



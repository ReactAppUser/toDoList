
let defaultTasks = [
    {text: 'Hello', id: 'task0', taskstatus: false, donelist: false,},
    {text: 'What Is Your Name?', id: 'task1', taskstatus: false, donelist: false,},
    {text: 'How are you?', id: 'task2', taskstatus: false, donelist: false,},
    {text: 'What is you like?', id: 'task3', taskstatus: false, donelist: false,},
    {text: 'Buy', id: 'task4', taskstatus: false, donelist: false,},
];

const allTask = [];




let addTask = false;
let showDoneList = true;
let hideDoneList = true;
let ontoDoListAddNewTask = false;
let todoList = [];
let doneList = [];
const doneListSavedElement = [];
let idCount = (localStorage.length-1);

localStorage.removeItem('[object HTMLDivElement]');

const changeTaskStatus = (taskElement) => {

    if (taskElement.checked) {

            console.log('taskElement', taskElement);
            taskElement.parentElement.setAttribute('donelist', `${true}`);
            let taskElementId = taskElement.getAttribute('id')
            console.log('taskElementId', taskElementId);
            localStorage.setItem(taskElementId, taskElement);
            console.log('taskElement.parentElement', taskElement.parentElement.attributes);
            doneList.push(taskElement.parentElement);
            console.log('doneList', doneList);


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


const createTask = (id, text, targetArray, appendTrue) => {
    const taskElement = document.createElement("div");
    taskElement.setAttribute('id', `${'div_'+id}`);
    taskElement.setAttribute('taskstatus', `${false}`);
    taskElement.setAttribute('donelist', `${false}`);
    taskElement.innerHTML = `<input type="checkbox" id="${id}" name="scales"><label for="${id}">${text}</label><button>DELETE</button>`;
    const checkBox = taskElement.firstChild;
    const deleteButton = taskElement.lastChild;
    targetArray.push(taskElement);
    if (appendTrue) {
        document.querySelector('#toDoList').append(taskElement);
    }
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
            // console.log('toDoList if Zero', 'toDoList if Zero');
            defaultTasks.map(task => createTask(task.id, task.text, todoList, true));
            // console.log('todoList', todoList);
            // console.log('doneList', doneList);
        }



    })
}

let addNewTaskElementToField = document.querySelector('#addNewTaskField');
let idTaskNumber = () => {
    return ++idCount;
}

addNewTaskElementToField.addEventListener('change', (event)=> {
            todoList.push(createTask(`${'task'+ idTaskNumber()}`, event.target.value, todoList, true));
            todoList.map((element) => {
                if(element === undefined) {
                    todoList.splice(todoList.indexOf(element, 0),1);
                }
            })
        event.target.value = '';
    });




if(hideDoneList) {
    const elemShowDoneTasks = document.querySelector(`#showDoneTaskList`)
    elemShowDoneTasks.addEventListener('click', () => {
        let elementDoneList = document.querySelector('#doneList');
        let elementToDoList = document.querySelector('#h1DoneList');
        // let cloneDeepElementDoneList = elementDoneList.cloneNode(true);
        console.log('elementDoneList 1', elementDoneList);
        // console.log('cloneDeepElementDoneList', cloneDeepElementDoneList);

        if (hideDoneList) {
            doneListSavedElement.push(elementDoneList)
            elementDoneList.remove();
            // console.log('hello', 'hello');
            hideDoneList = false;
            console.log('elementDoneList 2', elementDoneList);
        } else {
            doneListSavedElement.map((savedElement)=> {
                console.log('savedElement', savedElement);
                console.log('elementToDoList', elementToDoList);
                elementToDoList.after(savedElement);
            })
            // cloneDeepElementDoneList.after(elementToDoList);
            console.log('show', 'show');
            hideDoneList = true;
            console.log('elementDoneList 3', doneListSavedElement);
        }
    });
}

// mapAllListToStorage(todoList);
// mapAllListToStorage(doneList);

// function reloadPage() {
//     console.log('reload', 'reload')
// }

// console.log('document.readyState', document.readyState);
//
// console.log('document.readyState.readystatechange', document.readyState.onreadystatechange);

// document.addEventListener("unload", reloadPage);


// console.log('elemShowDoneTasks', elemShowDoneTasks);




// add event listener which use createTask() on ADD click
// const addNewListener (input) => {
//     createTask(input.text, randomId);
// }

function mapAllListToStorage(neededMap) {
    neededMap.map((task) => {
        console.log('neededMap task', task);
        // console.log('task', task)
        // let stringTextTask = task.text.toString();
        // let stringIdTask = task.id.toString();
        // let stringTaskStatus = task.taskstatus.toString();
        // let stringTask = `text: ${stringTextTask}, id: ${stringIdTask}, taskstatus: ${stringTaskStatus}`;
        console.log('task 5', task);
        localStorage.setItem(task.id, JSON.stringify(task));
    });
}



/*console.log('LocalStorage', localStorage);*/
// console.log('todoList', todoList);
// console.log('doneList', doneList);

let observerToDoList = new MutationObserver(mutationRecords => {
    // console.log(mutationRecords);
    ontoDoListAddNewTask = true;
    // console.log('ontoDoListAddNewTask', ontoDoListAddNewTask);


    function listObjectCollection(arrayList) {
            let toDoListObjectCollection = arrayList.map(task => {
            let text = task.children[1].firstChild.nodeValue;
            let id = task.children[0].id;
            let taskstatus = null;
            let donelist = null;


            if (task.attributes[1].nodeValue == 'false') {
                taskstatus = false;
            } else {
                taskstatus = true;
            }

            console.log('task.attributes[2].nodeValue', task.attributes[2].nodeValue);


            if (task.attributes[2].nodeValue == 'true') {
                    donelist = true;
                } else {
                    donelist = false;
                }
            // let taskstatus = task.attributes[1].nodeValue;

            // console.log('task.attributes', task.attributes);
            // console.log('{text, id, taskstatus}', {text, id, taskstatus});


            return {text, id, taskstatus, donelist};




            // console.log('objectList 1', {text, id, taskstatus});
            // console.log('task id', task.children[0].id);
            // console.log('task text', task.children[1].firstChild.nodeValue);
            // console.log('task taskstatus', task.attributes[1].nodeValue);

            // console.log('task', JSON.stringify({task: task}) );
            // localStorage.setItem(task, task);
        });
            return toDoListObjectCollection;
    };



    if (ontoDoListAddNewTask) {

        listObjectCollection(todoList)
        // console.log('toDoListObjectCollection 1', listObjectCollection(todoList));
        // console.log('toDoListObjectCollection', toDoListObjectCollection);
        ontoDoListAddNewTask = false;

        mapAllListToStorage(listObjectCollection(todoList));
        // toDoListObjectCollection.map(task => {
        //     console.log('task', task.id );
        // })
    }
});

observerToDoList.observe(toDoList, {
    childList: true,
    subtree: true,
    characterData: true,
})

// console.log('localStorage', localStorage);

let localStorageArray = [];
let divElementLocalStorageArray = [];
let keys = Object.keys(localStorage);

for(let key of keys) {

    if (key == '[object HTMLDivElement]') {
        localStorage.removeItem(key);
}
    localStorage.removeItem('[object HTMLDivElement]');
    localStorageArray.push(JSON.parse(localStorage.getItem(key)));
};



localStorageArray.sort(function (a, b) {
    let valueA = +a.id.slice(4);
    let valueB = +b.id.slice(4);

    if (valueA  > valueB) {
        return 1;
    }

    if (valueA  < valueB) {
        return -1;
    }

    return 0;
});

// console.log('localStorageArray', localStorageArray);
// console.log('divElementLocalStorageArray', divElementLocalStorageArray);


    if (divElementLocalStorageArray.length < localStorageArray.length) {
        localStorageArray.map(task => {
            // const taskElement = document.createElement("div");
            // taskElement.setAttribute('id', `${'div_'+task.id}`);
            // taskElement.setAttribute('taskstatus', task.taskstatus);
            // taskElement.innerHTML = `<input type="checkbox" id="${task.id}" name="scales"><label for="${task.id}">${task.text}</label><button>DELETE</button>`;
            // divElementLocalStorageArray.push(taskElement);
        createTask(task.id, task.text, divElementLocalStorageArray, false);
    });
};

// console.log('localStorageArray 0', divElementLocalStorageArray);


if(todoList.length < localStorageArray.length ) {

defaultTasks = localStorageArray;
    // todoList = divElementLocalStorageArray;
    // divElementLocalStorageArray

    console.log('defaultTasks', defaultTasks);
    console.log('localStorageArray 1', localStorageArray);
    console.log('divElementLocalStorageArray 1', divElementLocalStorageArray);
    console.log('todoList 1', todoList);
};

function addDefaultTasks(defaultTasksArray) {
    defaultTasksArray.map(task => {
        createTask(task.id, task.text, todoList, true);
    });
};

if (defaultTasks.length < 5) {
    addDefaultTasks(defaultTasks);
};

if (5 <= defaultTasks.length) {
    addDefaultTasks(defaultTasks);
};

/*console.log('defaultTasks.length', defaultTasks.length);*/


// console.log('localStorage', [localStorage]);



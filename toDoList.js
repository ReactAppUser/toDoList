
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
let doneListLocalStorageItems = [{text: 'Try for done list', id: 'task778', taskstatus: false, donelist: false,},];
const doneListSavedElement = [];
let idCount = (localStorage.length-1);


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

        return {text, id, taskstatus, donelist};

    });
    return toDoListObjectCollection;
};

const changeTaskStatus = (taskElement) => {

    if (taskElement.checked) {
            console.log('taskElement', taskElement);
            taskElement.parentElement.setAttribute('donelist', `${true}`);
            let taskElementId = taskElement.getAttribute('id')
            doneList.push(taskElement.parentElement);
        listObjectCollection(doneList).map( task => {
            localStorage.setItem(taskElementId, JSON.stringify(task));
                }
            );


        todoList.splice(todoList.indexOf(taskElement, 0));
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;

        elem.remove();

        // https://stackoverflow.com/questions/55532767/how-to-find-an-element-by-data-selector-in-an-array-of-html-dom-objects-using-ja


        let doneListElement = document.querySelector('#DoneList');
        doneList.map(function(task){

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

const createTask = (id, text, targetArray, appendTrue, donelistValue, querySelectorValue) => {
    const taskElement = document.createElement("div");
    taskElement.setAttribute('id', `${'div_'+id}`);
    taskElement.setAttribute('taskstatus', `${false}`);
    taskElement.setAttribute('donelist', `${donelistValue}`);
    taskElement.innerHTML = `<input type="checkbox" id="${id}" name="scales"><label for="${id}">${text}</label><button>DELETE</button>`;
    const checkBox = taskElement.firstChild;
    const deleteButton = taskElement.lastChild;
    targetArray.push(taskElement);
    if (appendTrue) {
        document.querySelector(`${querySelectorValue? querySelectorValue:'#toDoList'}`).append(taskElement);
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
            defaultTasks.map(task => createTask(task.id, task.text, todoList, true, true));
        }
    })
};

let addNewTaskElementToField = document.querySelector('#addNewTaskField');
let idTaskNumber = () => {
    return ++idCount;
}

addNewTaskElementToField.addEventListener('change', (event)=> {
            todoList.push(createTask(`${'task'+ idTaskNumber()}`, event.target.value, todoList, true, false));
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
        let elementDoneList = document.querySelector('#DoneList');
        let elementToDoList = document.querySelector('#h1DoneList');
        console.log('elementDoneList 1', elementDoneList);

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
            console.log('show', 'show');
            hideDoneList = true;
            console.log('elementDoneList 3', doneListSavedElement);
        }
    });
}

function mapAllListToStorage(neededMap) {
    neededMap.map((task) => {
        console.log('neededMap task', task);
        console.log('task 5', task);
        console.log('localStorage toDoList', localStorage);
        localStorage.setItem(task.id, JSON.stringify(task));
    });
}

let observerToDoList = new MutationObserver(mutationRecords => {
    ontoDoListAddNewTask = true;

    if (ontoDoListAddNewTask) {
        listObjectCollection(todoList)
        ontoDoListAddNewTask = false;
        mapAllListToStorage(listObjectCollection(todoList));
    }
});

let observerDoneList = new MutationObserver( mutationRecords => {
    let doneListLocalStorage = localStorage;
    let keysDoneLIst = Object.keys(localStorage);

    for(let key of keysDoneLIst) {

        let localStorageDoneListItem = JSON.parse(localStorage.getItem(key));
        if (localStorageDoneListItem.donelist == true) {
            doneListLocalStorageItems.push(localStorageDoneListItem);
            console.log('key', localStorageDoneListItem);
        }

    };
});


if (doneList.length == 0) {


    let divDoneListLocalStorageItemsElements = [];

    doneListLocalStorageItems.map(task => {
        createTask(task.id, task.text, divDoneListLocalStorageItemsElements, false, true);
    });



    doneList = divDoneListLocalStorageItemsElements;

    let doneListElementLocalStorageAddedMechanics = document.querySelector('#DoneList');
    doneList.map(task => {
        doneListElementLocalStorageAddedMechanics.prepend(task);
    });

}


observerToDoList.observe(toDoList, {
    childList: true,
    subtree: true,
    characterData: true,
});

observerDoneList.observe(DoneList, {
    childList: true,
    subtree: true,
    characterData: true,
});

let localStorageArray = [];
let divElementLocalStorageArray = [];
let keys = Object.keys(localStorage);

for(let key of keys) {
    if (key == '[object HTMLDivElement]') {
        localStorage.removeItem(key);
}
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

    if (divElementLocalStorageArray.length < localStorageArray.length) {
        localStorageArray.map(task => {
        createTask(task.id, task.text, divElementLocalStorageArray, false, false);
    });
};

if(todoList.length < localStorageArray.length ) {

defaultTasks = localStorageArray;
    console.log('defaultTasks', defaultTasks);
    console.log('localStorageArray 1', localStorageArray);
    console.log('divElementLocalStorageArray 1', divElementLocalStorageArray);
    console.log('todoList 1', todoList);
};

function addDefaultTasks(defaultTasksArray) {

    let localStorageState = Object.keys(localStorage);
    let localStorageStateItemTrue = null;


    for(let keyItem of localStorageState) {

        let localStorageStateItem = JSON.parse(localStorage.getItem(keyItem));

        if (localStorageStateItem.donelist == true) {

            localStorageStateItemTrue = localStorageStateItem;
            console.log('keyItem Super', localStorageStateItem);
        };
    };





    // localStorageState.map(task => {
    //     console.log('localStorageState', task);
    // });
if(localStorage.length == 0) {
    defaultTasksArray.map(task => {
        // Доробити потрібно у цьому місці, на фолс змінює  defaultTasksArray тому потрібна умова за якою дефол буде зберігати стан тру там де це доречно
        createTask(task.id, task.text, todoList, true, false);

    });
};

if(localStorage.length > 0) {

    let localStorageStateDoneList = Object.keys(localStorage);
    let localStorageStateItemTrueDonelist = [];

    for(let keyItem of localStorageStateDoneList) {

        let localStorageStateItemDoneList = JSON.parse(localStorage.getItem(keyItem));

        console.log('localStorageStateItemDoneList SUPER', localStorageStateItemDoneList);

            localStorageStateItemTrueDonelist.push(localStorageStateItemDoneList);

        //     [localStorage].map(task => {
    //     console.log('task SUPER', task );
    // })
    //
    };

    localStorageStateItemTrueDonelist.map(task => {

        console.log('task SUPED SUPER', task);
        // Доробити потрібно у цьому місці, на фолс змінює  defaultTasksArray тому потрібна умова за якою дефол буде зберігати стан тру там де це доречно
        if(task.donelist == false) {
            console.log('task.doneList FALSE', task );
            createTask(task.id, task.text, todoList, true, task.donelist);
        };
        // Потрібно розібратися чому відбувається дублювання елементів у   localStorageStateItemTrueDonelist котрі відмальвуються
        if(task.donelist == true) {
            console.log('task.doneList TRUE', task );
            localStorageStateItemTrueDonelist.map(task => {
                // Доробити потрібно у цьому місці, на фолс змінює  defaultTasksArray тому потрібна умова за якою дефол буде зберігати стан тру там де це доречно
                createTask(task.id, task.text,   doneList, true, task.donelist, '#DoneList');

            });
        }
    });

    console.log('keyItem Super', localStorageStateItemTrueDonelist);
};
};

if (defaultTasks.length < 5) {
    addDefaultTasks(defaultTasks);
};

if (5 <= defaultTasks.length) {
    addDefaultTasks(defaultTasks);
};

// Знайти спосіб попередити заміну поля donelist: true в localStorage
// при перезавантажені заміни. Заміна в localStorage відбувається через те,
// що після оновлення сторінки визивається перший виклик локал сторедж який створює за тим самим ключом
// тіло, що містить donelist: false




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
let doneListForReloadPage = [];
let doneListForReloadPageOnlyIndex = [];
let doneListLocalStorageItems = [];
let localStorageStateItemTrueDonelist = [];
let localStorageStateItemTrueDonelistWithOutSort = [];
let stringCopyArrayNodeValueDoneListForReloadPageOnlyIndex = [];
let finishDoneListAfterReload = [];
const doneListSavedElement = [];



let idCount = (localStorage.length-1);

function listObjectCollection(arrayList) {
    let toDoListObjectCollection = arrayList.map(task => {

        let text = task.children[1].firstChild.nodeValue;
        let id = task.children[0].id;
        let taskstatus = null;
        let donelist = null;
        let positionIndex = Number(task.attributes[3].nodeValue);
        // let positionIndex = null;

        if (task.attributes[1].nodeValue == 'false') {
            taskstatus = false;
        } else {
            taskstatus = true;
        }

        if (task.attributes[2].nodeValue == 'true') {
            donelist = true;
        } else {
            donelist = false;
        }

        return {text, id, taskstatus, donelist, positionIndex};

    });
    return toDoListObjectCollection;
};

    const changeTaskStatus = (taskElement) => {

    if (taskElement.checked) {

            taskElement.parentElement.setAttribute('donelist', `${true}`);
            let taskElementId = taskElement.getAttribute('id')
            doneList.push(taskElement.parentElement);


            listObjectCollection(doneList).map(task => {

                let stringConstructionForArrayNodeValueDoneListDuplicate = `${'div#div_' + task.id}`;


            localStorage.setItem(taskElementId, JSON.stringify(task));

                let doneListDuplicate = doneList.concat();
                let mapedDoneListDuplicate = doneListDuplicate.map(task => {
                let arrayNodeValueDoneListDuplicate = `${'div#' + task.attributes.id.nodeValue}`;


              return arrayNodeValueDoneListDuplicate
            });

            let doneListTaskElementPosition = mapedDoneListDuplicate.indexOf(stringConstructionForArrayNodeValueDoneListDuplicate, 0);

                        if(doneListTaskElementPosition !== task.positionIndex) {
                        task.positionIndex = doneListTaskElementPosition;
                    }

                    localStorage.setItem(taskElementId, JSON.stringify(task));


                });

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
        // doneList.splice(doneList.findIndex(elem), 0);
        // same shit
    }

    if (taskElement.checked == false) {
        const elem = document.querySelector(`#${taskElement.id}`).parentElement;
        let toDoListElement = document.querySelector('#toDoList');
        toDoListElement.append(elem);
        doneList.splice(doneList.indexOf(taskElement, 0));
    }
};

    const createTask = (id, text, targetArray, appendTrue, donelistValue, querySelectorValue, checkedStatus, positionIndex) => {
    const taskElement = document.createElement("div");


    taskElement.setAttribute('id', `${'div_'+id}`);
    taskElement.setAttribute('taskstatus', `${false}`);
    taskElement.setAttribute('donelist', `${donelistValue}`);
    taskElement.innerHTML = `<input type="checkbox" id="${id}" name="scales"><label for="${id}">${text}</label><button>DELETE</button>`;


    if (checkedStatus == true) {
        taskElement.firstChild.checked = true;
    }

    const checkBox = taskElement.firstChild;
    const deleteButton = taskElement.lastChild;

    if (targetArray == todoList) {
        targetArray.push(taskElement);
    };


    if (targetArray == doneList) {
        targetArray[positionIndex] = taskElement;
    };

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
            defaultTasks.map(task => createTask(task.id, task.text, todoList, true, false));
        }
    });

    taskElement.setAttribute('positionIndex',  targetArray.indexOf(taskElement));

};

let addNewTaskElementToField = document.querySelector('#addNewTaskField');
let idTaskNumber = () => {
    return ++idCount;
}

let clearLocalStorageButton = document.querySelector('#clearLocalStorage');

clearLocalStorageButton.addEventListener('click', (event) => {
localStorage.clear();
location.reload();
});

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

        if (hideDoneList) {
            doneListSavedElement.push(elementDoneList)
            elementDoneList.remove();
            hideDoneList = false;
        } else {
            doneListSavedElement.map((savedElement)=> {
                elementToDoList.after(savedElement);
            })
            hideDoneList = true;
        }
    });
}

function mapAllListToStorage(neededMap) {
    neededMap.map((task) => {
        localStorage.setItem(task.id, JSON.stringify(task));
    });
}

let observerToDoList = new MutationObserver(mutationRecords => {
    ontoDoListAddNewTask = true;

    if (ontoDoListAddNewTask) {
        listObjectCollection(todoList);
        ontoDoListAddNewTask = false;
        mapAllListToStorage(listObjectCollection(todoList));
    }

});

let observerDoneList = new MutationObserver( mutationRecords => {

    function realityIndexOfDoneListElements() {
        let  doneListParentElement = document.querySelector('#DoneList');
        let  childrenOfDoneListParentElement = doneListParentElement.children;

        for  (let key in childrenOfDoneListParentElement) {


          let keyElement = key;
          let valueElement = childrenOfDoneListParentElement[key];
          if(String(key) !== 'item' || String(key) !== 'nameItem') {
              doneListForReloadPage[keyElement] = valueElement;
              doneListForReloadPageOnlyIndex = doneListForReloadPage.map(task => task);
             };
        }

        return
    };

    realityIndexOfDoneListElements();

    // console.log('doneListParentElement key1', doneListForReloadPageOnlyIndex );

   let doneListForReloadPageOnlyIndexArrayElements = listObjectCollection(doneListForReloadPageOnlyIndex);

    doneListForReloadPageOnlyIndexArrayElements.map(task => {

        let newStringConstructionForArrayNodeValueDoneListDuplicate = `${'div#div_' + task.id}`;

        let duplicateDoneListForReloadPageOnlyIndex = doneListForReloadPageOnlyIndex.concat();
        let mapedDuplicateDoneListForReloadPageOnlyIndex = duplicateDoneListForReloadPageOnlyIndex.map(task => {
        let arrayNodeValueDoneListForReloadPageOnlyIndex = `${'div#' + task.attributes.id.nodeValue}`;

        // stringCopyArrayNodeValueDoneListForReloadPageOnlyIndex.push();

        return arrayNodeValueDoneListForReloadPageOnlyIndex
    });


        console.log('mapedDuplicateDoneListForReloadPageOnlyIndex', mapedDuplicateDoneListForReloadPageOnlyIndex);
      // mapedDuplicateDoneListForReloadPageOnlyIndex як в ньому знайти потрібний мені елемент

        let indexOfElementDuplicateDoneListForReloadPageOnlyIndex = mapedDuplicateDoneListForReloadPageOnlyIndex.indexOf(newStringConstructionForArrayNodeValueDoneListDuplicate, 0);

            task.positionIndex = indexOfElementDuplicateDoneListForReloadPageOnlyIndex;
            finishDoneListAfterReload[indexOfElementDuplicateDoneListForReloadPageOnlyIndex] = task; //07/12/23 Допрацювати task таким чином, щоб отримувати таски з індексом, що відповідають фактичному положенню на сторінці у донеліст до перезавантаження і відтворити цю послідовність при перезавантаженні

        console.log('finishDoneListAfterReload', finishDoneListAfterReload);
        console.log('indexOfElementDuplicateDoneListForReloadPageOnlyIndex', indexOfElementDuplicateDoneListForReloadPageOnlyIndex);
    })




    console.log('stringCopyArrayNodeValueDoneListForReloadPageOnlyIndex', stringCopyArrayNodeValueDoneListForReloadPageOnlyIndex);





    // listObjectCollection(doneList).map(task => {
    //
    //     let stringConstructionForArrayNodeValueDoneListDuplicate = `${'div#div_' + task.id}`;
    //
    //
    //     localStorage.setItem(taskElementId, JSON.stringify(task));
    //
    //     let doneListDuplicate = doneList.concat();
    //     let mapedDoneListDuplicate = doneListDuplicate.map(task => {
    //         let arrayNodeValueDoneListDuplicate = `${'div#' + task.attributes.id.nodeValue}`;
    //
    //
    //         return arrayNodeValueDoneListDuplicate
    //     });
    //
    //     let doneListTaskElementPosition = mapedDoneListDuplicate.indexOf(stringConstructionForArrayNodeValueDoneListDuplicate, 0);
    //
    //     if(doneListTaskElementPosition !== task.positionIndex) {
    //         task.positionIndex = doneListTaskElementPosition;
    //     }
    //
    //     localStorage.setItem(taskElementId, JSON.stringify(task));
    //
    //
    // });
    //



    // console.log('mapedDuplicateDoneListForReloadPageOnlyIndex', mapedDuplicateDoneListForReloadPageOnlyIndex);
    // console.log('task', task);



//     let doneListDuplicate = doneList.concat();
//     let mapedDoneListDuplicate = doneListDuplicate.map(task => {
//         let arrayNodeValueDoneListDuplicate = `${'div#' + task.attributes.id.nodeValue}`;
//
//
//         return arrayNodeValueDoneListDuplicate
//     });
//
//     let doneListTaskElementPosition = mapedDoneListDuplicate.indexOf(stringConstructionForArrayNodeValueDoneListDuplicate, 0);
//
//     if(doneListTaskElementPosition !== task.positionIndex) {
//         task.positionIndex = doneListTaskElementPosition;
//     }
//
//     localStorage.setItem(taskElementId, JSON.stringify(task));
//
//
// });
//

    // doneListForReloadPageOnlyIndex.map(task => {
    //     console.log('task', task);
    //     }
    // );

    console.log('doneListForReloadPageOnlyIndexArrayElements', doneListForReloadPageOnlyIndexArrayElements);

    // let sessionStorage = sessionStorage.setItem()


    let doneListLocalStorage = localStorage;
    let keysDoneLIst = Object.keys(localStorage);

    for(let key of keysDoneLIst) {

        let localStorageDoneListItem = JSON.parse(localStorage.getItem(key));
        if (localStorageDoneListItem.donelist == true) {
            doneListLocalStorageItems.push(localStorageDoneListItem);
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

function arraySort(array, position) {

if(array == localStorageStateItemTrueDonelist) {
    array.sort(function (a, b) {




            // let valueA = a.positionIndex;
            // let valueB = b.positionIndex;
            let valueA = +a.id.slice(position);
            let valueB = +b.id.slice(position);

            if (valueA > valueB) {
                return 1;
            }

            if (valueA < valueB) {
                return -1;
            }

            return 0;

    });

    return array
}
};

arraySort(localStorageArray, 4);

    if (divElementLocalStorageArray.length < localStorageArray.length) {
        localStorageArray.map(task => {
        createTask(task.id, task.text, divElementLocalStorageArray, false, false);
    });
};
    if(todoList.length < localStorageArray.length ) {
    defaultTasks = localStorageArray;
};

function addDefaultTasks(defaultTasksArray) {

    let localStorageState = Object.keys(localStorage);
    let localStorageStateItemTrue = null;


    for(let keyItem of localStorageState) {

        let localStorageStateItem = JSON.parse(localStorage.getItem(keyItem));

        if (localStorageStateItem.donelist == true) {
            localStorageStateItemTrue = localStorageStateItem;
        };
    };

if(localStorage.length == 0) {
    defaultTasksArray.map(task => {
        createTask(task.id, task.text, todoList, true, false);

    });
};

if(localStorage.length > 0) {
    let localStorageStateDoneList = Object.keys(localStorage);


    for(let keyItem of localStorageStateDoneList) {

        let localStorageStateItemDoneList = JSON.parse(localStorage.getItem(keyItem));
            localStorageStateItemTrueDonelist.push(localStorageStateItemDoneList);
    };

    arraySort(localStorageStateItemTrueDonelist, 4); // 28.09.23. розібратися як відключити сортування doneList, але залишити сортування todoList

    localStorageStateItemTrueDonelist.map(task => {
        if(task.donelist == false) {
            createTask(task.id, task.text, todoList, true, task.donelist);
             };
        });

    localStorageStateItemTrueDonelist.map(task => {

        if(task.donelist == true) {
            localStorageStateItemTrueDonelistWithOutSort.push(task);
        };

    });

    localStorageStateItemTrueDonelistWithOutSort.map(task => {

    console.log('localStorageStateItemTrueDonelistWithOutSort', localStorageStateItemTrueDonelistWithOutSort);
    createTask(task.id, task.text, doneList, true, task.donelist, '#DoneList', true, task.positionIndex);
    let taskIdNumber = task.id.slice(4);
    });


};
};


// 04/10/23  розібратися як замінити у локалСторедж позиції донеліст на ці звказанням цих індекців

if (defaultTasks.length < 5) {
    addDefaultTasks(defaultTasks);
};

if (5 <= defaultTasks.length) {
    addDefaultTasks(defaultTasks);
};



    const toDoList = [
        {task: 'hello'},
        {task: 'What is your name?'},
        {task: 'How are you?'},
        {task: 'what is you like?'},
        {task: 'Buy'},
        ];

    // let newToDoListLengths

    // console.log('toDoList', toDoList);

    let elForToDoList = document.querySelector('.toDoList');
    let elBody = document.querySelector('.body');



    let ElementCreater =  function (Dom, element, attribute1, attributeValue1,  attribute2, attributeValue2,className, value) {
        let DOMEl = Dom;
        let readyElement = document.createElement(element);
        readyElement.setAttribute(attribute1, attributeValue1);
        readyElement.setAttribute(attribute2, attributeValue2);
        readyElement.classList.add(className);
        readyElement.innerHTML = value;
        DOMEl.append(readyElement);
        return DOMEl
    };

    // console.log('toDoList', toDoList)
    // console.log('toDoList.lengths', toDoList.length)

    let pushEvent = function (task, event) {
        // event.preventDefault();

        ElementCreater(document.querySelector('.toDoList'),'li','aria-current', null, null,'true', 'list-group-item', task );
        // this.event.preventDefault()
    //     console.log('event', task);
    //     console.log('toDoList', toDoList)
    //     // let newToDoList  = toDoList.push({task});
    //     // console.log('newToDoList', newToDoList);
    //     // if(toDoList.length = newToDoList) {
    //     //     toDoList.map((element) => {
    //     //             ElementCreater(document.querySelector('.toDoList'),'li','aria-current' , null, null,'true', 'list-group-item', element.task );
    //     //             // let liEl = document.createElement('li');
    //     //             // liEl.innerHTML = element.task;
    //     //             // liEl.classList.add('list-group-item');
    //     //             // liEl.setAttribute('aria-current', 'true');
    //     //             // elForToDoList.append(liEl);
    //     //         }
    //     //     );
    //     // }
    //     //
    //     // return  newToDoList
    //
    };

    let  keyDownEnter =  document.addEventListener( 'keydown',  (event, task) => {
        if( event.code === 'Enter') {
            event.preventDefault();
            // console.log('event', event.target.value);
            pushEvent(event.target.value);
        }
    });





    // console.log('newToDoListLengths', newToDoListLengths)

    ElementCreater(document.querySelector('.body'),'form', null,null, null,null ,'form', null);
    ElementCreater(document.querySelector('.form'),'input', 'onchange','keyDownEnter', 'onchange', 'pushEvent(this.value, event)', 'inputForText', null);
    ElementCreater(document.querySelector('.form'),'input', 'type','button', 'value', 'submitButton', 'inputButton', 'Submit Button');


    toDoList.map((element) => {
       ElementCreater(document.querySelector('.toDoList'),'li','aria-current' , null, null,'true', 'list-group-item', element.task );
    //     // let liEl = document.createElement('li');
    //     // liEl.innerHTML = element.task;
    //     // liEl.classList.add('list-group-item');
    //     // liEl.setAttribute('aria-current', 'true');
    //     // elForToDoList.append(liEl);
       }
    );


    // let getInput = document.querySelector('.inputForText')

   // let liInput = document.createElement('input');
   //  elForToDoList.append(liInput);

    // console.log('elForToDoList', getInput);



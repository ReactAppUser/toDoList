
    const toDoList = [
        {task: 'Hello', taskClassName: 'Hello'},
        {task: 'What Is Your Name?', taskClassName: 'WhatIsYourName?'},
        {task: 'How are you?', taskClassName: 'HowAreYou?'},
        {task: 'what is you like?', taskClassName: 'WhatIsYouLike?'},
        {task: 'Buy', taskClassName: 'Buy'},
        ];

    let elForToDoList = document.querySelector('.toDoList');
    let elBody = document.querySelector('.body');

    let formElement = new CreatorForObjectElement(
        '.body',
        'form',
        [['null', 'null'], ['null', 'null']],
        'form',
        '',
        );

    let inputElement = new CreatorForObjectElement(
        '.form',
        'input',
        [['onchange', 'keyDownEnter'], ['onchange', 'pushEvent(this.value, event)']],
        'inputForText',
        '',
    );

    let inputButtonElement = new CreatorForObjectElement(
        '.form',
        'input',
        [['type', 'button'], ['value', 'submitButton']],
        'null',
        'Submit Button',
    );

    let chckedButtonElement = new CreatorForObjectElement(
        '.form',
        'input',
        [['type', 'button'], ['value', 'CheckedButton']],
        'null',
        'Done checking button',
    );

    let liElement = new CreatorForObjectElement(
        '.toDoList',
        'li',
        [['aria-current', 'true'], ['null', 'null']],
        `null`,
        'null',
    );

    let checkboxElement = new CreatorForObjectElement(
        '.list-group-item',
        'input',
        [['type', 'checkbox'], ['name', 'null'], ['value', 'null']],
        'checkbox-group-item',
        'null',
    );

    elementCreator(formElement);

    elementCreator(inputElement);

    elementCreator(inputButtonElement);

    elementCreator(chckedButtonElement);


    function CreatorForObjectElement(dom, element, attribute, className, value) {
        this.dom = dom;
        this.element = element;
        this.attribute = attribute ? attribute : null;
        this.className = className ? className : null;;
        this.value = value ? value : null;
    };

    function elementCreator(objectElement){
        let DOMEl = document.querySelector(objectElement.dom);
        let readyElement = document.createElement(objectElement.element);
        let attributeArray = objectElement.attribute;
            attributeArray.forEach(function(attributesStack){
                    let attribute = attributesStack[0];
                    let attributeValue = attributesStack[1];
                    readyElement.setAttribute(attribute, attributeValue);
         });
        readyElement.classList.add(objectElement.className);
        readyElement.innerHTML = objectElement.value;
        DOMEl.append(readyElement);
        return DOMEl
    };

    function pushEvent(task){
        liElement.value = task;
        if (liElement.value) {
            liElement.className = task;
        } else {
            liElement.className = 'newFunction'
        }
        elementCreator(liElement);
    };

    document.addEventListener('keydown',(event, task) => {
        if( event.code === 'Enter') {
            event.preventDefault();
            pushEvent(event.target.value);
        }
    });


    toDoList.map((element) => {
        console.log('element', element);
         liElement.className = element.taskClassName;
         liElement.value = element.task;
         elementCreator(liElement);
    }
    );

    // toDoList.map((element) => {

    //     elementCreator(checkboxElement);
    //     }
    // );






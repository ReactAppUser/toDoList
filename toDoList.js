    const toDoList = [
        {task: 'hello'},
        {task: 'What is your name?'},
        {task: 'How are you?'},
        {task: 'what is you like?'},
        {task: 'Buy'},
        ];

    let elForToDoList = document.querySelector('.toDoList');
    let elBody = document.querySelector('.body');

    let formElement = new CreaterForObjectElement(
        '.body',
        'form',
        '',
        '',
        '',
        '',
        'form',
        '',
        );

    let inputElement = new CreaterForObjectElement(
        '.form',
        'input',
        'onchange',
        'keyDownEnter',
        'onchange',
        'pushEvent(this.value, event)',
        'inputForText',
        '',
    );

    let inputButtonElement = new CreaterForObjectElement(
        '.form',
        'input',
        'type',
        'button',
        'value',
        'submitButton',
        'inputButton',
        'Submit Button',
    );

    let liElement = new CreaterForObjectElement('.toDoList',
        'li',
        'aria-current',
        'true',
        'list-group-item',
    );

    elementCreater(formElement);

    elementCreater(inputElement);

    elementCreater(inputButtonElement);



    function CreaterForObjectElement(dom, element, attribute1, attributeValue1, attribute2, attributeValue2, className, value) {
        this.dom = dom;
        this.element = element;
        this.attribute1 = attribute1 ? attribute1 : null;
        this.attributeValue1 = attributeValue1 ? attributeValue1 : null;
        this.attribute2 = attribute2 ? attribute2 : null;
        this.attributeValue2 = attributeValue2 ? attributeValue2 : null;
        this.className = className;
        this.value = value ? value : null;
    };


    function elementCreater(objectElement){
        let DOMEl = document.querySelector(objectElement.dom);
        let readyElement = document.createElement(objectElement.element);
        readyElement.setAttribute(objectElement.attribute1, objectElement.attributeValue1);
        readyElement.setAttribute(objectElement.attribute2, objectElement.attributeValue2);
        readyElement.classList.add(objectElement.className);
        readyElement.innerHTML = objectElement.value;
        DOMEl.append(readyElement);
        return DOMEl
    };

    function pushEvent(task){
        liElement.value = task;
        elementCreater(liElement);
    };

    document.addEventListener('keydown',(event, task) => {
        if( event.code === 'Enter') {
            event.preventDefault();
            pushEvent(event.target.value);
        }
    });

    toDoList.map((element) => {
        liElement.value = element.task;
        elementCreater(liElement);
    }
    );





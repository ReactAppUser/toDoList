
    const toDoList = [
        {task: 'Hello', id: 'id1',},
        {task: 'What Is Your Name?', id: 'id2',},
        {task: 'How are you?', id: 'id3',},
        {task: 'what is you like?', id: 'id4',},
        {task: 'Buy', id: 'id5'},
        ];

    let elForToDoList = document.querySelector('.toDoList');
    let elBody = document.querySelector('.body');

    let formElement = new CreatorForObjectElement(
        '.body',
        'form',
        [['null', 'null'], ['null', 'null']],
        'form',
        '',
        '',
        );

    let inputElement = new CreatorForObjectElement(
        '.form',
        'input',
        [['onchange', 'keyDownEnter'], ['onchange', 'pushEvent(this.value, event)']],
        'inputForText',
        '',
        '',
    );

    let inputButtonElement = new CreatorForObjectElement(
        '.form',
        'input',
        [['type', 'button'], ['value', 'submitButton']],
        'null',
        'Submit Button',
        '',
    );

    let chckedButtonElement = new CreatorForObjectElement(
        '.form',
        'input',
        [['type', 'button'], ['value', 'CheckedButton']],
        'null',
        'Done checking button',
        '',
    );

    let liElement = new CreatorForObjectElement(
        '.toDoList',
        'li',
        [['aria-current', 'true'], ['null', 'null']],
        `list-group-item`,
        'null',
        '',
    );

    let checkboxElement = new CreatorForObjectElement(
        '.list-group-item',
        'input',
        [['type', 'checkbox'], ['name', 'null'], ['value', 'null']],
        'list-group-item',
        'null',
        '',
    );


    elementCreator(formElement);

    elementCreator(inputElement);

    elementCreator(inputButtonElement);

    elementCreator(chckedButtonElement);





    function CreatorForObjectElement(dom, element, attribute, className, value, id) {
        this.dom = dom;
        this.element = element;
        this.attribute = attribute ? attribute : null;
        this.className = className ? className : null;
        this.value = value ? value : null;
        this.id = id ? id : null;
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
        readyElement.setAttribute("id", objectElement.id);
        readyElement.classList.add(objectElement.className);
        readyElement.innerHTML = objectElement.value;
        DOMEl.append(readyElement);
        return DOMEl
    };

    function checkboxCreator(objectIdElement){
        console.log('objectIdElement',objectIdElement );
        let DOMIdEl = document.getElementById(objectIdElement.dom);
        let readyIdElement = document.createElement(objectIdElement.element);
        let attributeIdArray = objectIdElement.attribute;
        attributeIdArray.forEach(function(attributesStack){
            let attribute = attributesStack[0];
            let attributeValue = attributesStack[1];
            readyIdElement.setAttribute(attribute, attributeValue);
        });
        readyIdElement.classList.add(objectIdElement.className);
        readyIdElement.innerHTML = objectIdElement.value;
        DOMIdEl.append(readyIdElement);
        return DOMIdEl
    };

    function pushEvent(task){
        liElement.value = task;
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
        liElement.value = element.task;
        liElement.id = element.id;
        checkboxElement.dom = element.id;
        elementCreator(liElement);
        checkboxCreator(checkboxElement);
    }
    );










    const toDoList = [
        {task: 'hello'},
        {task: 'What is your name?'},
        {task: 'How are you?'},
        {task: 'what is you like?'},
        {task: 'Buy'},
        ];

    let elForToDoList = document.querySelector('.toDoList');
    let elBody = document.querySelector('.body');

    // let formElement = new CreaterForObjectElement(
    //     '.body',
    //     'form',
    //     '',
    //     '',
    //     '',
    //     '',
    //     'form',
    //     '',
    //     );
    //
    // let inputElement = new CreaterForObjectElement(
    //     '.form',
    //     'input',
    //     'onchange',
    //     'keyDownEnter',
    //     'onchange',
    //     'pushEvent(this.value, event)',
    //     'inputForText',
    //     '',
    // );
    //
    // let inputButtonElement = new CreaterForObjectElement(
    //     '.form',
    //     'input',
    //     'type',
    //     'button',
    //     'value',
    //     'submitButton',
    //     'inputButton',
    //     'Submit Button',
    // );
    //
    // let liElement = new CreaterForObjectElement('.toDoList',
    //     'li',
    //     'aria-current',
    //     'true',
    //     'list-group-item',
    // );


    let formElement = new CreaterForObjectElement(
        '.body',
        'form',
        [['null', 'null'], ['null', 'null']],
        'form',
        '',
        );

    let inputElement = new CreaterForObjectElement(
        '.form',
        'input',
        [['onchange', 'keyDownEnter'], ['onchange', 'pushEvent(this.value, event)']],
        'inputForText',
        '',
    );

    let inputButtonElement = new CreaterForObjectElement(
        '.form',
        'input',
        [['type', 'button'], ['value', 'submitButton']],
        'null',
        'Submit Button',
    );

    let liElement = new CreaterForObjectElement(
        '.toDoList',
        'li',
        [['aria-current', 'true'], ['null', 'null']],
        'list-group-item',
        'null',
    );

    elementCreater(formElement);

    elementCreater(inputElement);

    elementCreater(inputButtonElement);


    //
    // function CreaterForObjectElement(dom, element, attribute1, attributeValue1, attribute2, attributeValue2, className, value) {
    //     this.dom = dom;
    //     this.element = element;
    //     this.attribute1 = attribute1 ? attribute1 : null;
    //     this.attributeValue1 = attributeValue1 ? attributeValue1 : null;
    //     this.attribute2 = attribute2 ? attribute2 : null;
    //     this.attributeValue2 = attributeValue2 ? attributeValue2 : null;
    //     this.className = className;
    //     this.value = value ? value : null;
    // };
    //
    // arr.forEach(function(item, index, array) {
    //     // ... делать что-то с item
    // });



    function CreaterForObjectElement(dom, element, attribute, className, value) {
        this.dom = dom;
        this.element = element;
        this.attribute = attribute ? attribute : null;
        this.className = className;
        this.value = value ? value : null;
    };

    console.log('CreaterForObjectElement', inputElement);

    // this.attribute.forEach(function(attributeItem, index){
    //     let attributeNumber = attributeItem + index;
    //     return this.attribute = attributeNumber ? attributeNumber : null;
    // });
    // this.attributeValue.forEach(function(attributeValueItem, index){
    //     let attributeValueNumber = attributeValueItem + index;
    //     return this.attributeValue = attributeValueNumber ? attributeValueNumber : null;
    // });


    // function elementCreater(objectElement){
    //     let DOMEl = document.querySelector(objectElement.dom);
    //     let readyElement = document.createElement(objectElement.element);
    //     let attributeArray = objectElement.attribute;
    //     attributeArray.forEach(function(attributeItem){
    //         readyElement.setAttribute(attributeItem)});
    //
    //     readyElement.setAttribute(objectElement.attribute1, objectElement.attributeValue1);
    //
    //
    //     readyElement.setAttribute(objectElement.attribute2, objectElement.attributeValue2);
    //     readyElement.classList.add(objectElement.className);
    //     readyElement.innerHTML = objectElement.value;
    //     DOMEl.append(readyElement);
    //     return DOMEl
    // };


    function elementCreater(objectElement){
        // console.log("objectElement", objectElement)
        let DOMEl = document.querySelector(objectElement.dom);
        let readyElement = document.createElement(objectElement.element);
        let attributeArray = objectElement.attribute;
        // console.log("attributeArray", attributeArray);
            attributeArray.forEach(function(attributesStack){
                    // console.log('attributesStack', attributesStack);
                    let attribute = attributesStack[0];
                    // console.log('attribute', attribute);
                    let attributeValue = attributesStack[1];
                    // console.log('attributeValue', attributeValue);
                    readyElement.setAttribute(attribute, attributeValue);
         });
        // console.log('class', objectElement.className)
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





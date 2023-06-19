
    const toDoList = [
        {task: 'Hello', id: '1',},
        {task: 'What Is Your Name?', id: '2',},
        {task: 'How are you?', id: '3',},
        {task: 'What is you like?', id: '4',},
        {task: 'Buy', id: '5'},
        ];

    let toDoCheckedList = [
    ]


    let DuplicateToDoList = toDoList;

    let elForToDoList = document.querySelector('.toDoList');
    let elBody = document.querySelector('.body');
    let checkedButtonElementStatus = false;
    let checkedCheckboxEventStatus = false;
    let checkedCheckboxElement = null;
    let toDoListFirstRender = true;
    let resetButtonStatus = true;


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
        [['type', 'button'], ['value', 'CheckedButton'], ['onclick', 'checkedButtonEvent(event)']],
        'null',
        'Done checking button',
        '',
    );

    let ResetButtonElement = new CreatorForObjectElement(
        '.form',
        'input',
        [['type', 'button'], ['value', 'Reset all checked ToDoList Button'], ['onclick', 'resetButtonEvent(event)']],
        'null',
        'Reset checking button',
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
        [['type', 'checkbox'], ['name', 'null'], ['value', 'null'], ['onchange', 'checkedCheckboxEvent(event)']],
        'list-group-item',
        'null',
        '',
    );


    elementCreator(formElement);

    elementCreator(inputElement);

    elementCreator(inputButtonElement);

    elementCreator(chckedButtonElement);

    elementCreator(ResetButtonElement);





    function resetButtonEvent(event) {
        if (resetButtonStatus) {

            let idForNewResetElement = idGeneratorForAllElements();

            console.log('DuplicateToDoList after', DuplicateToDoList);
            DuplicateToDoList.forEach((element) => {
                console.log('element', element);
                    element.id = (++idForNewResetElement-1);
                    console.log('element.id', element.id);
            });

            mapForToDoList(DuplicateToDoList);
            resetButtonStatus = !resetButtonStatus;
            console.log('DuplicateToDoList before', DuplicateToDoList);
        }

    };




     function checkedCheckboxEvent(event) {

        let checkedStatus = event.target.checked;

         console.log('checked', checkedStatus);
         console.log('checkedCheckboxEventStatus event target', event);
         console.log('checkedCheckboxEventStatus event', event.target.id.slice(3));
         console.log('checkedCheckboxEventStatus before', checkedCheckboxEventStatus);


         if(checkedStatus = true){
             checkedCheckboxEventStatus = true;



             console.log('checkedCheckboxEvent toDoList', toDoList);

             let checkedIdElement = event.target.id.slice(3);
             checkedCheckboxElement = checkedIdElement;
             // console.log('checkedIdElement', checkedIdElement);



             toDoList.map((element) => {

                 if(element.id == checkedIdElement) {
                     toDoCheckedList.push(element);

                     console.log('toDoCheckedList', toDoCheckedList);

                 };
                        // console.log('tooDoList Element', element);
                        // console.log('checkedIdElement', checkedIdElement);
                 }
             )

         }
         console.log ('checkedCheckboxEventStatus after', checkedCheckboxEventStatus);

         return checkedStatus;
    }

    function checkedButtonEvent(event) {
        console.log('checkedButtonElementStatus Start', checkedButtonElementStatus);
        // console.log('checkedButtonElementStatus event', event);
        if(checkedButtonElementStatus == false) {
            checkedButtonElementStatus = !checkedButtonElementStatus;
        }


        console.log('checkedButtonElementStatus CheckedButton active TRUE', checkedButtonElementStatus);

        if(checkedCheckboxEventStatus && checkedButtonElementStatus ) {

            // let toDoCheckedListSplice = toDoCheckedList.splice((Number(element.id) - 1), 1 );
            // console.log('toDoCheckedList.splice', toDoCheckedListSplice);



            //
            // toDoList.map((element) => {
            //     if(element.id == checkedCheckboxElement) {
            //
            //
            //         console.log('checkedCheckboxElement', checkedCheckboxElement);
            //         console.log('element', element);
            //
            //
            //        // let toDoListChecked = toDoList.splice((Number(element.id) - 1), 1 );
            //        //  toDoCheckedList.push(toDoListChecked);
            //         let checkedElement = document.getElementById(checkedCheckboxElement);
            //         console.log('checkedElement', checkedElement);
            //         checkedElement.remove();
            //         console.log('toDoCheckedList', toDoCheckedList);
            //         console.log('toDoList', toDoList);
            //         checkedButtonElementStatus = !checkedButtonElementStatus;
            //     }
            // });


            toDoCheckedList.map((element) => {
                console.log('toDoCheckedList ELEMENT', element);
                let toDoCheckedListCheckedElement = document.getElementById(element.id);
                console.log('toDoCheckedListCheckedElement ELEMENT', toDoCheckedListCheckedElement);
                toDoCheckedListCheckedElement.remove();
                checkedButtonElementStatus = !checkedButtonElementStatus;
                console.log('toDoCheckedList', toDoCheckedList);
                toDoCheckedList = [];
                console.log('toDoCheckedList after Splice', toDoCheckedList);
            })

            console.log('cool', 'CooL');

            toDoListFirstRender = false;
            // window.location.reload()

        }

        console.log('checkedButtonElementStatus Final', checkedButtonElementStatus);
    }


    function CreatorForObjectElement(dom, element, attribute, className, value, id, name) {
        this.dom = dom;
        this.element = element;
        this.attribute = attribute ? attribute : null;
        this.className = className ? className : null;
        this.value = value ? value : null;
        this.id = id ? id : null;
        this.name = name ? name : null;
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
        readyIdElement.setAttribute("name", objectIdElement.name);
        readyIdElement.setAttribute("value", objectIdElement.value);
        readyIdElement.setAttribute('id', `${'Id/' + objectIdElement.id}`)
        readyIdElement.classList.add(objectIdElement.className);
        readyIdElement.innerHTML = objectIdElement.value;
        DOMIdEl.append(readyIdElement);
        return DOMIdEl
    };


    function idGeneratorForAllElements(){

        let idIterator = 5;
        let mimNumberForGeneratorCount = 4;

        let idIteratorIncrement = function(number){
            return number;
        };
        while(idIterator <= Number(toDoList.length)||idIterator < mimNumberForGeneratorCount) {
            ++idIterator
        };

        let idGenerator = `${idIteratorIncrement(idIterator)}`;
        console.log('idIteratorIncrement' , idIteratorIncrement(idIterator));

        return idGenerator
    }
    
    /*Added from Ssh*/

    document.addEventListener('keydown',(event) => {
        if( event.code === 'Enter') {
            event.preventDefault();
            pushEvent(event.target.value);
        }
    });

    function pushEvent(task, event){

        console.log('task', task);
        console.log('taskEvent', event.target.value);

        let GeneratedIdForNewElement = idGeneratorForAllElements();

        liElement.value = task;
        liElement.id = GeneratedIdForNewElement;
        toDoList.push({task: task, id: GeneratedIdForNewElement});
        checkboxElement.dom = GeneratedIdForNewElement;
        checkboxElement.id = GeneratedIdForNewElement;
        checkboxElement.value = task;
        checkboxElement.name = task;
        elementCreator(liElement);
        checkboxCreator(checkboxElement);
        console.log('toDoList', toDoList.length);
        event.target.value = '';
    };




function mapForToDoList(array) {
    array.map((element) => {
        // console.log('element', element);
        liElement.value = element.task;
        liElement.id = element.id;
        checkboxElement.dom = element.id;
        checkboxElement.value = element.task;
        checkboxElement.name = element.task;
        checkboxElement.id = checkboxElement.dom;
        elementCreator(liElement);
        checkboxCreator(checkboxElement);
    }
    )
};

    mapForToDoList(toDoList);








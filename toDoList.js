    const toDoList = [
        {task: 'hello'},
        {task: 'What is your name?'},
        {task: 'How are you?'},
        {task: 'what is you like?'},
        {task: 'Buy'},
        ];

    console.log('toDoList', toDoList);

    let elForToDoList = document.querySelector('.toDoList');

   toDoList.map((element) => {
        let liEl = document.createElement('li');
        liEl.innerHTML = element.task;
        liEl.classList.add('list-group-item');
        elForToDoList.append(liEl);
       }
    );

   let liInput = document.createElement('input');
    elForToDoList.append(liInput);

    console.log('elForToDoList', elForToDoList);

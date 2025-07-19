const formElement = window.document.querySelector('#task')
let arrayTasks = []

formElement.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputElement = window.document.querySelector('input[name="task"]')

    if (!inputElement || !inputElement.value.trim()) return

    const objTask = {
        id: crypto.randomUUID(),
        text: inputElement.value.trim(),
        done: false,
    }

    arrayTasks.push(objTask)

    inputElement.value = ''

    renderTasks(arrayTasks)
})

function renderTasks(arr) {
    arr.forEach((task => {
        const id = window.document.getElementById(task.id)
        if(!id) {
        const taskList = window.document.querySelector('#taskList');
        let li = window.document.createElement('li');
        li.id = task.id;
        li.classList.add('taskLi');
        const contentDiv = window.document.createElement('div');
        contentDiv.classList.add('content');

        const textP = window.document.createElement('p');
        textP.classList.add('textTask');
        textP.textContent = task.text;

        const buttonRemove = window.document.createElement('button');
        buttonRemove.textContent = 'Удалить';
        buttonRemove.addEventListener('click', () => removeTask(task.id))

        const buttonDone = window.document.createElement('button')
        buttonDone.textContent = 'Завершить'
        buttonDone.classList.add('cancel')
        buttonDone.addEventListener('click', () => {
            doneTask(task.done, task.id)
        })

        contentDiv.append(textP, buttonRemove, buttonDone)
        li.append(contentDiv)

        taskList.append(li)
        }
    }))
}

function doneTask(done, id) {
    const taskComplete = arrayTasks.find(elem => elem.id === id)
    const task = window.document.getElementById(id)
    if (!task || !taskComplete) return
    const taskButton = task.querySelector('.content .cancel')
    if (done) {
        taskComplete.done = false;
        taskButton.textContent = 'Завершить'
        task.classList.replace('taskComplete', 'taskLi')
        
    } else if (taskComplete) {
        taskComplete.done = true;
        taskButton.textContent = 'Отмена'
        task.classList.replace('taskLi', 'taskComplete')
        
    }
}

function removeTask(taskId) {
    arrayTasks = arrayTasks.filter(elem => elem.id !== taskId)
    document.getElementById(`${taskId}`)?.remove()
}
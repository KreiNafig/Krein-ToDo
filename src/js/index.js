import { removeTask, doneTask } from './modules/actions.js'
import { listOfTasks } from './modules/render.js'

const formElement = window.document.querySelector('#task')
let arrayTasks = []

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputElement = window.document.querySelector('input[name="task"]')
    const inputValue = inputElement.value
    const inputErrorMessage = inputElement.parentElement.children
    if (!inputValue || !inputValue.trim()) return
    if (inputValue.length >= 3) {
        inputErrorMessage.namedItem('length').style.display = 'none';
    } else {
        inputErrorMessage.namedItem('length').style.display = 'block';
        return
    }
    const objTask = {
        id: crypto.randomUUID(),
        text: inputElement.value.trim(),
        done: false,
    }
    arrayTasks.push(objTask)
    listOfTasks(arrayTasks)
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
        buttonRemove.addEventListener('click', () => {
            arrayTasks = removeTask(task.id, arrayTasks)
        })

        const buttonDone = window.document.createElement('button')
        buttonDone.textContent = 'Завершить'
        buttonDone.classList.add('cancel')
        buttonDone.addEventListener('click', () => {
            arrayTasks.done = doneTask(task.done, task.id, arrayTasks)
        })

        contentDiv.append(textP, buttonRemove, buttonDone)
        li.append(contentDiv)

        taskList.append(li)
        }
    }))
}

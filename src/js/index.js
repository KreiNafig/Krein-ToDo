import { removeTask, doneTask } from './modules/actions.js'
import { listOfTasks } from './modules/render.js'
import { saveTasks, loadTasks } from './modules/storage.js'

const formElement = window.document.querySelector('#task')
let arrayTasks = loadTasks()
renderTasks(arrayTasks)
listOfTasks(arrayTasks)
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
    saveTasks(arrayTasks)
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
        task.done ? li.classList.add('taskComplete') : li.classList.add('taskLi');
        const contentDiv = window.document.createElement('div');
        contentDiv.classList.add('content');
        
        const textP = window.document.createElement('p');
        textP.classList.add('textTask');
        textP.textContent = task.text;

        const buttonRemove = window.document.createElement('button');
        buttonRemove.textContent = 'Удалить';
        buttonRemove.addEventListener('click', () => {
            arrayTasks = removeTask(task.id, arrayTasks)
            document.getElementById(`${task.id}`)?.remove()
            listOfTasks(arrayTasks)
            saveTasks(arrayTasks)
        })

        const buttonDone = window.document.createElement('button')
        task.done ? buttonDone.textContent = 'Отмена' : buttonDone.textContent = 'Завершить'
        buttonDone.classList.add('cancel')
        buttonDone.addEventListener('click', () => {
            let taskIndex = arrayTasks.findIndex(e => e.id === task.id)
            let updateTask = doneTask(arrayTasks[taskIndex])
            arrayTasks[taskIndex] = updateTask
            saveTasks(arrayTasks)
            li.classList.toggle('taskComplete', updateTask.done);
            li.classList.toggle('taskLi', !updateTask.done);
            updateTask.done ? buttonDone.textContent = 'Отмена' : buttonDone.textContent = 'Завершить'
        })

        contentDiv.append(textP, buttonRemove, buttonDone)
        li.append(contentDiv)

        taskList.append(li)
        }
    }))
}
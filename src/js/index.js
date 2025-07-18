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

    renderTasks(objTask)
})

function renderTasks(task) {
    const taskList = window.document.querySelector('#taskList')

    let li = window.document.createElement('li')

    li.id = task.id
    li.classList.add('taskLi')
    li.innerHTML = `
        <div class="content">
            <p>${task.text}</p>
            <button onClick="removeTask('${task.id}')">Удалить</button>
        </div>
    `

    taskList.append(li)
}

function removeTask(taskId) {
    arrayTasks = arrayTasks.filter(elem => elem.id !== taskId)

    document.getElementById(`${taskId}`)?.remove()
}
import { listOfTasks } from "./render.js"

export function removeTask(taskId, arr) {
    arr = arr.filter(elem => elem.id !== taskId)
    document.getElementById(`${taskId}`)?.remove()
    listOfTasks(arr)
    return arr
}



export function doneTask(done, id, arrayTasks) {
    const taskComplete = arrayTasks.find(elem => elem.id === id)
    const task = window.document.getElementById(id)
    if (!task || !taskComplete) return
    const taskButton = task.querySelector('.content .cancel')
    if (done) {
        taskButton.textContent = 'Завершить'
        task.classList.replace('taskComplete', 'taskLi')
        return taskComplete.done = false;
        
    } else if (taskComplete) {
        taskButton.textContent = 'Отмена'
        task.classList.replace('taskLi', 'taskComplete')
        return taskComplete.done = true;
    }
}
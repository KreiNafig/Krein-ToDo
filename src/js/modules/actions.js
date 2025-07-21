import { listOfTasks } from "./render.js"

export function removeTask(taskId, arr) {
    arr = arr.filter(elem => elem.id !== taskId)
    document.getElementById(`${taskId}`)?.remove()
    listOfTasks(arr)
    saveTasks(arr)
    return arr
}



export function doneTask(done, id, arrayTasks) {
    const task = arrayTasks.find(task => task.id === id)

    if(task) {
        task.done = !done
    }
    return arrayTasks
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
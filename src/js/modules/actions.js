export function removeTask(taskId, arr) {
    let array = arr.filter(elem => elem.id !== taskId)
    return array
}


export function doneTask(task) {
    return {...task, done: !task.done}
}

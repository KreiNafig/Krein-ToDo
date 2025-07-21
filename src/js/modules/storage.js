const localStorage = window.localStorage

export function loadTasks() {
    const tasks = localStorage.getItem('tasks')
    return tasks ? JSON.parse(tasks) : []
}

export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

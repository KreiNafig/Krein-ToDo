export function listOfTasks(arr) {
    const taskClear = window.document.getElementById('clear')
    if (arr.length !== 0) {
        taskClear.style.display = "none"
    } else {
        taskClear.style.display = "block"
    }
}

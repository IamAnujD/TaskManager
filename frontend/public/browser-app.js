const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
let param = document.URL.split('/')
// Load tasks from /api/tasks


const showTasks = async () => {
  const emailId = param[param.length-1]
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get(`http://localhost:4000/api/v1/tasks/${emailId}`)
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks
      .map((task) => {
        var d1 = new Date(); var d;
        var colour='black';
        const { completed, _id: taskID, name, deadline, priority, reminder } = task 
        if(deadline) {d= new Date(deadline)
        if(d.getMonth()===d1.getMonth() && d.getFullYear() ===d1.getFullYear() && d.getDate()===d1.getDate()) colour='yellow'
        else if(d.getFullYear()<=d1.getFullYear()){
          if(d.getMonth()<=d1.getMonth()){
            if(d.getDate()<d1.getDate()) colour='red'
            else colour='green'
          }
          else colour='green'
        }
        else colour='green'}
        return `<div class="single-task ${completed && 'task-completed' }">
<h5 color=${colour}><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">
<!-- edit link -->
<a href="http://localhost:4000/task/${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/one/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value
  const emailId = param[param.length-1]
  try {
    await axios.post(`http://localhost:4000/api/v1/tasks/${emailId}`,{
      name: name,
      completed: false,
      priority: 0,
      deadline: new Date(),
      reminder: false
    })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 4000)
})

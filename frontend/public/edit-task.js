const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const taskReminderDOM = document.querySelector('.task-edit-reminder')
const taskDeadlineDOM = document.querySelector('.task-edit-deadline')
const taskPriorityDOM = document.querySelector('.task-edit-priority')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = document.URL.split("/")
const id = params[params.length-1]
let tempName

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/one/${id}`)
    const { _id: taskID, completed, name, priority, deadline, reminder } = task
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    if(reminder) taskReminderDOM.checked=true
    if(priority) taskPriorityDOM.value = priority
    if(deadline){ 
      const d  = new Date(deadline);
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();

       if (month.length < 2) 
        month = '0' + month;
       if (day.length < 2) 
        day = '0' + day;
        const finalDate =  year+ '-'+ month + '-'+ day;
      taskDeadlineDOM.value= (finalDate) ; }

    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskPriority = taskPriorityDOM.value
    const taskDeadline = taskDeadlineDOM.value
    const taskCompleted = taskCompletedDOM.checked
    const taskReminder = taskReminderDOM.checked

    const {
      data: { task },
    } = await axios.put(`/api/v1/tasks/one/${id}`, {
      name: taskName,
      completed: taskCompleted,
      priority: taskPriority,
      deadline: taskDeadline,
      reminder: taskReminder,
    })

    const { _id: taskID, completed, name, priority, deadline, reminder } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    if(priority) taskPriorityDOM.value = priority
       if(deadline){ 
      const d  = new Date(deadline);
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();

       if (month.length < 2) 
        month = '0' + month;
       if (day.length < 2) 
        day = '0' + day;
        const finalDate =  year+ '-'+ month + '-'+ day;
      taskDeadlineDOM.value= (finalDate) ; }
      if(reminder) taskReminderDOM.checked=true
      
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 4000)
})

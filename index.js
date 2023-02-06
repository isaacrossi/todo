const taskInput = document.querySelector('.task__input')
const addButton = document.querySelector('.button__add')
const tasks = document.querySelector('.task__holder')
const form = document.querySelector('form')

const taskList = JSON.parse(localStorage.getItem('items')) || [];


function createTask(e) {

  e.preventDefault()

  const name = taskInput.value

  const task = {
    taskName: name,
    done: false
  }

  if (name == null || name == "") {
    return
  } else {
    taskList.push(task)
    populateList(taskList)
  }

  localStorage.setItem('items', JSON.stringify(taskList))

  form.reset()
}


function populateList(list = []) {

  tasks.innerHTML = list.map((item, i) => {
    return `
      <li>
        <input class="checkbox" type="checkbox" data-index=${i} ${item.done ? 'checked' : ''} />
        <label>${item.taskName}<span><img src="/trash.svg" data-index=${i}></span></label>
      </li>
    `;
  }).join('');

}

function deleteTask(e) {

  const target = e.target.closest("img");

  if(target){
    const index = target.dataset.index
    taskList.splice(index, 1)
    localStorage.setItem('items', JSON.stringify(taskList))
    populateList(taskList)
  }
}

function toggleDone(e) {
  console.log(e.target)
  if (!e.target.matches('input')) return
  const el = e.target
  const index = el.dataset.index
  taskList[index].done = !taskList[index].done;
  localStorage.setItem('items', JSON.stringify(taskList));
  populateList(taskList);
}

populateList(taskList)


document.addEventListener("click", deleteTask)
addButton.addEventListener('click', createTask)
tasks.addEventListener("click", toggleDone)





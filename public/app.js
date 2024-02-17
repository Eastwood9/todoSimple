const deleteBtns = [...document.querySelectorAll('.delete')]
const completeBtns = [...document.querySelectorAll('.complete')]
const uncompleteBtns = [...document.querySelectorAll('.uncomplete')]

deleteBtns.forEach(el => {
  el.addEventListener('click', deleteTask)
})
completeBtns.forEach( el => {
  el.addEventListener('click', completeTask)
})
uncompleteBtns.forEach( el => {
  el.addEventListener('click', uncompleteTask)
})

async function deleteTask () {
  const taskName = this.parentNode.childNodes[1].innerText

  try {
    const response = await fetch('deleteTask', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'task': taskName
      })
    })

    const data = await response.json()
    console.log(data)
    location.reload()

  } catch (err) {
    console.error(err)
  }
}

async function completeTask () {
  const taskName = this.parentNode.childNodes[1].innerText

  try {
    const response = await fetch('/markComplete', {
      method: 'put',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        'task': taskName
      })
    })

    const data = await response.json()
    console.log(data)
    location.reload()
    
  } catch (err) {
    console.error(err)
  }
}

async function uncompleteTask () {
  const taskName = this.parentNode.childNodes[1].innerText

  try {
    const response = await fetch('/markUncomplete', {
      method: 'put',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        'task': taskName
      })
    })

    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.error(err)
  }
}
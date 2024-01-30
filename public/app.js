const deleteBtn = [...document.querySelectorAll('.deleteBtn')]

deleteBtn.forEach( el => {
  el.addEventListener('click', deleteTask)
})

async function deleteTask () {
  const taskName = this.parentNode.childNodes[1].innerText

  try {
    const response = await fetch('deleteTask', {
      method: 'delete',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        'task': taskName
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
    
  } catch (err) {
    console.log(err)
  }
}
const userName = document.getElementById('userName')
const submitUN = document.getElementById('submitUN')
const output = document.getElementById('output')
const newItem = document.newItem 

// Part 1 - GET

// The user can see their current list of todo's.
// Todo's show up as soon as the page loads.
// If a todo item is complete, it should have a strikethrough line on it
// Images should be displayed as images if there are any

submitUN.addEventListener('click', login)
function login(){
    dataLoad()
}
function dataLoad() {
    output.innerHTML = ("")
    axios.get(`http://api.bryanuniversity.edu/${userName.value}/list`)
    .then(response => {
        for (let i=0; i < response.data.length; i++) {
            const h3 = document.createElement('h3')
            const completeCheck = document.createElement('input')
            completeCheck.setAttribute('onchange', 'completeUpdate(this)')
            completeCheck.type = 'checkbox'
            completeCheck.id = response.data[i]._id
            h3.appendChild(completeCheck)
            const deleteButton = document.createElement('button')
            deleteButton.innerHTML = 'delete'
            deleteButton.setAttribute('onclick', 'deleteItem(this)')
            deleteButton.id = response.data[i]._id
            h3.innerHTML +=(
                '  $' + response.data[i].price + '  ' +
                response.data[i].name + ' - ' +
                response.data[i].description + '  '
            )
            if (response.data[i].isComplete == true) {
                h3.style.textDecoration = "line-through"
            }
            if (response.data[i]) {
            }
            const update = document.createElement('button')
            update.innerHTML = 'Update'
            update.setAttribute('onclick', 'updateItem(this)')
            h3.appendChild(update)
            h3.appendChild(deleteButton)
            output.appendChild(h3)
        }
    })
    .catch(error => console.log(error))
    document.getElementById('header').innerHTML = `Welcome to your To-Do list ${userName.value}`
    addPostUI()
    userName.style.display = "none"
    submitUN.style.display = "none"
}

// Part 2 - POST

// The user can add new todo's to their list. The new item should be posted to the todo API so a future 
//  reload of the page will still display that new todo item. Making the new todo appear without a 
//  refresh is extra credit, but you're encouraged to attempt it.
// A user should be able to give the item a title.
// A user should be able to give the item a price.
// A user should be able to give the item a description.

function addPostUI(){
    newItem.style.display = ''
    newItem.addEventListener('submit', post)
}

function post(e){
    e.preventDefault()
    
    const newToDo = {
        name: newItem.title.value,
        price: newItem.price.value,
        description: newItem.description.value,
    }
    axios.post(`http://api.bryanuniversity.edu/${userName.value}/list`, newToDo)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    setTimeout(dataLoad, 1000)
}

// Part 3 - PUT Part 1

// Each todo will have a checkbox where it can be marked complete or incomplete. 
// Checking the checkbox should update the database. 

function completeUpdate(x) {
    itemID = x.id
    const completionUpdate = {
        isComplete: true
    }

    axios.put(`http://api.bryanuniversity.edu/${userName.value}/list/${itemID}`, completionUpdate)

    setTimeout(dataLoad, 1000)
};

// Part 4 - DELETE

// A user will be able to delete todo's (this is different from marking a todo as “completed”)
// Each todo should be rendered with a button marked “X” or “Delete” that when clicked, will delete the Todo.

function deleteItem(x) {

    itemID = x.id
    console.log(itemID)
    axios.delete(`http://api.bryanuniversity.edu/${userName.value}/list/${itemID}`)

    setTimeout(dataLoad, 1000)
};

// Part 5 - PUT Part 2 (extra credit)

// Each Todo will have an "edit" button.
// When clicked, the info will change to input boxes that are auto-filled with the old Todo data
// A user can change the value of these inputs
// When the "edit" button is clicked, it will change to a "save" button.
// When "save" is clicked, the form will disappear, and the new values will be displayed.
// On save, the todo will be edited in the database

function updateItem (x) {
    console.log('still working this out')
}
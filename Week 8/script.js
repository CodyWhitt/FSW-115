const userName = document.getElementById('userName')
const submitUN = document.getElementById('submitUN')
const output = document.getElementById('output')
const newItem = document.newItem 

function jediNumber(max) {
    return Math.floor(Math.random() * max)
}

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
            // h3.appendChild(update)
            h3.appendChild(deleteButton)
            let jediHelper = jediNumber(84)
            axios.get(`https://swapi.dev/api/people/${jediHelper}`)
            .then(response => {
                h3.innerHTML += `  ${response.data.name}`
            })
            output.appendChild(h3)
        }
    })
    .catch(error => console.log(error))
    document.getElementById('header').innerHTML = `Welcome to your To-Do list ${userName.value} 
        <br> When you submit a new todo item you will have a random Jedi assignment to help you with your task.`
    addPostUI()
    userName.style.display = "none"
    submitUN.style.display = "none"
}

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

function completeUpdate(x) {
    itemID = x.id
    const completionUpdate = {
        isComplete: true
    }

    axios.put(`http://api.bryanuniversity.edu/${userName.value}/list/${itemID}`, completionUpdate)

    setTimeout(dataLoad, 1000)
};

function deleteItem(x) {

    itemID = x.id
    console.log(itemID)
    axios.delete(`http://api.bryanuniversity.edu/${userName.value}/list/${itemID}`)

    setTimeout(dataLoad, 1000)
};

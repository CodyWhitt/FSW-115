// Part 1 - GET

// The user can see their current list of todos.
// Todos show up as soon as the page loads.
// If a todo item is complete, it should have a strikethrough line on it
// Images should be displayed as images if there are any

userName = document.getElementById('userName')
submitUN = document.getElementById('submitUN')
submitUN.addEventListener('click', login)
function login(){
    dataLoad()
}
function dataLoad() {
    output.innerHTML = ("")
    axios.get(`http://api.bryanuniversity.edu/${userName.value}/list`)
    .then(response => {
        for (let i=0; i < response.data.length; i++) {
            const h1 = document.createElement('h1')
            h1.textContent=response.data[i].name
            if (response.data[i].isComplete == true) {
                h1.style.textDecoration = "line-through"
            }
            if (response.data[i]) {

            }
            document.getElementById('output').appendChild(h1)
        }
    })
    .catch(error => console.log(error))
}

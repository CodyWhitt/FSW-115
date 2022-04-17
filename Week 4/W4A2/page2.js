// Getting Started
// This website needs to have at least 2 pages, where each page presents a button
// When the button is clicked, an axios.get request will go to an API of the students choosing and have the response data show up as a list on the HTML page.
// Must be fully styled - responsive
// 2 APIs must be used, (one for each page)

button = document.getElementById('button')
button.addEventListener('click', dataLoad)

function dataLoad() {
    //output.innerHTML = ("")
    axios.get(`https://pokeapi.co/api/v2/pokemon`)
    .then(response => {
        console.log(response.data)
        for (let i=0; i < response.data.results.length; i++) {
            const h1 = document.createElement('h1')
            h1.textContent= response.data.results[i].name
            document.getElementById('output').appendChild(h1)
        }
    })
    .catch(error => console.log(error))
}

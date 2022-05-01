
const getData = async () => {
    try {
        const allData = await axios.get("https://swapi.dev/api/")
        const people = await axios.get(allData.data.people)
        const planets = await axios.get(allData.data.planets)
        const starships = await axios.get(allData.data.starships)
        displayData(people.data.results , planets.data.results , starships.data.results)
    } catch(error) {
        console.log(error)
    }
}

getData()

function displayData(x, y, z){
    for (i=0; i < x.length; i++){
        const h1 = document.createElement('h1')
        h1.textContent = x[i].name
        document.body.appendChild(h1)
    }
    for (i=0; i < y.length; i++){
        const h2 = document.createElement('h2')
        h2.textContent = y[i].name
        document.body.appendChild(h2)
    }
    for (i=0; i < z.length; i++){
        const h3 = document.createElement('h3')
        h3.textContent = z[i].name
        document.body.appendChild(h3)
    }
}
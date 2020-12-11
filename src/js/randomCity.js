export {randomCity}

let randomCity = () => {
    let apiCity = `https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json`
    fetch(apiCity) 
        .then(response  => response.json()) 
            .then(data => {
            
            // get (random) array out of object 
            let randomArray = Object.values(data)[Math.floor(Math.random()*(Object.keys(data).length))]

            // get random index out of array
            let randomIndex = Math.floor(Math.random()*randomArray.length)
            document.querySelector(".city").value = randomArray[randomIndex]
            getWeather();
        })
}
  

export {getWeather}

let array = [];



let getWeather = () => {
    let cityName = document.querySelector(".city").value;
    const key = "e83c0d271e5edc4f99d6d218e446d655";
    let api = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`;
    

    //fetch data
    fetch(api)
        .then(response => response.json()) 
            .then(data => {
                
                let temperatureNow = (data.list[array.length].main.temp -273);
                let cloudsNow = (data.list[Number(array.length)].clouds.all);
                let windspeedNow = (data.list[Number(array.length)].main.temp_max - 273);
                
                //to get time data 
                let timeZoneHour = Number((data.city.timezone)-3600) / 3600;
                let cityTimeZoneHour = new Date().getHours() + timeZoneHour;

                // put data into HTML
                document.getElementById("date").innerHTML = "in "+ cityName + ", "  + data.city.country + " it now is " + cityTimeZoneHour +"'o clock " ;
                document.getElementById("temperatureNow").innerHTML = "Outside temperature is " + "<strong>" + temperatureNow.toFixed(2) + " </strong>"+ "°C!";
                document.getElementById("cloudsNow").innerHTML ="The sky is covered for " + "<strong>"+cloudsNow +"</strong>"+ "% with clouds." ;
                document.getElementById("windspeedNow").innerHTML ="You can expect windspeed at " + "<strong>"+(windspeedNow *3.6).toFixed(2) +"</strong> km/h";
                console.log("werkt et???")
            })
        } 
    
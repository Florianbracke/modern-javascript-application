 export {graph}

let graph = (arraydata,arrayYaxis,arrayXaxis) => { 
    
    //variables 
    let cityName = document.querySelector(".city").value;
    const key = "e83c0d271e5edc4f99d6d218e446d655";
    let api = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`;
    
    //fetch data
    fetch(api) .then(response => response.json()) .then(data => {
                let i = "";

                    //prepare arrays for X- & Y-axis
                    arraydata= [];
                        for (i = 0; i < 40; i+=2) {
                        arraydata.push(Math.floor(Number(data.list[i].main.temp)-273))
                    }arrayYaxis= [];
                        for (i = -15; i < 40; i++) {
                            arrayYaxis.push(i)     
                    }arrayXaxis=[];
                        for (i = 0; i < 40; i+=2) {
                      arrayXaxis.push(data.list[i].dt_txt)}
                     // arrayXaxis.push(timeZoneHours)}

                        //graph data + styling
                        var ctx = document.getElementById("myChart");
                        
                        var myChart = new Chart(ctx, {
                            type: 'line', 
                            data: {
                                labels: arrayXaxis,
                                datasets: [{
                                    data: arraydata,
                                    borderWidth: 1,
                                    backgroundColor: "gold",
                                    label: "temperature",
                                    borderColor: "white",
                                    color: "white",
                                    fill: false }]},
                            options: {
                            layout: {
                                padding: {
                                    left: 50,
                                    right: 50,
                                    top: 50,
                                    bottom: 100
                            }},  
                            scales: {
                                xAxes: [{
                                    display: false,
                                    gridLines: {
                                        drawOnChartArea: false,
                                        tickMarkLength: false,
                                        drawBorder: false,
                                        
                                    }
                                }],
                                yAxes: [{
                                    display: true, 
                                }],
                            },

                            legend: {
                                display: false
                            },
                        }
                                         
                                  
                            
                        });
            }) 
}


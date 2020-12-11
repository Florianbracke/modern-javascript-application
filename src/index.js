//TODO: function accordion

    import { getWeather } from "./../src/js/getWeather.js";
    import { randomCity } from "./../src/js/randomCity.js";
    import { graph } from "./../src/js/graph.js";
    //import { addThreeHours } from "./addThreeHours.js";
    //import { minusThreeHours } from "./minusThreeHours.js";
    import { backgroundPicture } from "./../src/js/backgroundPicture.js";

    // calling functions


   backgroundPicture();

    document.querySelector("#run").addEventListener("click", () => {
        getWeather(); 
        graph();   
    }) 

    document.querySelector("#run3").addEventListener("click", () => {
        randomCity();
        getWeather();  
        graph();
    }) 

    // document.querySelector("#run1").addEventListener("click", () => {
    //     minusThreeHours();
    //     getWeather();   
    // })
    // document.querySelector("#run2").addEventListener("click", () => {
    //     addThreeHours(); 
    //     getWeather(); 
    // }) 
    

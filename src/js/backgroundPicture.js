export {backgroundPicture}
let i=[];
let timer = 12000;

let backgroundPicture = () => {

    document.querySelector("body").style.background=`url(./../src/css/images/sunnycold.jpg)`
    document.querySelector("body").style.backgroundSize = "cover" 
    
        setInterval(function(){
            if (i.length < 9)
                {i.push("Supercalifragilisticexpialidocious")
            } else if (i.length = 9){
                document.querySelector("body").style.background=`url(./../src/css/images/sunnycold  .jpg)`;
                document.querySelector("body").style.backgroundSize = "cover" ;
            }
            document.querySelector("body").style.background=`url(./../src/css/images/${i.length}.jpg)`;
            document.querySelector("body").style.backgroundSize = "cover" ;
        }, timer);

}

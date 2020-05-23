var modes = document.querySelectorAll(".modes");

var gameMode = "hard";
var gameOver = false;

var res = document.getElementById("result");
newGame();

function getRandomPos(gameMode){


    if(gameMode === "easy"){

        var p = Math.floor(Math.random()*3);
        if(p==3)
            p =2;
        return p;

    }

    if(gameMode === "hard"){

        var p = Math.floor(Math.random()*6);
        if(p==6)
            p =5;
        return p;

    }

}

function makeRandomColors(gameMode){

    var colors = [];
    var count;
    if(gameMode === "easy")
        count = 3;

    if(gameMode === "hard")
        count = 6;


    for(var i=0; i<count; i++){

        colors[i] = "rgb(";
        colors[i] += Math.floor(Math.random()*255);
        colors[i]+=",";
        colors[i] += Math.floor(Math.random()*255);
        colors[i]+=",";
        colors[i] += Math.floor(Math.random()*255);
        colors[i] += ")";
    }

    return colors;
}

function playGame(pos, colors){

    var count;
    if(gameMode === "easy")
        count = 3;

    else
        count = 6;

    var buttons = document.querySelectorAll(".boxc");
    

    for(var i=0; i<count; i++){

        if(i!=pos){

            buttons[i].addEventListener("click", function(){

            if(!gameOver){
                
                    if(!this.classList.contains("color-clicked")){
                        
                        this.classList.add("color-clicked");
                        this.style.background = "rgb(20,20,20)";
                        res.textContent = "Try Again!!";

                    }
                }

            });

        }

    }

    buttons[pos].addEventListener("click", function(){

        document.querySelector("#heading").style.background = colors[pos];
        for(var i=0; i<count; i++){

            buttons[i].style.background = colors[pos];

        }

        res.textContent = "Correct!";
        gameOver = true;

    })
        
}

function setColors(gameMode){

    if(gameMode==="easy")
        modes[0].classList.add("clicked");
    else
        modes[1].classList.add("clicked");

    var pos;
    var buttons = document.querySelectorAll(".boxc");
    pos = getRandomPos(gameMode);
    var colors = makeRandomColors(gameMode);

    buttons[pos].style.background = colors[pos];

    for(var i=0; i<buttons.length; i++){

        if(i!=pos){

            buttons[i].style.background = colors[i];

        }

    }

    var choice = document.getElementById("choice");
    choice.textContent = colors[pos];

    playGame(pos, colors);

}

function makeGrid(gameMode){

    var cont = document.querySelector("#colours");
    
    while(cont.firstChild){

        cont.removeChild(cont.firstChild);

    }

    if(gameMode == "hard")
    {
        for(var i=0; i<6; i++){

            var d = document.createElement("div");
            d.classList.add("boxc");
            cont.appendChild(d);

        }

    }
    else{

        for(var i=0; i<3; i++){

            var d = document.createElement("div");
            d.classList.add("boxc");
            cont.appendChild(d);

        }

    }

}


function newGame(){

    res.textContent = '';
    document.querySelector("#heading").style.background = "#3A75AC";
    gameOver = false;
    makeGrid(gameMode);
    setColors(gameMode);

}



var newG = document.querySelector("#newc");
newG.addEventListener("click", function(){

    newGame();

})

modes[0].addEventListener("click", function(){

    if(!modes[0].classList.contains("clicked"))
    {
        modes[1].classList.remove("clicked");
        
        modes[0].classList.add("clicked");
        gameMode = "easy";
        newGame();
    }

});

modes[1].addEventListener("click", function(){

    if(!modes[1].classList.contains("clicked"))
    {
        modes[0].classList.remove("clicked");
        
        modes[1].classList.add("clicked");
        gameMode = "hard";
        newGame();
    }

});
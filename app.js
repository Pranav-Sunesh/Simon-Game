let gamePattern = [];
let userClickedPattern = [];
let userChosenColor;
let box = document.querySelectorAll(".box");
let level = 0;
let h1 = document.querySelector("h1");
let start = false;


document.addEventListener("keypress",() => {
    if(start == false){
        increment();
        start = true;
    }
});

let audioPlay = (audio) => {
    let sound = new Audio("Audios/"+audio+".mp3");
    sound.play();
}


let gameOver = () => {
    document.body.style.backgroundColor = "red";
    setInterval(()=>{document.body.style.backgroundColor = "#011F3F"},300);
    audioPlay("wrong");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    start = false;
}

let increment = () => {
    randomColors();
    h1.innerText = "Level " + level;
}

let checkAnswer = (user,game) =>{
    let cnt =0;
    for(i = 0;i < user.length;i++){
        if(user[i] == game[i]){
            cnt ++;
        }
        else{
            return false;
        }

    }
    if(cnt == game.length){
        return true;
    }
};

let blink = (val) => {
    let div = document.querySelector("."+val);
    div.style.visibility = "hidden";
    audioPlay(val);
    setTimeout(()=>{div.style.visibility = "visible"},500);
};


let randomColors = () => {
    level ++;
    let buttonColors = ["green","red","blue","yellow"];
    let temp = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[temp];
    gamePattern.push(randomChosenColor);
    blink(randomChosenColor);
};

box.forEach((val) => {
    val.addEventListener("click",() => {
        if(start == true){
            for(i of val.classList){
                if(i == "box"){
                    continue
                }
                else{
                    userChosenColor = i;
                    audioPlay(i);
                }
            }
            
            userClickedPattern.push(userChosenColor);
            pressedBox(userChosenColor);
            if(checkAnswer(userClickedPattern,gamePattern) == true){
                setTimeout(increment,500);
                userClickedPattern = [];
            }
            else if(checkAnswer(userClickedPattern,gamePattern) == false){
                h1.innerText = "Game Over, Press Any Key to Restart"
                gameOver();
            }
        }
    });
});

let pressedBox = (val) => {
    let pressedButton = document.querySelector("."+val).classList;
    pressedButton.add("pressed")
    setTimeout(() => {pressedButton.remove("pressed")},100);
}







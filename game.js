var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;

$(document).keypress(function(){
    if(started===false)
    {
        nextSequence();
        started=true;
    }
});


function nextSequence()
{
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
}

$(".btn").on("click",function(){
    var userChoice=$(this).attr("id");
    userClickedPattern.push(userChoice);
    makeSound(userChoice);
    animatePress(userChoice);

    checkAnswer(userClickedPattern.length-1);
});


function makeSound(randomChosenColour)
{
    var audio=new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function animatePress(currentcolour)
{
    $("#"+ currentcolour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentcolour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("correct");

        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);

        }
    }

    else
    {
        console.log("wrong");

        makeSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(function () {
        $("body").removeClass("game-over");
        },200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }



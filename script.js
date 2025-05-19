const guessInput = document.querySelector("#guess");
const inputElement = document.getElementById("guess");
const feedbackElement = document.getElementById("feedback");
const playAgain = document.getElementById("restartButton");
const submit = document.getElementById("submitButton");
let randomNumber;
let attempts;
let success;

update();

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && attempts == 0) {
    playAgain.classList.add('restartActive');
  } else if (event.key === 'Enter' && inputElement.value > 0){
    submit.classList.add('buttonActive');
  }
});
document.addEventListener('keyup', function (event) {
  if (event.key === 'Enter' && attempts == 0) {
    playAgain.classList.remove('restartActive');
    playAgain.click();
  } else if (event.key === 'Enter' && inputElement.value > 0){
    submit.classList.remove('buttonActive');
    submit.click();
  }
});
guessInput.addEventListener('input', () => {
    const value = parseInt(guessInput.value, 10);
    const min = parseInt(guessInput.min, 10);
    const max = parseInt(guessInput.max, 10);
    if (value < min) guessInput.value = min;
    if (value > max) guessInput.value = max;
});
function update(){
    console.log("update()");
    randomNumber = Math.floor(Math.random() * 100);
    attempts = 10;
    success = false;
    submit.style.display = "inline-block";
    playAgain.style.display = "none";
    guessInput.style.display = "inline-block";
    inputElement.value = "1";
    feedbackElement.innerHTML = "";
}
function checkGuess(){
    console.log("checkGuess()");
    while(attempts > 0){
        attempts--;
        let guess = inputElement.value;
        if(guess == randomNumber){
            feedbackElement.innerHTML = "Success! The correct number was " + randomNumber + "! You guessed this in " + (10 - attempts) + " tries!";
            feedbackElement.style.color = "green";
            attempts = 0;
            success = true;
            break;
        } else if (guess < randomNumber){
            wrongNumber(guess, "low");
            break;
        } else{
            wrongNumber(guess, "high");
            break;
        }
    }
    if (attempts == 0 && success === false){
        feedbackElement.innerHTML = "GAME OVER! The correct number was " + randomNumber;
        feedbackElement.style.color = "red";
    }
    if (attempts == 0){
        guessInput.style.display = "none";
        submit.style.display = "none";
        playAgain.style.display = "inline-block";
    }
}
function wrongNumber(guess, highLow){
    console.log("wrongNumber(guess, highLow)");
    feedbackElement.innerHTML = guess + " is too " + highLow + ". Try again.";
    feedbackElement.innerHTML += "You have " + attempts + " more guesses left.";
    feedbackElement.style.color = "red";
}
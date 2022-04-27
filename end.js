//final score is the id that will hold the final score of the user
const finalScore = document.querySelector('#finalScore')
//mostRecentScore is a variable caluclated in the quiz.js file.
//the value is fetched from local storage
const mostRecentScore = localStorage.getItem('mostRecentScore')
//message is a variable that will display a message to the user based on what score they achieved
document.getElementById("message").innerHTML = message;

//the final score is displayed to the interface
finalScore.innerText = mostRecentScore

//a switch case is used so that multiple values can be checked against the variable value
switch(mostRecentScore) {
  //if the value is the same value as the case then the subsequent message is displayed
    case "0":
        message.innerHTML = "Come on now, you could have got more by not trying!"
      break;
    case "1":
        message.innerHTML = "I mean, it's not quite zero...but...it's not great. Is it?"
      break;
    case "2":
        message.innerHTML = "Well, it's a start isn't it."
        break
    case "3":
        message.innerHTML = "It's ok, definitely room for improvement though!"
      break;
    case "4":
        message.innerHTML = "Oh, almost 50%. Next time you'll get there."
      break;
    case "5":
        message.innerHTML = "Let's go, you got half correct. Not bad!"
        break
    case "6":
        message.innerHTML = "Pretty decent score. Just a bit more practise."
      break;
    case "7":
        message.innerHTML = "Nice, only three wrong."
      break;
    case "8":
        message.innerHTML = "My god! THIS PERSON IS SMART!"
        break
    case "9":
        message.innerHTML = "ah geez, one wrong. I'm sure you'll get there next attempt!"
        break
    default:
        message.innerHTML = "I take my hat off to you! You are clearly the brainiest of the bunch!"
  }

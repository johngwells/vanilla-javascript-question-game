///////////////////
// Question Game

/*

--- A fun quiz game in the console! ---

// Overview & Plan for the game

1. Build a function constructor called Question to describe questions. A question should include:
a) The question itself
b) The answers from which the player can choose the correct one
c) correct answer

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers
(each question should have a number).

5. Use the 'prompt' function to ask the user for the correct answer.

6. Check if the answer is correct and print to the console whether the answer is correct or not.

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all
your code is private and doesn't interfere with the other programmers code. IIFE

8. After you display the result, display the next random questions, so that the game never ends
Make a function for this and call it right after displaying the result)

9. Since the game never ends. Include the option to quit the game if the
user writes 'exit' instead of the answer.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to
the score. Use closures for this

11. Disply the score in the console.

*/

// Use IIFE to private the function so it doesn't interfere with other programmers code
// Immediately Invoked Function expression. ( creates a new scope)
(function() {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (let i = 0; i < this.answers.length; i++) {
      console.log(i + ': ' + this.answers[i])
    }
  }

  Question.prototype.checkAnswer = function (ans, callback) {
    let sc;

    if (ans === this.correct) {
      console.log('Correct Answer');
      sc = callback(true);
    } else {
      console.log('Wrong Answer. Try Again');
      sc = callback(false);
    }

    this.displayScore(sc);
  }

  Question.prototype.displayScore = function(score) {
    console.log('Your current score is: ' + score);
    console.log('-------------------------------');
  }

  var q1 = new Question('Is JavaScript the coolest programming language in the world?',
    ['Yes', 'No'], 0);

  var q2 = new Question('What\'s the worst topping for pizza?',
    ['pepperoni', 'anchovies', 'Pineapple'], 2);

  var q3 = new Question('What best describes coding?',
    ['Boring', 'Hard', 'Fun', 'Tedious'], 2);

  var questions = [q1, q2, q3];

  // keep score
  function score() {
    let sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    }
  }

  let keepScore = score();

  function nextQuestion() {
  
    var n = Math.floor(Math.random() * questions.length);
  
    questions[n].displayQuestion();
  
    var answer = prompt('Please select the correct answer');
  
    if(answer !== 'exit') {
      questions[n].checkAnswer(parseInt(answer), keepScore);
      nextQuestion();
    }
  }
  // this calls it from the beginning
  nextQuestion();
})();
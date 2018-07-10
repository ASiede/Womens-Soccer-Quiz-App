'use strict';

let counter = 0;
let score = 0;
let currentNumber =`Question: ${counter + 1}/${STORE.length}`;
let currentScore = `Score: ${score}`;

function renderQuestions(arr) {
  let questionItem = arr[counter];
  let questionText = '';
  for (let i =0; i < questionItem.answers.length; i++){
     questionText = questionText.concat(`<label for="guess-${i}">
    <input id="guess-${i}" type='radio' name='guess' value='${questionItem.answers[i]}'>${questionItem.answers[i]}
  </label><br>`) 
  }
  return questionText;
}

let questionChoices = renderQuestions(STORE);

let question = STORE[counter].question;

let correctFeedbackPage=`
  <h2>That is correct!</h2>
  <img class='correct feedback' src='http://media.giphy.com/media/3oEduECZEoXL1KxZS0/giphy.gif' alt='USWNT cheering in celebration'><br>`;

let incorrectFeedbackPage=`
<h2>That is incorrect!</h2>
<img class='incorrect feedback' src='https://i.gifer.com/5q13.gif' alt='Alex Morgan saying no'>
<h3>The correct answer was: <span class='correct-answer'>${STORE[counter].correct}</span></h3>`;
  

function updateQuizInfo (){
  currentNumber =`Question: ${counter + 1}/${STORE.length}`;
  currentScore = `Score: ${score}`;
  questionChoices = renderQuestions(STORE);
  question = STORE[counter].question;
  incorrectFeedbackPage=`
    <h2>That is incorrect!</h2>
    <img class='incorrect feedback' src='https://i.gifer.com/5q13.gif' alt='Alex Morgan saying no'>
    <h3>The correct answer was: <span class='correct-answer'>${STORE[counter].correct}</span></h3>`;
}

// starting the quiz

function handleStartQuiz () {
  $('.js-start-quiz').on('click', function () {
    $('.question-view').show();
    $('.initial-page-view').hide();
    $('.current-question-number').html(currentNumber);
    $('.current-score').html(currentScore);
    $('legend').html(question)
    $('.questions').html(questionChoices);
  })
}

// evaluating answer choice and showing corresponding feedback
function choiceSubmit(){
    // check that an answer is chosen and alert if not
    if ($('form input:checked').val() === undefined){
      $('.js-question-skipped').html("Please Choose An Answer");
    //show feedback page based on right/wrong answer
    } else {
      $('.feedback-page').show();
      $('.question-view').hide();
      if ( $('form input:checked').val() === STORE[counter].correct ) {
        score += 1;
        $('.feedback-content').html(correctFeedbackPage);
        } else {
       $('.feedback-content').html(incorrectFeedbackPage);
        }
    }  
  }

function handleChoiceSubmit() {
  $('form').on('submit', function(event){
    event.preventDefault();
    choiceSubmit();
  });
}

//going to the next question and adding to score and counter

function nextQuestion() {
      counter += 1;
      //if more questions, go to next question
      if (counter < STORE.length) {
        updateQuizInfo();
        $('.feedback-page').hide();
        $('.question-view').show();
        $('.js-question-skipped').html('');
        $('.current-question-number').html(currentNumber);
        $('.current-score').html(currentScore);
        $('legend').html(question)
        $('.questions').html(questionChoices);

        //if that was the last question, go to results
        } else {
          $('.feedback-page').hide();
          $('.results').show();
          if (score === 1) {
            $('.total-correct').html(score + ' question ');
          } else {
            $('.total-correct').html(score + ' questions ');
          }
          $('.medal-color').html(medalCatagory().color);
          $('.medal-img').attr({src:medalCatagory().src, alt:medalCatagory().alt})
        }
  }

function handleNextQuestion () {
    $('.next-question').on('click', nextQuestion);
}

//determine score and give corresponding reward via text and img
function medalCatagory() {
  if (score > 8) {
    return {
      color: 'Gold ',
      src: 'https://image.freepik.com/free-vector/golden-medal-design_1166-34.jpg',
      alt: 'Gold Medal'
    };
  } else if (score > 6 && score < 9 ) {
    return {
      color: 'Silver ',
      src: 'https://img.freepik.com/free-vector/silvery-medal-design_1166-23.jpg?size=338&ext=jpg',
      alt: 'Silver Medal'
    };
  } else if (score > 4 && score < 7) {
    return {
      color: 'Bronze ',
      src: 'https://img.freepik.com/free-vector/bronzed-medal-design_1166-32.jpg?size=338&ext=jpg',
      alt: 'Bronze Medal'
    };
  } else {
    return {
      color: 'Participation ',
      src: 'https://rlv.zcache.com/you_tried_gag_medal-rc659e4b2aa8d4caeb2c193857a4afbf6_698th_540.jpg?rlvnet=1',
      alt: 'Participation Medal'
    }
  }
}

//restarting the quiz

function handleRestartQuiz () {
  $('.try-again').on('click', function() {
    counter = 0;
    score = 0;
    updateQuizInfo();
    $('.question-view').show();
    $('.initial-page-view').hide();
    $('.current-question-number').html(currentNumber);
    $('.current-score').html(currentScore);
    $('legend').html(question)
    $('.questions').html(questionChoices);
    $('.results').hide();
  });
}

function quizInit () {
  $(handleRestartQuiz);
  $(handleStartQuiz);
  $(handleChoiceSubmit);
  $(handleNextQuestion);
}

quizInit();
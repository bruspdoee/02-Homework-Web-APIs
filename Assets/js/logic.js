var userScore = 0;
var startButton = $("#start-button");
var mainTextContainer = $(".introText");
var quizContainer = $("#quizQuestions");
var questionNumber = 0;

var questionsAndAnswers = [{
    Question: "Who was responsible for the creation of the Night King?",
    Answers: ["Brus Palaj", "The Children of the Forest", "Donald Trump", "Bran the Builder"],
    Correct: "The Children of the Forest",
}, {
    Question: "Dany’s dragons are called Drogon, Viserion and ____?",
    Answers: ["Dougal", "Vhagar", "Rhaegal", "Balerion"],
    Correct: "Rhaegal",
}, {
    Question: "Who said: 'I don’t plan on knitting by the fire while men fight for me'?",
    Answers: ["Lyanna Mormont", "Sansa Stark", "Brienne of Tarth", "Arya Stark"],
    Correct: "Lyanna Mormont",
}, {
    Question: "Where is the House of Black and White, the training temple of the Faceless Men?",
    Answers: ["Qarth", "Mereen", "Braavos", "Nowhere"],
    Correct: "Braavos",
}, {
    Question: "What is the name of Arya’s sword?",
    Answers: ["Ice", "Needle", "Sharp", "Fang"],
    Correct: "Needle",
}]


var timerCount = 180;
var pauseCount = 1;

$(document).ready(function() {

    function countDown() {
        $("#displayTimer").text("Time Left: " + timerCount);

        var timeInterval = setInterval(function() {
            timerCount--;
            $("#displayTimer").text("Time Left: " + timerCount);

            if (timerCount === 0 || timerCount < 0) {
                clearInterval(timeInterval);
                alert("Time's Up!");
            }

            if (questionNumber === 5) {
                $("#displayTimer").empty();
                var timerContainer = $(".container1")
                timerContainer.empty();
            }
        }, 1000); 
    }

    function questionPause() {

        var timeInterval = setInterval(function() {
            pauseCount--;
            if (pauseCount === 0) {
                clearInterval(timeInterval); 
            }
        }, 1000);
    }

    function generateQuestions() {

        startButton.hide();
        mainTextContainer.empty();

        var questionText = $("<div>");

        questionText.addClass("questionContainer");
        questionText.text(questionsAndAnswers[questionNumber].Question);


        quizContainer.append(questionText);

        quizContainer.append($("<br>"));
 
        $("#score").text("Score: " + userScore);

        var i;
        for (i = 0; i < questionsAndAnswers[questionNumber].Answers.length; i++) {
            var answerText = $("<button>"); 
            answerText.addClass("answerContainer"); 
            answerText.text(questionsAndAnswers[questionNumber].Answers[i]); 
            quizContainer.append(answerText); 
        }

        $(".answerContainer").on("click", function(e) {

            $(this).addClass("selectContainer");

            var selectedAnswer = e.target.innerHTML;

            if (selectedAnswer === questionsAndAnswers[questionNumber].Correct) {
                alert("Correct!");

                userScore += 20; 
                $("#score").text("Score: " + userScore); 

                questionNumber++; 
                questionPause(); 
                quizContainer.empty();
                generateQuestions();

            } else {
                alert("Wrong!");

                timerCount -= 30; 
                questionNumber++; 
                questionPause(); 
                quizContainer.empty();
                generateQuestions();
            }
        })

    }

    startButton.on("click", countDown);
    startButton.on("click", generateQuestions);

})
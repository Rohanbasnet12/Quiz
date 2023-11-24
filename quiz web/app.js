const questions = [
    {
        question: 'What is the role of the this keyword in JavaScript?',
        answers: [
            { text: 'It refers to the current date and time', correct: false },
            { text: 'It is used to define a new variable', correct: false },
            { text: 'It refers to the owner object of the function it is in', correct: true },
            { text: 'It represents the value of an undefined variable', correct: false }
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'High-Level Text Machine Language', correct: false },
            { text: 'Hyperlink and Text Markup Language', correct: false },
            { text: 'Hyper Transfer Markup Language', correct: false }
        ]
    },
    {
        question: 'What will be the output of typeof null in JavaScript?',
        answers: [
            { text: 'null', correct: false },
            { text: 'object', correct: false },
            { text: 'undefined', correct: true },
            { text: 'string', correct: false }
        ]
    },
    {
        question: 'What does the <a> tag represent in HTML?',
        answers: [
            { text: 'Abbreviation', correct: false },
            { text: 'Anchor', correct: true },
            { text: 'Article', correct: false },
            { text: 'Area', correct: false }
        ]
    },
    {
        question: 'Which CSS property is used to change the text color?',
        answers: [
            { text: 'text-color', correct: false },
            { text: 'color', correct: true },
            { text: 'font-color', correct: false },
            { text: 'text-style', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Colorful Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Creative Style Sheets', correct: false }
        ]
    },
    {
        question: 'How do you write a comment in JavaScript?',
        answers: [
            { text: '// This is a comment', correct: true },
            { text: '! This is a comment ', correct: false },
            { text: '/* This is a comment */', correct: false },
            { text: '# This is a comment', correct: false }
        ]
    }
];


// Appear queston section when hit start button
$('#startBtn').on('click', () => {
    $('#game-container').css('left', '0');
})


// Global variables for score and current question index
let score = 0;
let questionIndex = 0;

// Function to start the quiz
function startQuiz() {
    // Initialize score and question index
    score = 0;
    questionIndex = 0;

    // Display the first question and its answers
    displayQuestion();
    displayAnswer();

    // Set up the logic behind the next button
    nextButton();
}

// Call the startQuiz function to begin the quiz
startQuiz();

// Function to handle the logic behind the next button
function nextButton() {
    $('#nextQuestionBtn').on('click', () => {
        questionIndex++;

        // Check if all questions have been answered
        if (questionIndex >= questions.length) {
            console.log('Quiz completed');
            quizEnd();
            $('.resultDisplay').css({
                'opacity': '1',
                'display': 'block',
                'transition': '.3s ease'
            })
            $('#result').text(`You Scored ${score} out of ${questions.length}.`);
        } else {
            // Display the next question
            $('#text-ques').text(questions[questionIndex].question);

            // Update the question number display
            let totalQuestion = questions.length;
            $('#displayQuestionNumber').text(`${questionIndex + 1}/${totalQuestion}`);

            // Display the answers for the next question
            displayAnswer();
        }
    });
}

// Function to display the current question
function displayQuestion() {
    $('#text-ques').text(questions[questionIndex].question);
}

// Function to display the answers for the current question
function displayAnswer() {
    $('.answer').empty();

    questions[questionIndex].answers.forEach((answer, index) => {
        // Adding 1 to index for 1-based numbering
        const isCorrect = answer.correct;
        const button = `<button id="text-ans" data-answer-index="${index}" data-correct="${isCorrect}">${answer.text}</button>`;
        $('.answer').append(button);
    });

    // Add click event listener to all buttons
    $('.answer button').on('click', function () {
        // Access the data-answer-index attribute to get the corresponding answer index
        let answerIndex = $(this).data('answer-index');

        // Access the data-correct attribute to determine if the answer is correct
        let isCorrect = $(this).data('correct');

        // Disable all buttons after one of them is clicked
        $('.answer button').prop('disabled', true);

        // Perform additional actions based on whether the clicked answer is correct
        if (isCorrect) {
            $(this).css({
                'border': '2px solid green',
                'background': 'lightgreen',
            })
            score++;
        } else {
            $(this).css({
                'border': '2px solid red',
                'background': '#ff575796',
            })
        }
    });
}

// Function to reset the game
function resetGame() {
    window.location.href = 'index.html';
    // Call the function to start the quiz again
    startQuiz();
}

// Function to display quiz score
function quizEnd() {
    // display score result
    $('#playAgainBtn').on('click', () => {
        resetGame();
    });
}
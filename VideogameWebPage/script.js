var modal = document.getElementById('id01');

function funk() {
	document.getElementById("podaci").innerHTML = "";
	resultsContainer.innerHTML = "";
}

(function () {
	const myQuestions = [
		{
			question: "When was League of Legends released?",
			answers:
			{
				a: "2009",
				b: "2010",
				c: "2011",
				d: "2012"
			},
			correctAnswer: "a"
		},
		{
			question: "Which video game company developed the game?",
			answers:
			{
				a: "Activision",
				b: "Capcom",
				c: "Riot games",
				d: "EA"
			},
			correctAnswer: "c"
		},
		{
			question: "How many lanes are there in the Summoner's Rift map?",
			answers:
			{
				a: "Three",
				b: "Six",
				c: "Two",
				d: "Four"
			},
			correctAnswer: "a"
		},
		{
			question: "What animals are seen in the Howling Abyss map?",
			answers:
			{
				a: "Poros",
				b: "Unicorns",
				c: "Mermaids",
				d: "Bats"
			},
			correctAnswer: "a"
		},
		{
			question: "Which tribe do the champions Anivia, Braum, Gragas, Nunu and Tryndamere belong to?",
			answers:
			{
				a: "Frostguard",
				b: "Avarosan",
				c: "Winter's Claw",
				d: "Macciu Protectors"
			},
			correctAnswer: "b"
		}
	];

	function buildQuiz() {
		const output = [];

		myQuestions.forEach((currentQuestion, questionNumber) => {

			const answers = [];

			for (letter in currentQuestion.answers) {
				answers.push(
					`<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
				);
			}


			output.push(
				`<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
			);
		});

		quizContainer.innerHTML = output.join("");
	}

	function showResults() {
		const answerContainers = quizContainer.querySelectorAll(".answers");

		let numCorrect = 0;

		myQuestions.forEach((currentQuestion, questionNumber) => {

			const answerContainer = answerContainers[questionNumber];
			const selector = `input[name=question${questionNumber}]:checked`;
			const userAnswer = (answerContainer.querySelector(selector) || {}).value;

			if (userAnswer === currentQuestion.correctAnswer) {
				numCorrect++;
			}
		});

		resultsContainer.innerHTML = `${numCorrect}/${myQuestions.length}!`;
		if (numCorrect == 0) {
			resultsContainer.innerHTML = "0/5. You know nothing!"
		}
	}

	function showSlide(n) {
		slides[currentSlide].classList.remove("active-slide");
		slides[n].classList.add("active-slide");
		currentSlide = n;

		if (currentSlide === 0) {
			previousButton.style.display = "none";
		}
		else {
			previousButton.style.display = "inline-block";
		}

		if (currentSlide === slides.length - 1) {
			nextButton.style.display = "none";
			submitButton.style.display = "inline-block";
		}
		else {
			nextButton.style.display = "inline-block";
			submitButton.style.display = "none";
		}
	}

	function showPreviousSlide() {
		showSlide(currentSlide - 1);
	}

	function showNextSlide() {
		showSlide(currentSlide + 1);
	}

	const quizContainer = document.getElementById("quiz");
	const resultsContainer = document.getElementById("results");
	const submitButton = document.getElementById("submit");

	buildQuiz();

	const previousButton = document.getElementById("previous");
	const nextButton = document.getElementById("next");
	const slides = document.querySelectorAll(".slide");
	let currentSlide = 0;

	showSlide(0);

	submitButton.addEventListener("click", showResults);
	previousButton.addEventListener("click", showPreviousSlide);
	nextButton.addEventListener("click", showNextSlide);
})();

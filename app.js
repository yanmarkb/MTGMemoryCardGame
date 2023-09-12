// document.addEventListener("DOMContentLoaded", function () {
// 	const gameContainer = document.getElementById("game-container");
// 	const timer = document.getElementById("timer");
// 	const scoreDisplay = document.getElementById("score");
// 	const startButton = document.getElementById("start-button");
// 	const restartButton = document.getElementById("restart-button");

// 	const cards = [
// 		"card1.gif",
// 		"card2.gif",
// 		"card3.gif",
// 		"card4.gif",
// 		"card5.gif",
// 	];
// 	let flippedCards = [];
// 	let score = 0;
// 	let timerInterval;
// 	let seconds = 0;

// 	function shuffle(array) {
// 		return array.sort(() => Math.random() - 0.5);
// 	}

// 	function updateScore() {
// 		score++;
// 		scoreDisplay.textContent = `Score: ${score}`;
// 	}

// 	function startTimer() {
// 		timerInterval = setInterval(() => {
// 			seconds++;
// 			timer.textContent = `Time: ${seconds}`;
// 		}, 1000);
// 	}

// 	function stopTimer() {
// 		clearInterval(timerInterval);
// 	}

// 	function resetGame() {
// 		flippedCards = [];
// 		score = 0;
// 		seconds = 0;
// 		timer.textContent = `Time: ${seconds}`;
// 		scoreDisplay.textContent = `Score: ${score}`;
// 		gameContainer.innerHTML = "";
// 	}

// 	function createCard(image) {
// 		const card = document.createElement("div");
// 		card.className = "card";
// 		const cardFront = document.createElement("div");
// 		cardFront.className = "card-front";
// 		const cardBack = document.createElement("div");
// 		cardBack.className = "card-back";
// 		cardBack.style.backgroundImage = `url(${image})`;
// 		card.appendChild(cardFront);
// 		card.appendChild(cardBack);
// 		card.addEventListener("click", function () {
// 			if (!card.classList.contains("flipped") && flippedCards.length < 2) {
// 				card.classList.add("flipped");
// 				flippedCards.push(card);

// 				if (flippedCards.length === 2) {
// 					setTimeout(() => {
// 						flippedCards.forEach((card) => card.classList.remove("flipped"));
// 						flippedCards = [];
// 					}, 1000);
// 				}
// 			}
// 		});
// 		gameContainer.appendChild(card);
// 	}

// 	startButton.addEventListener("click", function () {
// 		startButton.disabled = true;
// 		restartButton.disabled = false;
// 		resetGame();
// 		shuffle(cards);
// 		cards.forEach((card) => createCard(card));
// 		startTimer();
// 	});

// 	restartButton.addEventListener("click", function () {
// 		resetGame();
// 		shuffle(cards);
// 		cards.forEach((card) => createCard(card));
// 		startTimer();
// 	});
// });

const cards = document.querySelectorAll(".game");
const startButton = document.getElementById("start");
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const result = document.getElementById("result");
const gameBoard = document.querySelector("section");
const restart = document.getElementById("restart");

let seconds = 0;
let minutes = 0;
let movesCount = 0;
let interval;

const timeGenerator = () => {
	seconds += 1;
	if (seconds >= 60) {
		minutes += 1;
		seconds = 0;
	}
	let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
	let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
	timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
	movesCount += 1;
	moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

let body = document.querySelector("body");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.toggle("flip");

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	let isMatch = firstCard.dataset.name === secondCard.dataset.name;

	isMatch ? disabledCards() : unFlipCard();
}

function disabledCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);

	resetBoard();
}

function unFlipCard() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");

		resetBoard();
	}, 1000);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

cards.forEach((card) => card.addEventListener("click", flipCard)); //Arrow function

(function shuffle() {
	cards.forEach((card) => {
		let randomPosition = Math.floor(Math.random() * 12);
		card.style.order = randomPosition;
	});
})();

startButton.addEventListener("click", () => {
	movesCount = 0;
	seconds = 0;
	minutes = 0;

	startButton.classList.add("hide");
	gameBoard.classList.remove("hide");

	interval = setInterval(timeGenerator, 1000);

	moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
	initializer();
});

restart.addEventListener("click", () => {
	location.reload();
});

const initializer = () => {
	result.innerText = "";
	// let cardValues = generateRandom();
	// console.log(cardValues);
	// matrixGenerator(cardValues);
};

const COLORS = [
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"yellow",
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"yellow",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
// function shuffle(array) {
// 	let counter = array.length;

// 	// While there are elements in the array
// 	while (counter > 0) {
// 		// Pick a random index
// 		let index = Math.floor(Math.random() * counter);

// 		// Decrease counter by 1
// 		counter--;

// 		// And swap the last element with it
// 		let temp = array[counter];
// 		array[counter] = array[index];
// 		array[index] = temp;
// 	}

// 	return array;
// }

// let shuffledColors = shuffle(COLORS);

// // this function loops over the array of colors
// // it creates a new div and gives it a class with the value of the color
// // it also adds an event listener for a click for each card
// function createDivsForColors(colorArray) {
// 	for (let color of colorArray) {
// 		// create a new div
// 		const newDiv = document.createElement("div");

// 		// give it a class attribute for the value we are looping over
// 		newDiv.classList.add(color);

// 		// call a function handleCardClick when a div is clicked on
// 		newDiv.addEventListener("click", handleCardClick);

// 		// append the div to the element with an id of game
// 		cards.append(newDiv);
// 	}
// }

// // TODO: Implement this function!
// function handleCardClick(event) {
// 	// you can use event.target to see which element was clicked
// 	console.log("you just clicked", event.target);
// }

// // when the DOM loads
// createDivsForColors(shuffledColors);

let audioInstance = null;
function checkThala() {
	const thalaInput = document.getElementById("reasonInput");
	let reason = sanitizeAns(thalaInput.value.trim());
	thalaInput.value = "";

	// Utility to handle success cases
	const handleSuccess = (message) => {
		displayOutput("output", message);
		confettiAnimation();
		openModal("successModal");
		playAudio("success");
	};

	// Check sum of digits
	if (calculateSumOfDigits(reason) === 7) {
		handleSuccess("Thala for a Reason!\nSum of digits is 7!");
		return;
	}

	// Check number of letters
	if (countLetters(reason) === 7) {
		handleSuccess("Thala for a Reason!\n7 letters found!");
		return;
	}

	// Check number of words
	if (countWords(reason) === 7) {
		handleSuccess("Thala for a Reason!\n7 words found!");
		return;
	}

	// Check numerology connection
	const numerologyResult = numerologyConnection(reason);
	if (numerologyResult) {
		handleSuccess(numerologyResult);
		return;
	}

	// Check wordplay connection
	if (wordplayConnection(reason)) {
		handleSuccess("Thala for a Reason! Wordplay connection to 7!");
		return;
	}

	// Failure case
	displayOutput("output2", "No connection to 7 found. Moye Moye!");
	openModal("failureModal");
	playAudio("failure");
}

function calculateSumOfDigits(input) {
	return input
		.split("")
		.map(Number)
		.filter((digit) => !isNaN(digit))
		.reduce((sum, digit) => sum + digit, 0);
}

function countLetters(input) {
	return input.replace(/[^a-zA-Z]/g, "").length;
}

function countWords(input) {
	return input.split(/\s+/).filter(Boolean).length;
}

function numerologyConnection(input) {
	const charValues = input
		.toLowerCase()
		.split("")
		.map((char) => (/[a-z]/.test(char) ? char.charCodeAt(0) - 96 : 0));

	const numerologyValue = charValues.reduce((sum, value) => sum + value, 0);

	if (numerologyValue === 7) {
		return `Thala for a Reason!\nNumerology connection to 7: Sum of all characters is 7 (${charValues.join(
			" + ",
		)} = ${numerologyValue})`;
	}

	if (numerologyValue.toString().includes("7")) {
		return `Thala for a Reason!\nNumerology connection to 7: Total includes 7 (${charValues.join(
			" + ",
		)} = ${numerologyValue})`;
	}

	return false;
}

function sanitizeAns(input) {
	const regex = /^[a-zA-Z0-9 ]+$/;
	input = input.replace(/[^\w\s]/gi, "");
	input = input.replace(/<\/?[^>]+(>|$)/g, "");
	return input;
}

function wordplayConnection(input) {
	const soundingWords = /\b(seven|sevn|thala|dhoni|csk|mahi|msd|legend|king|ranchi|7)\b/i;
	return soundingWords.test(input);
}

const confettiAnimation = () => {
	const duration = 3000;
	const animationEnd = Date.now() + duration;
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

	const interval = setInterval(() => {
		const timeLeft = animationEnd - Date.now();
		if (timeLeft <= 0) return clearInterval(interval);

		const particleCount = 50 * (timeLeft / duration);
		const createConfetti = (x) => confetti({ ...defaults, particleCount, origin: { x, y: Math.random() - 0.2 } });
		createConfetti(0.2);
		createConfetti(0.8);
	}, 250);
};

const displayOutput = (elemId, msg) => {
	document.getElementById(elemId).innerText = msg;
};

function openModal(modalId) {
	document.getElementById(modalId).style.display = "block";
}

// Declare a global variable to hold the audio instance
function playAudio(type) {
	const audioMap = { success: "assets/yup.mp3", failure: "assets/noyup.mp3" };

	// If audio is already playing, stop it
	if (audioInstance) {
		audioInstance.pause();
		audioInstance.currentTime = 0;
	}

	// Create a new audio instance and play it
	audioInstance = new Audio(audioMap[type]);
	audioInstance.play();
}

function closeModal(formId) {
	document.getElementById(formId).style.display = "none";

	// Pause audio if it is playing
	if (audioInstance) {
		audioInstance.pause();
		audioInstance.currentTime = 0;
	}
}

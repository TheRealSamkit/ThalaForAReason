function checkThala() {
  let Thala = document.getElementById("Get-Reason").value;
  document.getElementById("Get-Reason").value = "";
  //Check Sum of Digits
  const sumOfDigits = calculateSumOfDigits(Thala);
  if (sumOfDigits === 7) {
    displayOutput("Thala for a Reason!\nSum of digits is 7!");
    confettiAnimation();
    openForm();
    playYup();
    return;
  }
  //Check Number of Letters
  const numberOfLetters = countLetters(Thala);
  if (numberOfLetters === 7) {
    displayOutput("Thala for a Reason!\n7 letters found!");
    confettiAnimation();
    openForm();
    playYup();
    return;
  }
  //Check Number of words
  const numberOfWords = countWords(Thala);
  if (numberOfWords === 7) {
    displayOutput("Thala for a Reason!\n7 Words found!");
    confettiAnimation();
    openForm();
    playYup();
    return;
  }

  // Check numerology
  const numerologyResult = numerologyConnection(Thala);
  if (numerologyResult) {
    displayOutput(numerologyResult);
    confettiAnimation();
    openForm();
    playYup();
    return;
  }
  // Check wordplay
  if (wordplayConnection(Thala)) {
    displayOutput('Thala for a Reason! Wordplay connection to 7!');
    confettiAnimation();
    openForm();
    playYup();
    return;
  }
  displayOutput2("No connection to 7 found. Moye Moye!");
  openForm2();
  playNoYup();
}

function calculateSumOfDigits(input) {
  return input
    .toString()
    .split("")
    .map(Number)
    .reduce((sum, digit) => sum + digit, 0);
}

function countLetters(input) {
  return input.replace(/[^a-zA-Z]/g, "").length;
}

function countWords(input) {
  return input.split(/\s+/).filter((word) => word.length > 0).length;
}

function numerologyConnection(input) {
  // Calculate numerology value by summing the numeric values of each character
  const charValues = input
    .toLowerCase()
    .split("")
    .map((char) => char.charCodeAt(0) - 96); // convert 'a' to 1, 'b' to 2, ..., 'z' to 26

  const numerologyValue = charValues.reduce((sum, value) => sum + value, 0);

  // Check if the total numerology value or any part of it equals 7
  if (numerologyValue === 7) {
    return `Thala for a Reason!\nNumerology connection to 7: Sum of all characters is 7 (${charValues.join(" + ")} = ${numerologyValue})`;
  }

  // Check if any part of the numerology value equals 7
  const numerologyParts = numerologyValue.toString().split("");
  if (numerologyParts.includes("7")) {
    const contributingChars = charValues.filter((value) =>
      numerologyParts.includes(value.toString())
    );
    return `Thala for a Reason!\nNumerology connection to 7: The sum of ${contributingChars.join(" + ")} equals 7! (${charValues.join(" + ")} = ${numerologyValue})`;
  }

  // No numerology connection found
  return false;
}

function wordplayConnection(input) {
  // Check if the input contains words that sound like 'seven'
  const soundingWordsRegex = /\b(seven|sevin|sevn|sevun|sevin|thala|dhoni|captain|csk|sath|mahi|mahendra|ms|helicopter|koyal|msd|chennai|7|saath|ranchi|legend|jharkhand|depression|Thalavity|king|goat)\b/i;
  return soundingWordsRegex.test(input);
}


function confettiAnimation() {
  let duration = 5 * 1000;
  let animationEnd = Date.now() + duration;
  let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  let interval = setInterval(function () {
    let timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    let particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

function displayOutput(message) {
  document.getElementById("output").innerText = message;
}

function displayOutput2(message) {
  document.getElementById("output2").innerText = message;
}

function openForm() {
  document.getElementById("popup").style.display = "block";
}

function openForm2() {
  document.getElementById("popup2").style.display = "block";
}

var audio = new Audio(
  "assets/noyup.mp3"
);

var audioo = new Audio(
  "assets/yup.mp3"
);

function playNoYup() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function playYup() {
  audioo.pause();
  audioo.currentTime = 0;
  audioo.play();
}

function closeForm2() {
  document.getElementById("popup2").style.display = "none";
  audioo.pause();
  audio.pause();
}

function closeForm() {
  document.getElementById("popup").style.display = "none";
  audio.pause();
  audioo.pause();
}

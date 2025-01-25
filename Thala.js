function checkThala() {
  let thalaInput = sanitizeAns(
    document.getElementById("Get-Reason").value.trim()
  );
  document.getElementById("Get-Reason").value = "";

  // Utility to handle success cases
  const handleSuccess = (message) => {
    displayOutput(message);
    confettiAnimation();
    openForm();
    playAudio("success");
  };

  // Check sum of digits
  if (calculateSumOfDigits(thalaInput) === 7) {
    handleSuccess("Thala for a Reason!\nSum of digits is 7!");
    return;
  }

  // Check number of letters
  if (countLetters(thalaInput) === 7) {
    handleSuccess("Thala for a Reason!\n7 letters found!");
    return;
  }

  // Check number of words
  if (countWords(thalaInput) === 7) {
    handleSuccess("Thala for a Reason!\n7 words found!");
    return;
  }

  // Check numerology connection
  const numerologyResult = numerologyConnection(thalaInput);
  if (numerologyResult) {
    handleSuccess(numerologyResult);
    return;
  }

  // Check wordplay connection
  if (wordplayConnection(thalaInput)) {
    handleSuccess("Thala for a Reason! Wordplay connection to 7!");
    return;
  }

  // Failure case
  displayOutput2("No connection to 7 found. Moye Moye!");
  openForm2();
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
      " + "
    )} = ${numerologyValue})`;
  }

  if (numerologyValue.toString().includes("7")) {
    return `Thala for a Reason!\nNumerology connection to 7: Total includes 7 (${charValues.join(
      " + "
    )} = ${numerologyValue})`;
  }

  return false;
}

function sanitizeAns(input) {
  const regex = /^[a-zA-Z0-9 ]+$/;
  input = input.replace(/[^\w\s]/gi, "");
  input = input.replace(/<\/?[^>]+(>|$)/g, "");
  return regex.test(input);
}

function wordplayConnection(input) {
  const soundingWords =
    /\b(seven|sevn|thala|dhoni|csk|mahi|msd|legend|king|ranchi|7)\b/i;
  return soundingWords.test(input);
}

function confettiAnimation() {
  const duration = 5000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);
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
let audioInstance = null; // Declare a global variable to hold the audio instance

function playAudio(type) {
  const audioMap = {
    success: "assets/yup.mp3",
    failure: "assets/noyup.mp3",
  };

  // If audio is already playing, stop it
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }

  // Create a new audio instance and play it
  audioInstance = new Audio(audioMap[type]);
  audioInstance.play();
}

function closeForm(formId) {
  document.getElementById(formId).style.display = "none";

  // Pause audio if it is playing
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }
}

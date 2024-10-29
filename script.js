const startButton = document.getElementById('startButton');
const tapButton = document.getElementById('tapButton');
const reactionTimeDisplay = document.getElementById('reactionTime');
const rankDisplay = document.getElementById('rank');
const achievementsDisplay = document.getElementById('achievements');
const lights = [...document.querySelectorAll('.light')];
const racerPopup = document.getElementById('racerPopup');

let startTime, reactionTime;
let lightsTimeout;

// Start race function
startButton.addEventListener('click', startRace);
tapButton.addEventListener('click', recordReaction);

function startRace() {
  // Reset displays and disable tap button initially
  reactionTimeDisplay.textContent = '0';
  rankDisplay.textContent = '-';
  achievementsDisplay.textContent = '-';
  tapButton.disabled = true;
  
  // Hide the popup initially
  racerPopup.classList.remove('show');
  racerPopup.style.opacity = 0;

  // Start the red light sequence
  lights.forEach(light => light.style.backgroundColor = 'grey');
  startButton.disabled = true;
  
  lightsTimeout = setTimeout(() => showLights(0), 1000); // 1 second delay to start lights
}

function showLights(index) {
  if (index < lights.length - 1) {
    lights[index].style.backgroundColor = 'red';
    lightsTimeout = setTimeout(() => showLights(index + 1), 1000);
  } else {
    lights[index].style.backgroundColor = 'green';
    startGreenLight();
  }
}

// When green light shows, start timing
function startGreenLight() {
  tapButton.disabled = false;
  startTime = Date.now(); // Start timing here
}

// Record reaction time
function recordReaction() {
  reactionTime = Date.now() - startTime;
  reactionTimeDisplay.textContent = reactionTime;
  
  // Calculate rank and achievements
  determineRank(reactionTime);
  
  // Show the racer image and chat box
  racerPopup.classList.add('show');
  racerPopup.style.opacity = 1;
  
  // Disable the tap button and reset after tap
  tapButton.disabled = true;
  startButton.disabled = false;
  clearTimeout(lightsTimeout);
}

// Determine rank based on reaction time
function determineRank(time) {
  let rank;
  let achievements = [];

  if (time < 200) {
    rank = "Champion";
    achievements.push("Lightning Reflexes!");
  } else if (time < 300) {
    rank = "Pro Racer";
    achievements.push("Quick as a Flash!");
  } else if (time < 400) {
    rank = "Fast Driver";
    achievements.push("Speedy Fingers!");
  } else if (time < 500) {
    rank = "Intermediate";
    achievements.push("Getting Faster!");
  } else {
    rank = "Novice";
  }

  // Display rank and achievements
  rankDisplay.textContent = rank;
  achievementsDisplay.textContent = achievements.join(", ");
}

// script.js

// Show the tutorial screen when "Start Game" is tapped.
document.getElementById("startButton").addEventListener("click", function () {
  document.getElementById("menu").style.display = "none";
  document.getElementById("tutorial").style.display = "block";
});

// After the tutorial, show the game (map) screen.
document.getElementById("tutorialOk").addEventListener("click", function () {
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("game").style.display = "block";
});

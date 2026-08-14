const startButton = document.querySelector(".start");
const modeMessage = document.getElementById("mode-message");
const aboutButton = document.getElementById("about-button");
const usernameInput = document.getElementById("username");

const savedUsername = sessionStorage.getItem("username");

if (savedUsername) {
  usernameInput.value = savedUsername;
}

aboutButton.addEventListener("click", () => {
  alert("このサイトについては現在準備中です。");
});

startButton.addEventListener("click", () => {

  const username =
    usernameInput.value.trim() || "Player";

  sessionStorage.setItem("username", username);

  const mode =
    document.querySelector('input[name="mode"]:checked');

  if (!mode) {

    modeMessage.classList.remove("show");
    void modeMessage.offsetWidth;
    modeMessage.classList.add("show");

    return;
  }

  if (mode.value === "visual") {
    location.href = "visual.html";
  }

  if (mode.value === "audio") {
    location.href = "audio.html";
  }

});
document.getElementById("fastest-result")
document.getElementById("average-result")
document.getElementById("slowest-result")

const aboutButton = document.getElementById("about-button");

aboutButton.addEventListener("click", () => {
  alert("このサイトについては現在準備中です。");
});

const username =
  sessionStorage.getItem("username") || "Player";

const restartButton =
  document.getElementById("restart-button");

restartButton.addEventListener("click", () => {
  location.href = "index.html";
});


const reactionTimes = JSON.parse(
  sessionStorage.getItem("reactionTimes")
);

if (reactionTimes && reactionTimes.length > 0) {

  const fastest = Math.min(...reactionTimes);

  const slowest = Math.max(...reactionTimes);

  const total =
    reactionTimes.reduce((sum, time) => sum + time, 0);

  const average =
    Math.round(total / reactionTimes.length);

  document.getElementById("fastest-result").textContent =
    fastest + "ms";

  document.getElementById("average-result").textContent =
    average + "ms";

  document.getElementById("slowest-result").textContent =
    slowest + "ms";
}

document.getElementById("result-username").textContent =
  username;
let reactionStart;
let canClick = false;
let reactionTimer;
let finished = false;
let currentCount = 1;
let selectedCount;
let reactionTimes = [];

const startButton = document.querySelector(".start");
const countMessage = document.getElementById("count-message");
const countSelect = document.getElementById("count-options");
const reactionCircle = document.getElementById("circular");
const reactionCircletext = document.getElementById("circular-text");
const averageResult = document.getElementById("average-result");
const retryButton = document.getElementById("retry-button");
const resultButton = document.getElementById("result-button");
const results = [];
const aboutButton = document.getElementById("about-button");

aboutButton.addEventListener("click", () => {
  alert("このサイトについては現在準備中です。");
});

for (let i = 1; i <= 10; i++) {
  results[i] = document.getElementById("result" + i);
}

function showAverage() {

  const requiredCount =
    Math.ceil(Number(selectedCount) / 2);

  if (reactionTimes.length < requiredCount) {

    averageResult.style.display = "block";

    averageResult.classList.add("insufficient");

    averageResult.textContent =
      "有効な測定回数が不足しています";

    return false;
  }

  averageResult.classList.remove("insufficient");

  const total =
    reactionTimes.reduce((sum, time) => sum + time, 0);

  const average =
    Math.round(total / reactionTimes.length);

  averageResult.style.display = "block";

  averageResult.textContent =
    "平均: " + average + "ms";

  return true;
}

function finishTest() {

  finished = true;
  canClick = false;

  const canShowResult = showAverage();

  sessionStorage.setItem(
    "reactionTimes",
    JSON.stringify(reactionTimes)
  );

  retryButton.style.display = "block";

  if (canShowResult) {
    resultButton.style.display = "block";
  } else {
    resultButton.style.display = "none";
  }
}

function nextReaction() {

  setTimeout(() => {

    reactionCircle.style.background = "#12365c";
    reactionCircle.style.borderColor = "#2da8e8";

    const nextRandomTime =
      Math.floor(Math.random() * 31 + 20) * 100;

    reactionTimer = setTimeout(() => {

      reactionCircle.style.background = "#004551";
      reactionCircle.style.borderColor = "#20c997";

      reactionStart = performance.now();
      canClick = true;

    }, nextRandomTime);

  }, 1000);
}

startButton.addEventListener("click", () => {

  const count =
    document.querySelector('input[name="count"]:checked');

  if (!count) {

    countMessage.classList.remove("show");
    void countMessage.offsetWidth;
    countMessage.classList.add("show");

    return;
  }

  selectedCount = count.value;

  currentCount = 1;
  finished = false;
  canClick = false;
  reactionTimes = [];

  averageResult.style.display = "none";
  averageResult.textContent = "";

  retryButton.style.display = "none";
  resultButton.style.display = "none";

  countSelect.style.display = "none";
  reactionCircle.style.display = "block";
  reactionCircletext.style.display = "block";

  for (let i = 1; i <= 10; i++) {
    results[i].style.display = "none";
    results[i].textContent = "";
  }

  for (let i = 1; i <= Number(selectedCount); i++) {
    results[i].style.display = "block";
  }

  const randomTime =
    Math.floor(Math.random() * 21 + 30) * 100;

  reactionTimer = setTimeout(() => {

    reactionCircle.style.background = "#004551";
    reactionCircle.style.borderColor = "#20c997";

    reactionStart = performance.now();
    canClick = true;

  }, randomTime);

});

reactionCircle.addEventListener("pointerdown", () => {

  if (finished) {
    return;
  }

  if (!canClick) {

    console.log("フライング！");

    clearTimeout(reactionTimer);

    results[currentCount].textContent =
      currentCount + "回目: notms";

    reactionCircle.style.background = "#7a1d1d";
    reactionCircle.style.borderColor = "#e72c2c";

    canClick = false;

    if (currentCount < Number(selectedCount)) {

      currentCount++;

      nextReaction();

    } else {

      finishTest();

    }

    return;
  }

  const reactionEnd = performance.now();

  const reactionTime =
    reactionEnd - reactionStart;

  const roundedTime =
    Math.round(reactionTime);

  console.log(reactionTime);

  reactionTimes.push(roundedTime);

  results[currentCount].textContent =
    currentCount + "回目: " + roundedTime + "ms";

  canClick = false;

  if (currentCount < Number(selectedCount)) {

    currentCount++;

    nextReaction();

  } else {

    finishTest();

  }

});

retryButton.addEventListener("click", () => {

  location.reload();

});

resultButton.addEventListener("click", () => {

  location.href = "result.html";

});
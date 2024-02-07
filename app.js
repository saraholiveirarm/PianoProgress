const days = document.getElementsByName("day");
const streakDisplay = document.querySelector("#streak-count");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const resetBtn = document.querySelector("#reset");
const addStudyDaysBtn = document.querySelector("#add-study-days");
const clearBtn = document.querySelector("#clear");

let studiedDays = JSON.parse(localStorage.getItem("studiedDays")) || {};

let streakCounter = 0;

if (localStorage.getItem("streakCounter")) {
  streakCounter = parseInt(localStorage.getItem("streakCounter"));
}

function updateCounter() {
  localStorage.setItem("streakCounter", streakCounter);
  streakDisplay.value = streakCounter;
}

function add() {
  streakCounter++;
  updateCounter();
}

function subtract() {
  streakCounter--;
  updateCounter();
}

function reset() {
  streakCounter = 0;
  localStorage.removeItem("streakCounter");
  streakDisplay.value = streakCounter;
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
resetBtn.addEventListener("click", reset);
addStudyDaysBtn.addEventListener("click", () => {
  let checkedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  streakCounter += checkedCheckboxes;
  updateCounter();
});
clearBtn.addEventListener("click", () => {
  days.forEach((day) => (day.checked = false));
  localStorage.removeItem("studiedDays");
});

function saveLocally() {
  localStorage.setItem("studiedDays", JSON.stringify(studiedDays));
}

days.forEach((day) => {
  day.addEventListener("click", (e) => {
    let id = e.target.id;

    if (day.checked == true) {
      studiedDays[id] = "studied";
      saveLocally();
    } else {
      studiedDays[id] = null;
      saveLocally();
    }
  });
});

days.forEach((day) => {
  let id = day.id;
  if (studiedDays[id] == "studied") {
    day.checked = true;
  }
});

streakDisplay.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (!isNaN(streakDisplay.value)) {
      localStorage.setItem("streakCounter", streakDisplay.value);
    }
  }
});

streakDisplay.value = streakCounter;

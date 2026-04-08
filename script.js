let exercises = [
  "Squat",
  "Leg Press",
  "Hamstring Curl",
  "Calf Raises"
];

const table = document.getElementById("workoutTable");

function createTable() {
  table.innerHTML = "";

  exercises.forEach((exercise) => {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.innerText = exercise;
    row.appendChild(nameCell);

    for (let i = 0; i < 4; i++) {
      let cell = document.createElement("td");

      let weightInput = document.createElement("input");
      weightInput.placeholder = "lbs";
      weightInput.type = "number";
      weightInput.id = `${exercise}-set${i}-weight`;

      let repsInput = document.createElement("input");
      repsInput.placeholder = "reps";
      repsInput.type = "number";
      repsInput.id = `${exercise}-set${i}-reps`;

      // Recalculate volume when typing
      weightInput.oninput = calculateVolume;
      repsInput.oninput = calculateVolume;

      cell.appendChild(weightInput);
      cell.appendChild(document.createElement("br"));
      cell.appendChild(repsInput);

      row.appendChild(cell);
    }

    // Volume cell
    let volumeCell = document.createElement("td");
    volumeCell.id = `${exercise}-volume`;
    volumeCell.innerText = "0";
    row.appendChild(volumeCell);

    table.appendChild(row);
  });
}

function calculateVolume() {
  exercises.forEach(exercise => {
    let total = 0;

    for (let i = 0; i < 4; i++) {
      let weight = parseInt(document.getElementById(`${exercise}-set${i}-weight`)?.value) || 0;
      let reps = parseInt(document.getElementById(`${exercise}-set${i}-reps`)?.value) || 0;

      total += weight * reps;
    }

    let volumeCell = document.getElementById(`${exercise}-volume`);
    volumeCell.innerText = total;

    checkPR(exercise, total);
  });
}

function checkPR(exercise, volume) {
  let prs = JSON.parse(localStorage.getItem("prs")) || {};

  if (!prs[exercise] || volume > prs[exercise]) {
    prs[exercise] = volume;
    localStorage.setItem("prs", JSON.stringify(prs));

    let cell = document.getElementById(`${exercise}-volume`);
    cell.style.color = "lime";
  }
}

function saveData() {
  let data = {};

  exercises.forEach(exercise => {
    data[exercise] = [];

    for (let i = 0; i < 4; i++) {
      let weight = document.getElementById(`${exercise}-set${i}-weight`).value;
      let reps = document.getElementById(`${exercise}-set${i}-reps`).value;

      data[exercise].push({ weight, reps });
    }
  });

  localStorage.setItem("workoutData", JSON.stringify(data));
  localStorage.setItem("exerciseList", JSON.stringify(exercises));

  alert("Workout Saved!");
}

function loadData() {
  let savedExercises = JSON.parse(localStorage.getItem("exerciseList"));
  if (savedExercises) exercises = savedExercises;

  createTable();

  let saved = localStorage.getItem("workoutData");
  if (!saved) return;

  let data = JSON.parse(saved);

  exercises.forEach(exercise => {
    data[exercise]?.forEach((set, i) => {
      document.getElementById(`${exercise}-set${i}-weight`).value = set.weight;
      document.getElementById(`${exercise}-set${i}-reps`).value = set.reps;
    });
  });

  calculateVolume();
}

function addExercise() {
  let name = prompt("Enter exercise name:");
  if (!name) return;

  exercises.push(name);
  localStorage.setItem("exerciseList", JSON.stringify(exercises));

  createTable();
}

window.onload = loadData;

// ===== FORMAT ID (fix spaces issue) =====
function formatId(name) {
  return name.replace(/\s+/g, "-").toLowerCase();
}

// ===== DEFAULT EXERCISES =====
let exercises = ["Squat", "Leg Press", "Hamstring Curl", "Calf Raises"];

// ===== GET TABLE =====
const table = document.getElementById("workoutTable");

// ===== CREATE TABLE =====
function createTable() {
  table.innerHTML = "";

  exercises.forEach((exercise) => {
    let row = document.createElement("tr");

    // Exercise name
    let nameCell = document.createElement("td");
    nameCell.innerText = exercise;
    row.appendChild(nameCell);

    // Sets
    for (let i = 0; i < 4; i++) {
      let cell = document.createElement("td");

      let weightInput = document.createElement("input");
      weightInput.type = "number";
      weightInput.placeholder = "lbs";
      weightInput.id = `${formatId(exercise)}-set${i}-weight`;

      let repsInput = document.createElement("input");
      repsInput.type = "number";
      repsInput.placeholder = "reps";
      repsInput.id = `${formatId(exercise)}-set${i}-reps`;

      // Update volume live
      weightInput.oninput = calculateVolume;
      repsInput.oninput = calculateVolume;

      cell.appendChild(weightInput);
      cell.appendChild(document.createElement("br"));
      cell.appendChild(repsInput);

      row.appendChild(cell);
    }

    // Volume column
    let volumeCell = document.createElement("td");
    volumeCell.id = `${formatId(exercise)}-volume`;
    volumeCell.innerText = "0";

    row.appendChild(volumeCell);

    table.appendChild(row);
  });
}

// ===== CALCULATE VOLUME =====
function calculateVolume() {
  exercises.forEach((exercise) => {
    let total = 0;

    for (let i = 0; i < 4; i++) {
      let weight =
        parseInt(
          document.getElementById(`${formatId(exercise)}-set${i}-weight`)?.value
        ) || 0;

      let reps =
        parseInt(
          document.getElementById(`${formatId(exercise)}-set${i}-reps`)?.value
        ) || 0;

      total += weight * reps;
    }

    let volumeCell = document.getElementById(
      `${formatId(exercise)}-volume`
    );

    if (volumeCell) {
      volumeCell.innerText = total;
    }
  });
}

// ===== ADD EXERCISE =====
function addExercise() {
  let name = prompt("Enter exercise name:");

  if (!name) return;

  exercises.push(name);

  // Save updated list
  localStorage.setItem("exerciseList", JSON.stringify(exercises));

  createTable();
}

// ===== SAVE WORKOUT =====
function saveData() {
  let date = document.getElementById("workoutDate").value;

  if (!date) {
    alert("Please select a date first!");
    return;
  }

  let allData = JSON.parse(localStorage.getItem("allWorkouts")) || {};

  let workout = {};

  exercises.forEach((exercise) => {
    workout[exercise] = [];

    for (let i = 0; i < 4; i++) {
      let weight = document.getElementById(
        `${formatId(exercise)}-set${i}-weight`
      ).value;

      let reps = document.getElementById(
        `${formatId(exercise)}-set${i}-reps`
      ).value;

      workout[exercise].push({ weight, reps });
    }
  });

  allData[date] = workout;

  localStorage.setItem("allWorkouts", JSON.stringify(allData));
  localStorage.setItem("exerciseList", JSON.stringify(exercises));

  alert("Workout saved for " + date);
}

// ===== LOAD BY DATE =====
function loadByDate() {
  let date = document.getElementById("workoutDate").value;

  if (!date) {
    alert("Select a date!");
    return;
  }

  let allData = JSON.parse(localStorage.getItem("allWorkouts")) || {};
  let workout = allData[date];

  if (!workout) {
    alert("No workout found for this date.");
    return;
  }

  exercises.forEach((exercise) => {
    workout[exercise]?.forEach((set, i) => {
      let weightInput = document.getElementById(
        `${formatId(exercise)}-set${i}-weight`
      );

      let repsInput = document.getElementById(
        `${formatId(exercise)}-set${i}-reps`
      );

      if (weightInput) weightInput.value = set.weight;
      if (repsInput) repsInput.value = set.reps;
    });
  });

  calculateVolume();
}

// ===== LOAD ON START =====
function loadData() {
  let savedExercises = JSON.parse(localStorage.getItem("exerciseList"));

  if (savedExercises) {
    exercises = savedExercises;
  }

  createTable();
}

// ===== INIT =====
window.onload = loadData;

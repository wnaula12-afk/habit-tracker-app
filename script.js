const exercises = [
  "Squat",
  "Leg Press",
  "Hamstring Curl",
  "Calf Raises"
];

const table = document.getElementById("workoutTable");

function createTable() {
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

      cell.appendChild(weightInput);
      cell.appendChild(document.createElement("br"));
      cell.appendChild(repsInput);

      row.appendChild(cell);
    }

    table.appendChild(row);
  });
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
  alert("Workout Saved!");
}

function loadData() {
  let saved = localStorage.getItem("workoutData");
  if (!saved) return;

  let data = JSON.parse(saved);

  exercises.forEach(exercise => {
    data[exercise]?.forEach((set, i) => {
      document.getElementById(`${exercise}-set${i}-weight`).value = set.weight;
      document.getElementById(`${exercise}-set${i}-reps`).value = set.reps;
    });
  });
}

createTable();
window.onload = loadData;

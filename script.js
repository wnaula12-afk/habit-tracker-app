const exercises = [
  "Squat",
  "Leg Press",
  "Hamstring Curl",
  "Calf Raises"
];

const table = document.getElementById("workoutTable");

function createTable() {
  exercises.forEach((exercise, rowIndex) => {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.innerText = exercise;
    row.appendChild(nameCell);

    for (let i = 0; i < 4; i++) {
      let cell = document.createElement("td");
      let input = document.createElement("input");

      input.type = "text";
      input.id = `${exercise}-set${i}`;

      cell.appendChild(input);
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
      let value = document.getElementById(`${exercise}-set${i}`).value;
      data[exercise].push(value);
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
    data[exercise]?.forEach((value, i) => {
      document.getElementById(`${exercise}-set${i}`).value = value;
    });
  });
}

createTable();
window.onload = loadData;

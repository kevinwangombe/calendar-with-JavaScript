import months from "./modules/months.js";
import daysOfWeek from "./modules/daysOfWeek.js";

const yearInput = document.getElementById("year");
const currentYear = new Date().getFullYear();
const mainContainer = document.getElementById("table");
let year;

// Select a year
yearInput.addEventListener("change", () => {
  year = yearInput.value;
  mainContainer.innerHTML = "";
  generateCalendars();
});

// Set current year as default value
yearInput.value = currentYear;
year = yearInput.value;

const generateCalendars = () => {
  // Create the days of the month
  const createDays = (month) => {
    const daysContainer = document.getElementById(`${month}-days`);
    let daysId = 1;
    for (let i = 0; i < 6; i++) {
      const week = document.createElement("tr");
      week.style.height = "50px";
      for (let j = 0; j < 7; j++) {
        const day = document.createElement("td");
        day.setAttribute("class", "days");
        day.setAttribute("id", `${month}-${daysId++}`);
        week.appendChild(day);
      }
      daysContainer.appendChild(week);
    }
  };

  // Set the number of the days
  const setDays = (month) => {
    // Get first day of month
    const firstDay = new Date(year, months.indexOf(month), 1)
      .toDateString()
      .split(" ")[0];

    // Get last day of month
    const lastDay = new Date(year, months.indexOf(month) + 1, 0)
      .toDateString()
      .split(" ")[2];
    let startDay;

    switch (firstDay) {
      case "Sun":
        startDay = 0;
        break;
      case "Mon":
        startDay = 1;
        break;
      case "Tue":
        startDay = 2;
        break;
      case "Wed":
        startDay = 3;
        break;
      case "Thu":
        startDay = 4;
        break;
      case "Fri":
        startDay = 5;
        break;
      case "Sat":
        startDay = 6;
        break;
      default:
        startDay = 0;
    }

    let daysCount = 1;
    for (let x = 1; x <= Number(lastDay); x++) {
      const d = document.getElementById(`${month}-${startDay + 1}`);
      d.textContent = daysCount++;
      startDay++;
    }
  };

  // Create 12 tables
  months.forEach((month) => {
    const div = document.createElement("div");
    div.setAttribute("class", "calendars");
    div.innerHTML = ` <table>
  <thead>
    <tr>
      <th class="year-display" colspan="7">
        <p>
          <span id=${month}-span class="month-span">${month}</span>
        </p>
      </th>
    </tr>
    <tr id=${month} class="weeksContainer"></tr>
  </thead>
  <tbody id=${month}-days class="daysContainer"></tbody>
</table>`;

    mainContainer.appendChild(div);

    // Create the days of the week
    const weekRow = document.getElementById(`${month}`);
    daysOfWeek.forEach((day) => {
      const dayHeader = document.createElement("th");
      dayHeader.textContent = day;
      dayHeader.setAttribute("class", "week");
      weekRow.appendChild(dayHeader);
    });
    createDays(month);
    setDays(month);
  });
};
generateCalendars();

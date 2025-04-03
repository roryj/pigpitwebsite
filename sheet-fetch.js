/** Fetch data from Google Sheets
 *
 * @param {string} sheetId
 * @param {string} gid
 * @returns {Promise<Array>} Returns a promise that resolves to an array of arrays
 */
async function fetchSheetData(sheetId, gid) {
  const spreadsheet_url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?gid=${gid}#gid=${gid}`;
  const result = await fetch(spreadsheet_url);

  console.log("Fetching data from Google Sheets...");
  const data = await result.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "text/html");
  const table = doc.querySelector("table");
  const rows = table.querySelectorAll("tr");
  const sheetData = [];
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowData = [];
    cells.forEach((cell) => {
      rowData.push(cell.textContent);
    });
    sheetData.push(rowData);
  });

  return sheetData;
}

/** Parses the data from the google sheets
 *
 * @param {Array} sheetData
 * @returns {Map} Returns a map, where the key is the meal name, and the value is the count
 */
async function parseSheetData(sheetData) {
  const valueCellColumn = 7;
  const mealCounts = new Map();
  const mealLocations = new Map([
    ["Main", 29],
    ["Side", 30],
    ["Dessert", 31],
    ["Drink", 32],
    ["Other", 33],
  ]);

  mealLocations.forEach((rowNumber, name) => {
    const cellValue = sheetData[rowNumber][valueCellColumn];
    mealCounts.set(name, parseInt(cellValue));
  });

  return mealCounts;
}

/** Renders the chart using Chart.js
 *
 * @param {Map} mealCounts
 */
async function renderChart(mealCounts) {
  // Fetch the google sheet data
  const ctx = document.getElementById("meal-counts").getContext("2d");
  const mealLabels = Array.from(mealCounts.keys());
  const mealValues = Array.from(mealCounts.values());
  const mealColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const mealData = {
    labels: mealLabels,
    datasets: [
      {
        labels: mealLabels,
        data: mealValues,
        backgroundColor: mealColors,
        borderColor: mealColors.map((color) => color.replace(")", ", 0.2)")),
        borderWidth: 1,
      },
    ],
  };
  const mealOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, ticks) {
            return value + " meals";
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Current Meal Count Types",
      },
    },
  };
  new Chart(ctx, {
    type: "bar",
    data: mealData,
    options: mealOptions,
  });
}

(async function () {
  // Fetch the google sheet data
  const sheetId = "1gDBTGcBYYvILIlibAdE644tW91NtpIKnV2Ukdhn4BHI";
  const gid = "0";
  const sheetData = await fetchSheetData(sheetId, gid);

  const mealCounts = await parseSheetData(sheetData);
  console.log("Meal counts:", mealCounts);

  await renderChart(mealCounts);

  // now that we have the meal counts, we can create the chart using chart.js
  console.log("Chart created successfully!");
})();

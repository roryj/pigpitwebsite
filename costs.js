
(async function() {
  const result = await fetch("./costs.json");

  const costs = await result.json();
  console.log(costs);

  costs.forEach(yearlyCostBreakdown => {
    const year = yearlyCostBreakdown["year"]; 
    const expenditures = yearlyCostBreakdown["expenditures"];

    const byCategoryMapping = byCategory(expenditures);

    const yearlyTotalCosts = totalCosts(expenditures);
    const yearlyTotalRevenue = totalRevenue(expenditures);
    const yearlyTotalOperatingExpense = (yearlyTotalCosts + yearlyTotalRevenue).toFixed(2);

    const totalCostHtml = document.getElementById(`${year}-total-cost`);
    totalCostHtml.textContent = `Operating Cost: ($${yearlyTotalCosts})\r\n\r\nRevenue: $${-yearlyTotalRevenue}\r\n\r\nTotal: ($${yearlyTotalOperatingExpense})`;

    const labelOrdering = Object.keys(byCategoryMapping); 
    console.log(`LABELS: ${labelOrdering}`);

    // with X labels, then we need each dataset to include an array containing the data for that label:
    // ex: [labelA, labelB, labelC]
    // with data only applying to labelB, this would mean we would need to write the dataset as
    // [0, <number needed here>, 0]
    const datasets = Object.entries(byCategoryMapping).map((keyValue, index) => {
        const expenditures = keyValue[1];

        return expenditures.map((exp) => {
            const baseArray = Array(labelOrdering.length).fill(0);
            baseArray[index] = exp.cost.toFixed(2);
            return {
                data: baseArray,
                label: exp.name
            }
        });
    }).flat();
    

    new Chart(
        document.getElementById(`${year}-costs`),
        {
            type: 'bar',
            data: {
                labels: labelOrdering,
                datasets: datasets
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true
                  }
                }
            }
        }
    );

    // show table
    const tableBody = document.getElementById(`${year}-cost-table`);
    expenditures.forEach(item => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const costCell = document.createElement('td');
        costCell.textContent = `$${item.cost.toFixed(2)}`;
        row.appendChild(costCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = item.category;
        row.appendChild(categoryCell);

        tableBody.appendChild(row);
    });
  });

})();

/**
 * 
 * @param {JSON} costs 
 * @returns {Map} returns a map, where the key is the category name, and the
 *                  value is the array of items in the category
 */
function byCategory(costs) {
    var byCategoryMapping = {};

    costs.forEach(c => {
        var categoryEntries = c.category in byCategoryMapping ? byCategoryMapping[c.category] : []; 
        categoryEntries.push(c);
        byCategoryMapping[c.category] = categoryEntries
    });
    return byCategoryMapping
}

/**
 * @param {JSON} expenditures 
 * @returns {Number} returns the total for all purchases for a given year
 */
function totalCosts(expenditures) {
    return parseFloat(expenditures.filter((item, _a, _b) => item.cost > 0).reduce((total, cost) => total + (cost.cost || 0), 0).toFixed(2));
}

/**
 * @param {JSON} expenditures
 * @returns {Number} returns the total for all revenue for a given year
 */
function totalRevenue(expenditures) {
    return parseFloat(expenditures.filter((item, _a, _b) => item.cost < 0).reduce((total, cost) => total + (cost.cost || 0), 0).toFixed(2));
}
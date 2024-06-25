
(async function() {
  const result = await fetch("./costs.json");

  const costs = await result.json();
  console.log(costs);

  costs.forEach(yearlyCostBreakdown => {
    const year = yearlyCostBreakdown["year"]; 
    const expenditures = yearlyCostBreakdown["expenditures"];

    const byCategoryMapping = byCategory(expenditures);
    const yearlyTotal = totalCost(expenditures);

    const totalCostHtml = document.getElementById(`${year}-total-cost`);
    totalCostHtml.textContent = `Total: $${yearlyTotal}`;

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
            baseArray[index] = exp.cost;
            return {
                data: baseArray,
                label: exp.name
            }
        });
    }).flat();
    
    console.log(`DATASETS: ${datasets}`)

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
                    // title: {
                    //     display: true,
                    //     text: 'test this title'
                    // }
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
    )
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
 * 
 * @param {JSON} expenditures 
 * @returns {Number} returns the total cost of every item in the year
 */
function totalCost(expenditures) {
    return expenditures.reduce((total, cost) => total + (cost.cost || 0), 0);
}

(async function() {
  const result = await fetch("./costs.json");

  const costs = await result.json();
  console.log(costs);

  costs.forEach(yearlyCostBreakdown => {
    const year = yearlyCostBreakdown["year"]; 
    const expenditures = yearlyCostBreakdown["expenditures"];

    const byCategoryCosts = byCategory(expenditures);
    const yearlyTotal = totalCost(expenditures);

    const totalCostHtml = document.getElementById(`${year}-total-cost`);
    totalCostHtml.textContent = `$${yearlyTotal}`;

    new Chart(
        document.getElementById(`${year}-costs`),
        {
            type: 'bar',
            data: {
                labels: Object.keys(byCategoryCosts),
                datasets: [
                    {
                        data: Object.values(byCategoryCosts)
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'test this title'
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
 *                  value is the cost for the category
 */
function byCategory(costs) {
    var byCategoryCosts = {};

    costs.forEach(c => {
        var categoryCost = c.category in byCategoryCosts ? byCategoryCosts[c.category] : 0; 
        categoryCost += c.cost
        byCategoryCosts[c.category] = categoryCost
    });
    return byCategoryCosts
}

/**
 * 
 * @param {JSON} expenditures 
 * @returns {Number} returns the total cost of every item in the year
 */
function totalCost(expenditures) {
    return expenditures.reduce((total, cost) => total + (cost.cost || 0), 0);
}
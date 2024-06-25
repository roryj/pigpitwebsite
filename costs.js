
(async function() {
  const result = await fetch("./costs.json");

  const costs = await result.json();
  console.log(costs);

  costs.forEach(yearlyCostBreakdown => {
    const year = yearlyCostBreakdown["year"]; 
    const costs = yearlyCostBreakdown["costs"];

    const byCategoryCosts = byCategory(costs);

    new Chart(
        document.getElementById(`${year}-costs`),
        {
            type: 'bar',
            data: {
                labels: Object.keys(byCategoryCosts),
                datasets: [
                    {
                        label: "$",
                        data: Object.values(byCategoryCosts)
                    }
                ]
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
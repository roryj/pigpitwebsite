
(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  const result = await fetch("./costs.json");

  const costs = await result.json();
  console.log(costs);

  costs.forEach(yearlyCostBreakdown => {
    const year = yearlyCostBreakdown["year"]; 
    const costs = yearlyCostBreakdown["costs"];

    new Chart(
        document.getElementById(`${year}-costs`),
        {
            type: 'bar',
            data: {
                labels: costs.map(c => c.name),
                datasets: [
                    {
                        label: "huh",
                        data: costs.map(c => c.cost)
                    }
                ]
            }
        }
    )
  });

//   new Chart(
//     document.getElementById('2023-costs'),
//     {
//       type: 'bar',
//       data: {
//         labels: data.map(row => row.year),
//         datasets: [
//           {
//             label: 'Acquisitions by year',
//             data: data.map(row => row.count)
//           }
//         ]
//       }
//     }
//   );
})();
// d3.csv("data/ages.csv").then((data)=> {
// 	console.log(data);
// });

// d3.tsv("data/ages.tsv").then((data)=> {
// 	console.log(data);
// });

// d3.json("data/ages.json").then((data)=> {
// 	console.log(data);
// });

d3.json("data/ages.json")
  .then(data => {
    data.forEach(d => {
      d.age = +d.age;
    });
    console.log(data);

    const svgWidth = 800;
    const svgHeight = 600;
    const svg = d3.select("#chart-area")
                  .append("svg")
                  .attr("width", svgWidth)
                  .attr("height", svgHeight);

    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", (d, i) => 20 + i * 80)
       .attr("cy", svgHeight / 4)
       .attr("r", d => d.age* 2)
       .attr("fill", d => d.age > 10 ? "orange" : "purple");
  })
  .catch(error => {
    console.error("Error loading data: ", error);
  });



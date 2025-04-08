d3.json("data/buildings.json")
  .then(data => {
    data.forEach(d => {
      d.height = +d.height;
    });
    console.log(data);

    const svgWidth = 800;
    const svgHeight = 800;

    const svg = d3.select("#chart-area")
                  .append("svg")
                  .attr("width", svgWidth)
                  .attr("height", svgHeight);

    svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
         .attr("x", (d, i) => i * 70)
         .attr("y", d => svgHeight - d.height/2)
         .attr("width", 50)
         .attr("height", d => d.height/2)
         .attr("fill", "orange");
  })
  .catch(error => {
    console.error("Error loading buildings data: ", error);
  });

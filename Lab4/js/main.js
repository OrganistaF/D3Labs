d3.json("data/buildings.json")
  .then(data => {
    data.forEach(d => {
      d.height = +d.height;
    });
    console.log(data);
	
	const svgWidth = 500;
    const svgHeight = 500;
    const svg = d3.select("#chart-area")
                  .append("svg")
                  .attr("width", svgWidth)
                  .attr("height", svgHeight);

    const chartWidth = 400;
    const chartHeight = 400;
    const margin = { top: 50, left: 50 };

    const x = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([0, chartWidth])
                .paddingInner(0.3)
                .paddingOuter(0.3);

    const y = d3.scaleLinear()
                .domain([0, 828])
                .range([chartHeight, 0]);

    const color = d3.scaleOrdinal()
                    .domain(data.map(d => d.name))
                    .range(d3.schemeSet3);

    svg.selectAll("rect")
    	.data(data)
		.enter()
    	.append("rect")
    	.attr("x", d => margin.left + x(d.name))
        .attr("y", d => margin.top + y(d.height))
        .attr("width", x.bandwidth())
        .attr("height", d => chartHeight - y(d.height))
        .attr("fill", d => color(d.name));
  })
  .catch(error => {
    console.error("Error loading buildings data: ", error);
  });

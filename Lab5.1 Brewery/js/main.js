d3.json("data/revenues.json")
  .then(data => {
    data.forEach(d => {
      d.revenue = +d.revenue;
    });

    const svgWidth = 800;
    const svgHeight = 500;
    const margin = { top: 20, right: 20, bottom: 80, left: 80 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#chart-area")
                  .append("svg")
                  .attr("width", svgWidth)
                  .attr("height", svgHeight);

    const g = svg.append("g")
                 .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
                .domain(data.map(d => d.month))
                .range([0, width])
                .padding(0.2);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.revenue)])
                .range([height, 0])
                .nice();

    const xAxisCall = d3.axisBottom(x);

    const yAxisCall = d3.axisLeft(y)
                        .tickFormat(d => `$${d / 1000}K`)
                        .ticks(6);

    g.append("g")
     .attr("class", "x-axis")
     .attr("transform", `translate(0, ${height})`)
     .call(xAxisCall);

    g.append("g")
     .attr("class", "y-axis")
     .call(yAxisCall);

    g.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
       .attr("x", d => x(d.month))
       .attr("y", d => y(d.revenue))
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.revenue))
       .attr("fill", "yellow"); 

    g.append("text")
     .attr("class", "x-label")
     .attr("x", width / 2)
     .attr("y", height + 50)
     .attr("text-anchor", "middle")
     .text("Month");

    g.append("text")
     .attr("class", "y-label")
     .attr("text-anchor", "middle")
     .attr("transform", "rotate(-90)")
     .attr("x", -height / 2)
     .attr("y", -50)
     .text("Revenue (dills.)");
  })
  .catch(err => {
    console.error("Error loading data: ", err);
  });

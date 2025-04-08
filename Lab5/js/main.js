d3.json("data/buildings.json")
  .then(data => {
    data.forEach(d => { d.height = +d.height; });
    const svgWidth = 600, svgHeight = 400;
    const margin = { left: 60, right: 10, top: 10, bottom: 150 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#chart-area")
                  .append("svg")
                  .attr("width", svgWidth)
                  .attr("height", svgHeight);
    const g = svg.append("g")
                 .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([0, width])
                .paddingInner(0.3)
                .paddingOuter(0.3);

    const y = d3.scaleLinear()
                .domain([0, 828])
                .range([height, 0]);

    const rects = g.selectAll("rect")
                   .data(data)
                   .enter()
                   .append("rect")
                     .attr("x", d => x(d.name))
                     .attr("width", x.bandwidth())
                     .attr("y", d => y(d.height))
                     .attr("height", d => height - y(d.height))
                     .attr("fill", "grey");

    const xAxisCall = d3.axisBottom(x);
    g.append("g")
     .attr("class", "x axis")
     .attr("transform", `translate(0, ${height})`)
     .call(xAxisCall)
     .selectAll("text")
       .attr("text-anchor", "end")
       .attr("dx", "-5")
       .attr("dy", "10")
       .attr("transform", "rotate(-40)");

    const yAxisCall = d3.axisLeft(y)
                        .ticks(5)
                        .tickFormat(d => d + " m");
    g.append("g")
     .attr("class", "y axis")
     .call(yAxisCall);

    svg.append("text")
       .attr("class", "x axis-label")
       .attr("x", svgWidth / 2)
       .attr("y", svgHeight - margin.bottom + 150)
       .attr("text-anchor", "middle")
       .text("The world's tallest buildings");

    
    svg.append("text")
       .attr("class", "y axis-label")
       .attr("x", -(height / 2))
       .attr("y", 10)
       .attr("text-anchor", "middle")
       .attr("transform", "rotate(-90)")
       .text("Height (m)");
  })
  .catch(error => {
    console.error("Error loading buildings data: ", error);
  });

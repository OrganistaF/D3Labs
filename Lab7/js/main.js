var margin = { top: 20, right: 20, bottom: 80, left: 80 },
    svgWidth = 800,
    svgHeight = 500,
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var flag = true;

var svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

var g = svg.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().range([0, width]).padding(0.2);
var y = d3.scaleLinear().range([height, 0]);

var xAxisGroup = g.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")");

var yAxisGroup = g.append("g")
                  .attr("class", "y axis");

var xAxisCall = d3.axisBottom(x);
var yAxisCall = d3.axisLeft(y)
                  .ticks(6)
                  .tickFormat(function(d) { return "$" + d/1000 + "K"; });

g.append("text")
 .attr("class", "x axis-label")
 .attr("x", width / 2)
 .attr("y", height + 60)
 .attr("text-anchor", "middle")
 .text("Month");

var yLabel = g.append("text")
              .attr("class", "y axis-label")
              .attr("x", -height / 2)
              .attr("y", -50)
              .attr("text-anchor", "middle")
              .attr("transform", "rotate(-90)")
              .text("Revenue");

d3.json("data/revenues.json").then(function(data) {
  data.forEach(function(d) {
    d.revenue = +d.revenue;
    d.profit  = +d.profit;
  });

  update(data);

  d3.interval(function() {
    var newData = flag ? data : data.slice(1);
    update(newData);
    flag = !flag;
  }, 1000);
}).catch(function(error) {
  console.error(error);
});

function update(data) {
  var value = flag ? "revenue" : "profit";

  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d[value]; })]);

  xAxisGroup.call(xAxisCall);
  yAxisGroup.call(yAxisCall);

  yLabel.text(flag ? "Revenue" : "Profit");

  var bars = g.selectAll("rect")
              .data(data, function(d) { return d.month; });

  bars.exit().remove();

  bars.transition().duration(500)
      .attr("x", function(d) { return x(d.month); })
      .attr("y", function(d) { return y(d[value]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[value]); })
      .attr("fill", "yellow");

  bars.enter().append("rect")
      .attr("x", function(d) { return x(d.month); })
      .attr("y", function(d) { return y(d[value]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[value]); })
      .attr("fill", "yellow");
}

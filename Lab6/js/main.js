/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")

	.attr("width", 400)

	.attr("height", 400);

// Add a circle to the svg with center at (100, 250) and a radius of 70 or color blue.

var circle = svg.append("circle")

	.attr("cx", 100)

	.attr("cy", 250)

	.attr("r", 70)

	.attr("fill", "blue");

// Add a rectangle with upper left corner at (20, 20) of width 20 and height 30 or color red.

var rect = svg.append("rect")

	.attr("x", 20)

	.attr("y", 20)

	.attr("width", 20)

	.attr("height", 20)

	.attr("fill","red");
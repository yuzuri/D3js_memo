
var dataset = [300, 130, 5, 60, 240]

d3.select("#myGraph")
    .append("rect")
    .attr("x", 100)
    .attr("y", 0)
    .attr("width", dataset[0])
    .attr("height", "20px");

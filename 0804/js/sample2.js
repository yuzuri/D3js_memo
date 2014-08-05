
var dataset = [300, 130, 5, 60, 240]

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 25)
    .attr("width", dataset[0])
    .attr("height", "20px");

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 50)
    .attr("width", dataset[1])
    .attr("height", "20px");

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 75)
    .attr("width", dataset[2])
    .attr("height", "20px");

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 100)
    .attr("width", dataset[3])
    .attr("height", "20px");

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 125)
    .attr("width", dataset[4])
    .attr("height", "20px");

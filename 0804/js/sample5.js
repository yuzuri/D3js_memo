

var dataset = [];
	for(var i=0; i<10; i++){
	    dataset[i] = Math.floor(Math.random() * 320);
	}

d3.select("#myGraph")
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", function(d, i){
	return i *20;
    })
    .attr("width", function(d, i){
	return d;
    })
    .attr("height", 10)
    .on("click", function(){
	d3.select(this)
	    .style("fill", "cyan")
    })

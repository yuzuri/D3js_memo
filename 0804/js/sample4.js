
var dataset = [300, 130, 5, 60, 240, 100, 200, 2];

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


// ボタンクリック時の処理
d3.select("#updateButton")
    .on("click", function(){
	for(var i=0; i<dataset.length; i++){
	    dataset[i] = Math.floor(Math.random() * 320);
	}
	d3.select("#myGraph")
	    .selectAll("rect")
	    .data(dataset)
	    .transition()
	    .delay(function(d, i){
		return i*500;
	    })
	    .duration(1000)
	    .attr("width", function(d, i){
		return d;
	    })
    })

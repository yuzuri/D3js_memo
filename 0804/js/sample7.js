
var randmax = 200;

var dataset = [];
for(var i=0; i<5; i++){
    dataset[i] = Math.floor(Math.random() * randmax);
}

d3.select("#myGraph")
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", function(d, i){
	return i *25;
    })
    .attr("width", function(d, i){
	return d;
    })
    .attr("height", 20)


//目盛りを表示させるためのリニアスケールを設定する
var xScale = d3.scale.linear()
    .domain([0,d3.max(dataset)])
    .range([0,d3.max(dataset)]);
//目盛りを設定し、表示する
d3.select("#myGraph")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(10, " + ((1+dataset.length) * 20+5) + ")")
    .call(d3.svg.axis()
	  .scale(xScale)
	  .orient("bottom")
	 )


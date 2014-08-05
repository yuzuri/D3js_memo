
d3.csv("mydata.csv", function(error, data){

    var dataset = [];
    for(var i=0; i<data.length; i++){
	dataset.push(data[i]["item1"]);
    }
    
    d3.select("#myGraph")
	.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("x", function(d, i){
	    return 0;
	})
	.attr("y", function(d, i){
	    return i*20;
	})
	.attr("width", function(d, i){
	    return d;
	})
	.attr("height", 10)
	/*.transition()
	.duration(function(d, i){
	    return d*10;
	})*/
	// .attr("width", function(d, i){
	//     //console.log(i + " = " + d);
	//     return d/2;
	// })
	.call(function(elements){
	    elements.each(function(d, i){
		console.log(i + "th data = " + d);
	    })
	})

    
})



//svg要素のサイズを求める
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");

svgWidth = parseFloat(svgWidth); // 単位を削除する
svgHeight = parseFloat(svgHeight); // 単位を削除する

var offsetX = 30;
var offsetY = 30;
var scale = 2.0;

//svgWidth =  svgWidth - offsetX;
//svgHeight = svgHeight - offsetY;

var dataset =[];
var randmax = 300;
for(var i=0; i<10; i++){
    dataset[i] = Math.floor(Math.random() * randmax);
}

var margin = svgWidth / (dataset.length -1)

var line = d3.svg.line()
    .x(function(d, i){
	return offsetX + i * margin;
    })
    .y(function(d, i){
	return svgHeight - (d * scale) - offsetY;
    })


//折れ線を描写
var lineElements = d3.select("#myGraph")
    .append("path")
    .attr("class", "line")
    .attr("d", line(dataset))

//目盛りを表示するためにスケールを設定
var yScale = d3.scale.linear()
    .domain([0, randmax])
    .range([scale*randmax, 0])

//目盛りを表示するためにスケールを設定
var xScale = d3.scale.linear()
    .domain([0, dataset.length])
    .range([dataset.length, 0])



//目盛りを表示
d3.select("#myGraph")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + offsetX + ", " +  offsetY + ")")
    .call(
	d3.svg.axis()
	    .scale(yScale)
	    .orient("left")
    )

// d3.select("#myGraph")
//     .append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(" + offsetX + ", " +  offsetY + ")")
//     .call(
// 	d3.svg.axis()
// 	    .scale(xScale)
// 	    .orient("bottom")
//     )

// //横方向の線を表示する
d3.select("#myGraph")
    .append("rect")
    .attr("class", "axis_x")
    .attr("width", svgWidth)
    .attr("height", 1)
    .attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY - 0.5) + ")")



//svg要素のサイズを求める
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
svgWidth = parseFloat(svgWidth); // 単位を削除する
svgHeight = parseFloat(svgHeight); // 単位を削除する

var blocksize = 20;

var svg = d3.select("#myGraph");

//配列のサイズを使って、データを乱数化
var datasize = 96;
var randmax = 10;
var dataset = new Array(datasize);
for(var i=0; i< datasize; i++){
    dataset[i] = Math.floor(Math.random() * randmax);
    //document.write(dataset[i] + " ");
}



var color = d3.interpolateHsl("blue", "yellow"); //青色から黄色に補間する
var maxValue = d3.max(dataset);

var heatMap = d3.select("#myGraph")
    .selectAll("rect")
    .data(dataset) //データのセット

heatMap.enter()
    .append("rect")
    .attr("class", "block")
    .attr("x", function(d, i){
	return (i % 8) * blocksize;
    })
    .attr("y", function(d, i){
	return Math.floor(i/8) * blocksize;
    })
    .attr("width", function(d, i){
	return blocksize;
    })
    .attr("height", function(d, i){
	return blocksize;
    })
//htmlソースのstyle部分で.blockクラスにfill:noneとしていると色が表示されない
    .attr("fill", function(d, i){
	return color(d/randmax);
    })
   

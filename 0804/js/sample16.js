
//svg要素のサイズを求める
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
svgWidth = parseFloat(svgWidth); // 単位を削除する
svgHeight = parseFloat(svgHeight); // 単位を削除する

var blocksize = 20;
var svg = d3.select("#myGraph");


// 4000 * 1000 = 4000000
//配列のサイズを使って、データを乱数化
var datasize = 96
var xsize = 8
var ysize = datasize / xsize;
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



//何度も呼び出すからここで分けている？ 本来は連続したメソッドとして書いてもおーけーなはず
heatMap.enter()
    .append("rect")
    .attr("class", "block")
    .attr("x", function(d, i){
	return (i % xsize) * blocksize;
    })
    .attr("y", function(d, i){
	return Math.floor(i/xsize) * blocksize;
    })
    .attr("width", function(d, i){
	return blocksize;
    })
    .attr("height", function(d, i){
	return blocksize;
    })
//htmlソースのstyle部分で.blockクラスにfill:noneとしていると色が表示されない
//誤植か、どこか自分の見落としか
    .attr("fill", function(d, i){
	return color(d/maxValue);
    })


//ヒートマップをタイマーを使って更新する
// 1000[msec]ごとに画面を更新する
setInterval(function(){
    for(var i=0; i< dataset.length; i++){
	dataset[i] = Math.random() * randmax;
	//dataset[i] = 0.0;
	if(dataset[i] < 0){ dataset[i] = 0;}
	if(dataset[i] >= randmax){ dataset[i] = 0.0;}
    }
    maxValue = d3.max(dataset);
    heatMap.data(dataset)
	.style("fill", function(d, i){ //色をつける
	    return color(d, maxValue);
	})
}, 1000);

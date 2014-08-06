
//svg要素のサイズを求める
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
svgWidth = parseFloat(svgWidth); // 単位を削除する
svgHeight = parseFloat(svgHeight); // 単位を削除する


var timeduration = 2000;

//2次元配列のサイズを初期化
var datasize = 20;
var randmax = svgWidth;
var dataset = new Array(datasize);
for(var i=0; i< datasize; i++){
    dataset[i] = new Array(datasize)
    dataset[i][0] = Math.floor(Math.random() * randmax);
    dataset[i][1] = Math.floor(Math.random() * randmax);
}



var circleElements = d3.select("#myGraph")
    .selectAll("circle")
    .data(dataset)
circleElements
    .enter()
    .append("circle")
    .attr("class", "mark") //CSSのうちmarkを指定
    .attr("cx", function(d, i){ //circleのx座標
	return d[0];
    })
    .attr("cy", function(d, i){ //circleのy座標
	return svgHeight - d[1];
    })
    .attr("r", 5);  //半径



//データセットの更新
function updateData(data){
    for(var i=0; i< datasize; i++){
	dataset[i][0] = Math.floor(Math.random() * randmax);
	dataset[i][1] = Math.floor(Math.random() * randmax);
    }
}


//散布図を更新
function updateGraph(){
    circleElements
	.data(dataset)
	.transition()
	.duration(timeduration)
	.delay(function(d, i){
	    return timeduration - timeduration/datasize * i;
	})
	.attr("cx", function(d, i){
	    return d[0];
	})
	.attr("cy", function(d, i){
	    return svgHeight - d[1];
	})
}

//タイマーを使って2秒毎に位置を更新する
setInterval(function(){
    updateData(dataset);
    updateGraph();
}, timeduration * 0.9);

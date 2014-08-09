
//svg要素のサイズを求める
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
svgWidth = parseFloat(svgWidth); // 単位を削除する
svgHeight = parseFloat(svgHeight); // 単位を削除する

var svg = d3.select("#myGraph");

//軸のためのoffset
var offsetX = 30;
var offsetY = 30;

// 表示する円の半径
var radius = 30;

var timeduration = 4000;

//2次元配列のサイズを初期化
var datasize = 40;
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

circleElements.enter()
    .append("circle")
    .attr("class", "mark") //CSSのうちmarkを指定
    .attr("cx", function(d, i){ //circleのx座標
	return d[0] + offsetX;
    })
    .attr("cy", function(d, i){ //circleのy座標
	return svgHeight - d[1] - offsetY;
    })
    .attr("r", radius);  //半径


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
	//.duration(timeduration)
	// .delay(function(d, i){
	//     return timeduration - timeduration/datasize * i;
	// })
	.attr("cx", function(d, i){
	    return d[0] + offsetX;
	})
	.attr("cy", function(d, i){
	    return svgHeight - d[1] - offsetY;
	})
}





//目盛りの表示
function drawScale(){
    var maxX = d3.max(dataset, function(d, i){
	return d[0];
    });
    var maxY = d3.max(dataset, function(d, i){
	return d[1];
    });
    //目盛りを表示するためにスケールを設定
    var yScale = d3.scale.linear()
	.domain([0, maxY])
	.range([maxY, 0])

    //目盛りを表示
    svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + offsetX + ", " + (svgHeight - maxY - offsetY) + ")")
	.call(
	    d3.svg.axis()
		.scale(yScale)
		.orient("left")
	)
    
    
    //横の目盛りを表示するためにスケールを設定
    var xScale = d3.scale.linear()
	.domain([0, maxX])
	.range([0, maxX])
    
    //目盛りを表示する
    svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
	.call(
	    d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
	)

    //グリッドの表示
    var grid = svg.append("g");
    //横方向と縦方向のグリッド間隔を自動生成
    var rangeX = d3.range(maxX/20.0, maxX, 20);
    var rangeY = d3.range(maxY/20.0, maxY, 20);
    
    //縦方向のグリッドを生成
    grid.selectAll("line.y")
	.data(rangeY)
	.enter()
	.append("line")
	.attr("class", "grid")
	.attr("x1", offsetX)
	.attr("y1", function(d, i){
	    return svgHeight - d - offsetY;
	})
	.attr("x2", maxX + offsetX)
	.attr("y2", function(d, i){
	    return svgHeight - d - offsetY;
	})
    
    // 横方向のグリッドを生成する
    grid.selectAll("line.x")
	.data(rangeX)
	.enter()
	.append("line")
	.attr("class", "grid")
	.attr("x1", function(d, i){
	    return d + offsetX;
	})
	.attr("y1", svgHeight - offsetY)
	.attr("x2", function(d, i){
	    return d + offsetX;
	})
    .attr("y2", svgHeight - offsetY - maxY)
}



// tip
var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tip")

//ツールチップを表示する
circleElements
    .on("mouseover", function(d, i){

	d3.select(this) // マウスに重なっていた要素を選択
            .style("fill", "red");
	var x = parseInt(d[0]);
	var y = parseInt(d[1]);
	var data = d3.select(this).datum();
	var dx = parseInt(data[0]);
	var dy = parseInt(data[1]);
	tooltip
	    .style("left", offsetX + x + "px")
	    .style("top", svgHeight + offsetY - y + "px")
	    .style("visibility", "visible")
	    .text(dx + ", " + dy)
    })
    .on("mouseout", function(){
	tooltip.style("visibility", "hidden")
	d3.select(this) // マウスに重なっていた要素を選択
            .style("fill", "gray");
    })

//目盛りをグリッドを表示する
drawScale();


//タイマーを使って2秒毎に位置を更新する
setInterval(function(){
    updateData(dataset);
    updateGraph();
}, timeduration);

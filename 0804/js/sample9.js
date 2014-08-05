

var svgWidth = 500;
var svgHeight = 500;
var offsetX = 30;
var offsetY = 20;
var barElements; // データを格納する
var dataMax = 300;

var dataset = [];
for(var i=0; i<10; i++){
    dataset[i] = Math.floor(Math.random() * dataMax);
}

var barWidth = 20; //棒の太さ
var barMargin = 5; //棒の間隔

//グラフを描画
barElements = d3.select("#myGraph")
    .selectAll("rect")
    .data(dataset);

//データの追加
barElements.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("height", 0)
    .attr("width", barWidth)
    .attr("x", function(d, i){
	return i * (barWidth + barMargin) + offsetX + 10;
    })
    .attr("y", svgHeight - offsetY)
     //イベントの追加
    .on("mouseover", function(){
	d3.select(this)
	    .style("fill", "red")
    })
    .on("mouseout", function(){
	d3.select(this)
	    .style("fill", "orange")
    })
//アニメーション処理
    .transition()
    .duration(1000) //1秒でアニメーションを処理
    .delay(function(d, i){
	return i * 100; // 0.1秒待ち
    })
    .attr("y", function(d, i){ //アニメーション後のy座標を指定する
	return svgHeight - d - offsetY;
    })
    .attr("height", function(d, i){ //アニメーション後のy座標を指定する
	return d;
    })

barElements.enter()
    .append("text")
    .attr("class", "barNum")
    .attr("x", function(d, i){
	return i * (barWidth + barMargin) + 20 + offsetX;
    })
    .attr("y", svgHeight - 5 - offsetY)
    .text(function(d, i){
	return d;
    })

//メモリを表示するためにスケールを設定する
var yscale = d3.scale.linear()
    .domain([0, dataMax])
    .range([dataMax, 0])

//縦方向のメモリを設定し表示する
d3.select("#myGraph")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+offsetX+", "+((svgHeight-300) - offsetY) +")")
    .call(
	d3.svg.axis()
	    .scale(yscale)
	    .orient("left")
    )

d3.select("#myGraph")
    .append("rect")
    .attr("class", "axis")
    .attr("width", svgWidth)
    .attr("height", 1)
    .attr("transform", "translate("+offsetX+", "+(svgHeight-offsetY) + ")")

//棒のラベルを表示する
barElements.enter()
    .append("text")
    .attr("class", "barName")
    .attr("x", function(d,i){
	return i * (barWidth + barMargin) + 20 + offsetX;
    })
    .attr("y", svgHeight - offsetY + 15)
    .text(function(d, i){
	return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"][i];
    })

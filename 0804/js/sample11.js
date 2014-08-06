
//デフォルトは2008年のデータヲヒョウジ
drawPie("data/mydata2008.csv");

//セレクトメニューが選ばれた場合の処理
d3.select("#year").on("change", function(){
    d3.select("#myGraph").selectAll("*").remove();
    drawPie("data/mydata"+this.value+".csv", this.value);
});


function drawPie(filename, year){
    //データセットはcsvファイル
    d3.csv(filename, function(error, data){
	var dataset = [];
	for(var i in data[0]){
	    dataset.push(data[0][i]);
	}

	//svg要素のサイズを求める
	svgEle   = document.getElementById("myGraph");
	// var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
	// var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");

	// svgWidth = parseFloat(svgWidth); // 単位を削除する
	// svgHeight = parseFloat(svgHeight); // 単位を削除する

	svgWidth = 500;
	svgHeight = 500;

	//円グラフの座標値を計算する
	var pie = d3.layout.pie() //えんグラフのレイアウト

	//円グラフの大きさを指定
	var arc = d3.svg.arc().innerRadius(40).outerRadius(200);

	//円グラフを描画
	var pieElements = d3.select("#myGraph")
	    .selectAll("g") //g要素
	    .data(pie(dataset))
	    .enter()
	    .append("g")
	    .attr("transform", "translate("+svgWidth/2.0+", "+svgHeight/2.0 + ")")
	

	//データを追加
	pieElements
	    .append("path")
	    .attr("class", "pie")
	    .style("fill", function(d, i){
    		return  ["red", "blue", "green", "yellow"][i];
	    })
	    .transition()
	    .duration(200)
	    .delay(function(d, i){
    		return i * 200;
	    })
	    .ease("linear")
	    .attrTween("d", function(d, i){ //補間処理をする
    		var interpolate = d3.interpolate(
    		    { startAngle : d.startAngle, endAngle : d.startAngle},
    		    { startAngle : d.startAngle, endAngle : d.endAngle}
    		);
    		return function(t){
    		    return arc(interpolate(t));
    		}
	    })

	// 合計の数と文字の表示
	pieElements
	    .append("text") //データの数だけtextが追加される
	    .attr("class", "pieNum")
	    .attr("transform", function(d, i){
		return "translate(" + arc.centroid(d) + ")"; //円弧の中心にする
	    })
	    .transition()
	    .duration(0)
	    .delay(function(d, i){
    		return i * 300;
	    })
	    .ease("linear")
	    .text(function(d, i){
		return d.value; //値を表示する
	    })


    })

}

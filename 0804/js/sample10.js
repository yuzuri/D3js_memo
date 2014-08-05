
var svgWidth = 500;
var svgHeight = 500;
var dataMax = 300;

//var dataset = [];
//for(var i=0; i<5; i++){
//    dataset[i] = Math.floor(Math.random() * dataMax);
//}
var dataset = [50, 30, 12, 5, 3];

var color = d3.scale.category10(); //d3.js���p�ӂ���10�F����w��

var pie = d3.layout.pie()

//�~�O���t�̑傫�����w��
var arc = d3.svg.arc().innerRadius(40).outerRadius(200);

//�~�O���t��`��
var pieElements = d3.select("#myGraph")
    .selectAll("path") //path�v�f
    .data(pie(dataset))

//�f�[�^��ǉ�
pieElements.enter()
    .append("path")
    .attr("class", "pie")
    .attr("transform", "translate("+svgWidth/2.0+", "+svgHeight/2.0 + ")")
    .style("fill", function(d, i){
    	return  color(i);
    })
    .transition()
    .ease("linear")
    .duration(1000)
    .delay(function(d, i){
    	return i * 1000;
    })
    .attrTween("d", function(d, i){
    	var interpolate = d3.interpolate(
    	    { startAngle : d.startAngle, endAngle : d.startAngle},
    	    { startAngle : d.startAngle, endAngle : d.endAngle}
    	);
    	return function(t){
    	    return arc(interpolate(t));
    	}
    })


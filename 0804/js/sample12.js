

//svg�v�f�̃T�C�Y�����߂�
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");

svgWidth = parseFloat(svgWidth); // �P�ʂ��폜����
svgHeight = parseFloat(svgHeight); // �P�ʂ��폜����

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


//�܂����`��
var lineElements = d3.select("#myGraph")
    .append("path")
    .attr("class", "line")
    .attr("d", line(dataset))

//�ڐ����\�����邽�߂ɃX�P�[����ݒ�
var yScale = d3.scale.linear()
    .domain([0, randmax])
    .range([scale*randmax, 0])

//�ڐ����\�����邽�߂ɃX�P�[����ݒ�
var xScale = d3.scale.linear()
    .domain([0, dataset.length])
    .range([dataset.length, 0])



//�ڐ����\��
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

// //�������̐���\������
d3.select("#myGraph")
    .append("rect")
    .attr("class", "axis_x")
    .attr("width", svgWidth)
    .attr("height", 1)
    .attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY - 0.5) + ")")




var svgWidth = 500;
var svgHeight = 500;
var offsetX = 30;
var offsetY = 20;
var barElements; // �f�[�^���i�[����
var dataMax = 300;

var dataset = [];
for(var i=0; i<10; i++){
    dataset[i] = Math.floor(Math.random() * dataMax);
}

var barWidth = 20; //�_�̑���
var barMargin = 5; //�_�̊Ԋu

//�O���t��`��
barElements = d3.select("#myGraph")
    .selectAll("rect")
    .data(dataset);

//�f�[�^�̒ǉ�
barElements.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("height", 0)
    .attr("width", barWidth)
    .attr("x", function(d, i){
	return i * (barWidth + barMargin) + offsetX + 10;
    })
    .attr("y", svgHeight - offsetY)
     //�C�x���g�̒ǉ�
    .on("mouseover", function(){
	d3.select(this)
	    .style("fill", "red")
    })
    .on("mouseout", function(){
	d3.select(this)
	    .style("fill", "orange")
    })
//�A�j���[�V��������
    .transition()
    .duration(1000) //1�b�ŃA�j���[�V����������
    .delay(function(d, i){
	return i * 100; // 0.1�b�҂�
    })
    .attr("y", function(d, i){ //�A�j���[�V�������y���W���w�肷��
	return svgHeight - d - offsetY;
    })
    .attr("height", function(d, i){ //�A�j���[�V�������y���W���w�肷��
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

//��������\�����邽�߂ɃX�P�[����ݒ肷��
var yscale = d3.scale.linear()
    .domain([0, dataMax])
    .range([dataMax, 0])

//�c�����̃�������ݒ肵�\������
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

//�_�̃��x����\������
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

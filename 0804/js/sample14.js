
//svg�v�f�̃T�C�Y�����߂�
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
svgWidth = parseFloat(svgWidth); // �P�ʂ��폜����
svgHeight = parseFloat(svgHeight); // �P�ʂ��폜����

var svg = d3.select("#myGraph");

//���̂��߂�offset
var offsetX = 30;
var offsetY = 30;

// �\������~�̔��a
var radius = 30;

var timeduration = 4000;

//2�����z��̃T�C�Y��������
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
    .attr("class", "mark") //CSS�̂���mark���w��
    .attr("cx", function(d, i){ //circle��x���W
	return d[0] + offsetX;
    })
    .attr("cy", function(d, i){ //circle��y���W
	return svgHeight - d[1] - offsetY;
    })
    .attr("r", radius);  //���a


//�f�[�^�Z�b�g�̍X�V
function updateData(data){
    for(var i=0; i< datasize; i++){
	dataset[i][0] = Math.floor(Math.random() * randmax);
	dataset[i][1] = Math.floor(Math.random() * randmax);
    }
}


//�U�z�}���X�V
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





//�ڐ���̕\��
function drawScale(){
    var maxX = d3.max(dataset, function(d, i){
	return d[0];
    });
    var maxY = d3.max(dataset, function(d, i){
	return d[1];
    });
    //�ڐ����\�����邽�߂ɃX�P�[����ݒ�
    var yScale = d3.scale.linear()
	.domain([0, maxY])
	.range([maxY, 0])

    //�ڐ����\��
    svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + offsetX + ", " + (svgHeight - maxY - offsetY) + ")")
	.call(
	    d3.svg.axis()
		.scale(yScale)
		.orient("left")
	)
    
    
    //���̖ڐ����\�����邽�߂ɃX�P�[����ݒ�
    var xScale = d3.scale.linear()
	.domain([0, maxX])
	.range([0, maxX])
    
    //�ڐ����\������
    svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
	.call(
	    d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
	)

    //�O���b�h�̕\��
    var grid = svg.append("g");
    //�������Əc�����̃O���b�h�Ԋu����������
    var rangeX = d3.range(maxX/20.0, maxX, 20);
    var rangeY = d3.range(maxY/20.0, maxY, 20);
    
    //�c�����̃O���b�h�𐶐�
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
    
    // �������̃O���b�h�𐶐�����
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

//�c�[���`�b�v��\������
circleElements
    .on("mouseover", function(d, i){

	d3.select(this) // �}�E�X�ɏd�Ȃ��Ă����v�f��I��
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
	d3.select(this) // �}�E�X�ɏd�Ȃ��Ă����v�f��I��
            .style("fill", "gray");
    })

//�ڐ�����O���b�h��\������
drawScale();


//�^�C�}�[���g����2�b���Ɉʒu���X�V����
setInterval(function(){
    updateData(dataset);
    updateGraph();
}, timeduration);

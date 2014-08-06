
//svg�v�f�̃T�C�Y�����߂�
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
svgWidth = parseFloat(svgWidth); // �P�ʂ��폜����
svgHeight = parseFloat(svgHeight); // �P�ʂ��폜����


var timeduration = 2000;

//2�����z��̃T�C�Y��������
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
    .attr("class", "mark") //CSS�̂���mark���w��
    .attr("cx", function(d, i){ //circle��x���W
	return d[0];
    })
    .attr("cy", function(d, i){ //circle��y���W
	return svgHeight - d[1];
    })
    .attr("r", 5);  //���a



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

//�^�C�}�[���g����2�b���Ɉʒu���X�V����
setInterval(function(){
    updateData(dataset);
    updateGraph();
}, timeduration * 0.9);

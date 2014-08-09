
//svg�v�f�̃T�C�Y�����߂�
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
svgWidth = parseFloat(svgWidth); // �P�ʂ��폜����
svgHeight = parseFloat(svgHeight); // �P�ʂ��폜����

var blocksize = 20;

var svg = d3.select("#myGraph");

//�z��̃T�C�Y���g���āA�f�[�^�𗐐���
var datasize = 96;
var randmax = 10;
var dataset = new Array(datasize);
for(var i=0; i< datasize; i++){
    dataset[i] = Math.floor(Math.random() * randmax);
    //document.write(dataset[i] + " ");
}



var color = d3.interpolateHsl("blue", "yellow"); //�F���物�F�ɕ�Ԃ���
var maxValue = d3.max(dataset);

var heatMap = d3.select("#myGraph")
    .selectAll("rect")
    .data(dataset) //�f�[�^�̃Z�b�g

heatMap.enter()
    .append("rect")
    .attr("class", "block")
    .attr("x", function(d, i){
	return (i % 8) * blocksize;
    })
    .attr("y", function(d, i){
	return Math.floor(i/8) * blocksize;
    })
    .attr("width", function(d, i){
	return blocksize;
    })
    .attr("height", function(d, i){
	return blocksize;
    })
//html�\�[�X��style������.block�N���X��fill:none�Ƃ��Ă���ƐF���\������Ȃ�
    .attr("fill", function(d, i){
	return color(d/randmax);
    })
   

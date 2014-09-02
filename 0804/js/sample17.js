
//svg�v�f�̃T�C�Y�����߂�
svgEle   = document.getElementById("myGraph");
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
svgWidth = parseFloat(svgWidth); // �P�ʂ��폜����
svgHeight = parseFloat(svgHeight); // �P�ʂ��폜����

var blocksize = 20;
var svg = d3.select("#myGraph");


// 4000 * 1000 = 4000000

//�z��̃T�C�Y���g���āA�f�[�^�𗐐���
var datasize = 96
var xsize = 8
var ysize = datasize / xsize;
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

var context = d3.select("#myCanvas").node().getContext("2d");

//���x���Ăяo�����炱���ŕ����Ă���H �{���͘A���������\�b�h�Ƃ��ď����Ă����[���[�Ȃ͂�
heatMap.enter()
    .append("rect")
    .attr("class", "block")
    .attr("x", function(d, i){
	return (i % xsize) * blocksize;
    })
    .attr("y", function(d, i){
	return Math.floor(i/xsize) * blocksize;
    })
    .attr("width", function(d, i){
	return blocksize;
    })
    .attr("height", function(d, i){
	return blocksize;
    })
//html�\�[�X��style������.block�N���X��fill:none�Ƃ��Ă���ƐF���\������Ȃ�
//��A���A�ǂ��������̌����Ƃ���
    .attr("fill", function(d, i){
	return color(d/maxValue);
    })

//�q�[�g�}�b�v���^�C�}�[���g���čX�V����
setInterval(function(){
    for(var i=0; i< dataset.length; i++){
	dataset[i] =  (Math.floor(Math.random() * randmax));//�����l
    }
    maxValue = d3.max(dataset);
    heatMap.data(dataset)
	.style("fill", function(d, i){ //�F������
	    var x = (i % xsize) * blocksize;
	    var y = Math.floor(i / xsize) * blocksize;
	    context.fillStyle = color(d/maxValue);
	    context.fillRect(x, y, blocksize, blocksize);
	    return color(d/maxValue);
	})
}, 1000);
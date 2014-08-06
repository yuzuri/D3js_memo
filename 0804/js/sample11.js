
//�f�t�H���g��2008�N�̃f�[�^���q���E�W
drawPie("data/mydata2008.csv");

//�Z���N�g���j���[���I�΂ꂽ�ꍇ�̏���
d3.select("#year").on("change", function(){
    d3.select("#myGraph").selectAll("*").remove();
    drawPie("data/mydata"+this.value+".csv", this.value);
});


function drawPie(filename, year){
    //�f�[�^�Z�b�g��csv�t�@�C��
    d3.csv(filename, function(error, data){
	var dataset = [];
	for(var i in data[0]){
	    dataset.push(data[0][i]);
	}

	//svg�v�f�̃T�C�Y�����߂�
	svgEle   = document.getElementById("myGraph");
	// var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
	// var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");

	// svgWidth = parseFloat(svgWidth); // �P�ʂ��폜����
	// svgHeight = parseFloat(svgHeight); // �P�ʂ��폜����

	svgWidth = 500;
	svgHeight = 500;

	//�~�O���t�̍��W�l���v�Z����
	var pie = d3.layout.pie() //����O���t�̃��C�A�E�g

	//�~�O���t�̑傫�����w��
	var arc = d3.svg.arc().innerRadius(40).outerRadius(200);

	//�~�O���t��`��
	var pieElements = d3.select("#myGraph")
	    .selectAll("g") //g�v�f
	    .data(pie(dataset))
	    .enter()
	    .append("g")
	    .attr("transform", "translate("+svgWidth/2.0+", "+svgHeight/2.0 + ")")
	

	//�f�[�^��ǉ�
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
	    .attrTween("d", function(d, i){ //��ԏ���������
    		var interpolate = d3.interpolate(
    		    { startAngle : d.startAngle, endAngle : d.startAngle},
    		    { startAngle : d.startAngle, endAngle : d.endAngle}
    		);
    		return function(t){
    		    return arc(interpolate(t));
    		}
	    })

	// ���v�̐��ƕ����̕\��
	pieElements
	    .append("text") //�f�[�^�̐�����text���ǉ������
	    .attr("class", "pieNum")
	    .attr("transform", function(d, i){
		return "translate(" + arc.centroid(d) + ")"; //�~�ʂ̒��S�ɂ���
	    })
	    .transition()
	    .duration(0)
	    .delay(function(d, i){
    		return i * 300;
	    })
	    .ease("linear")
	    .text(function(d, i){
		return d.value; //�l��\������
	    })


    })

}

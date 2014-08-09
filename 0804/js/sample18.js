
var blocksize = 2;

// 4000 * 1000 = 4000000

//配列のサイズを使って、データを乱数化
var datasize = 2000000
var xsize = 500
var ysize = datasize / xsize;
var randmax = 10;
var dataset = new Array(datasize);
for(var i=0; i< datasize; i++){
    dataset[i] = Math.floor(Math.random() * randmax);
    //document.write(dataset[i] + " ");
}



var color = d3.interpolateHsl("blue", "yellow"); //青色から黄色に補間する
var maxValue = d3.max(dataset);

var context = d3.select("#myCanvas").node().getContext("2d");
for(var i=0; i< dataset.length; i++){
    dataset[i] =  (Math.floor(Math.random() * randmax));//乱数値
    var x = (i % xsize) * blocksize;
    var y = Math.floor(i / xsize) * blocksize;
    context.fillStyle = color(dataset[i]/maxValue);
    context.fillRect(x, y, blocksize, blocksize);
}


setInterval(function(){
    for(var i=0; i< dataset.length; i++){
	dataset[i] =  (Math.floor(Math.random() * randmax));//乱数値
	var x = (i % xsize) * blocksize;
	var y = Math.floor(i / xsize) * blocksize;
	context.fillStyle = color(dataset[i]/maxValue);
	context.fillRect(x, y, blocksize, blocksize);
    }
}, 1000);



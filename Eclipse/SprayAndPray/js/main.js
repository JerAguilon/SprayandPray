var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerWidth;

make_base();
function make_base(){
	base_image = new Image();
	base_image.src = 'images/16-9.jpg';
	base_image.onload = function(){
		context.drawImage(base_image, 0,0);
	}
}



function clearDecals(){
	// Store the current transformation matrix
	context.save();

	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Restore the transform
	context.restore();
	make_base();
}

function toggleHelp(){
	if(help){
		help = false;
	}else{
		help = true;
	}
}



//gun data

function M4A1(){
	this.pattern = [[0,0],[-23,-1],[-76,-6],[-148,16],[-234,-7], [-328,23],[-427,40],[-490,-22],[-548,-60],[-578,-147],
	                [-619,-134],[-642,-69],[-620,42],[-610,130],[-578,191],[-600,222],[-590,221],[-595,228],[-600,277],[-600,272]];
	this.fireRate = (60000/666);
	this.normalizer = .14; //todo
	for(i = 0;i<this.pattern.length;i++){
		for(j=0;j<2;j++){
			this.pattern[i][j] = this.pattern[i][j] * this.normalizer;
		}
	}
	
	this.getPattern = getPattern;
	this.getFireRate = getFireRate;
}

function AK (){
	this.pattern = [[0,0],[-2,0],[-18,-1],[-19,-2],[-29,-3],[-43,-3],[-58,-7],[-71,-11],[-79,-10],[-86,-4],
	               [-88,8],[-89,17],[-92,24],[-93,30],[-92,33],[-93,33],[-96,24],[-98,13],[-100,1],[-99,-12],
	               [-99,-18],[-98,-20],[-98,-19],[-101,-18],[-103,-19],[-104,-20],[-104,-19],[-103,-11],[-102,3],[-97,21]]; 
	this.fireRate = 100;
	this.normalizer = 1.45;
	for(i = 0; i < this.pattern.length;i++){
		for(j = 0;j<2;j++){
			this.pattern[i][j] = this.pattern[i][j] * this.normalizer;
		}
	}
	
	this.getPattern = getPattern;
	this.getFireRate = getFireRate;
}

function getPattern(){
	return this.pattern;
}
function getFireRate(){
	return this.fireRate;
}

var selectedGun = new M4A1();
var i = 0;
var radius = 3;
var firing = false;
var sensitivity = document.getElementById('sensitivity').value;
var help = true;
var pattern = selectedGun.getPattern();
var fireRate = selectedGun.getFireRate();

var currentX = null;
var currentY = null;
var originX = null;
var originY = null;


function selectGun(gun){
	var notSelected = document.getElementsByClassName('guns');
	for(var i = 0; i< notSelected.length; i++){
		notSelected[i].style.backgroundColor = 'ffffff';
	}
	
	var selected = document.getElementById(gun);
	selected.style.backgroundColor = 'gray';
	
	if(gun == 'ak47'){
		selectedGun = new AK();
	}
	pattern = selectedGun.getPattern();
	fireRate = selectedGun.getFireRate();
}

//gun shit here

setInterval( function() {fireBullet(currentX,currentY)}, fireRate );


function onMouseUpdate(e){
	currentX = e.pageX;
	currentY = e.pageY;
}

var engage = function(e){
	firing = true;
	originX = e.pageX;
	originY = e.pageY;
	if(!help){
		document.body.style.cursor = 'none';
	}
}



var fireBullet = function(x,y){
	
	sensitivity = document.getElementById('sensitivity').value;
	
	if(firing){
		context.beginPath();
	    context.fillStyle = 'red';
		context.arc((sensitivity/2.63) * (x-originX)+originX + pattern[i][1], (sensitivity/2.63) * (y-originY)+originY + pattern[i][0], radius, 0, Math.PI*2);
		context.fill();
		
		if (help){
			context.beginPath();
		    context.fillStyle = 'blue';
			context.arc((originX - 2.63/sensitivity*pattern[i][1]), originY - (2.63/sensitivity*pattern[i][0]), radius, 0, Math.PI*2);
			context.fill();
		}
			
		var audio = new Audio('sounds/ak.mp3');
		audio.play();
		if(i < 29){
			i++;
		} else if (i == 29){
			i=0;
			firing = false;
			document.body.style.cursor = 'pointer';
		}
	}
}

var ceasefire = function(){
	firing = false ;
	document.body.style.cursor = 'pointer';
	i=0;

}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', onMouseUpdate);
canvas.addEventListener('mouseup',ceasefire);


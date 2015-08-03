var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width=screen.width;
canvas.height=screen.height;


//gun data

function M4A1(){
	this.gun = 'm4a1';
	this.pattern = [[0,0],[-23,-1],[-76,-6],[-148,16],[-234,-7], [-328,23],[-427,40],[-490,-22],[-548,-60],[-578,-147],
	                [-619,-134],[-642,-69],[-620,42],[-610,130],[-578,191],[-600,222],[-590,221],[-595,228],[-600,277],[-600,272]];
	this.fireRate = (60000/666);
	
	this.pullDown= [[0,0],[-23,-1],[-76,-6],[-148,16],[-234,-7], [-328,23],[-427,40],[-490,-22],[-548,-60],[-578,-147],
	                [-619,-134],[-642,-69],[-620,42],[-610,130],[-578,191],[-600,222],[-590,221],[-595,228],[-600,277],[-600,272]]; 

	for(i = 0;i<20;i++){
		for(j = 0;j<2;j++){
			this.pullDown[i][j] = (346/600) * this.pullDown[i][j];
		}
	}
	
	this.getPullDown = getPullDown;
	this.getPattern = getPattern;
	this.getFireRate = getFireRate;
	this.getName = getName;
}


function AK (){
	this.gun = 'ak47';
	this.pattern = [[0,0],[-2,0],[-18,-1],[-19,-2],[-29,-3],[-43,-3],[-58,-7],[-71,-11],[-79,-10],[-86,-4],
	               [-88,8],[-89,17],[-92,24],[-93,30],[-92,33],[-93,33],[-96,24],[-98,13],[-100,1],[-99,-12],
	               [-99,-18],[-98,-20],[-98,-19],[-101,-18],[-103,-19],[-104,-20],[-104,-19],[-103,-11],[-102,3],[-97,21]]; 
	this.fireRate = 100;
	
	this.pullDown= [[0,0],[-2,0],[-18,-1],[-19,-2],[-29,-3],[-43,-3],[-58,-7],[-71,-11],[-79,-10],[-86,-4],
		               [-88,8],[-89,17],[-92,24],[-93,30],[-92,33],[-93,33],[-96,24],[-98,13],[-100,1],[-99,-12],
		               [-99,-18],[-98,-20],[-98,-19],[-101,-18],[-103,-19],[-104,-20],[-104,-19],[-103,-11],[-102,3],[-97,21]]; 

	for(i = 0;i<30;i++){
		for(j = 0;j<2;j++){
			this.pullDown[i][j] = 340/86*this.pullDown[i][j] //1.4*2.63/1.2
		}
	}
	this.getPullDown = getPullDown;
	this.getPattern = getPattern;
	this.getFireRate = getFireRate;
	this.getName = getName;
}
function getPattern(){
	return this.pattern;
}
function getFireRate(){
	return this.fireRate;
} function getName(){
	return this.gun;
} function getPullDown(){
	return this.pullDown;
}

function adjustPattern(pattern, name){

	var options = document.getElementById("mapList").options;
	var index = document.getElementById("mapList").selectedIndex;
	
	switch(options[index].text){
		case 'Spray Master':
			
			if(name == 'ak47'){
				for(i = 0; i < pattern.length;i++){
					for(j = 0; j<pattern[i].length;j++){
						pattern[i][j] = pattern[i][j] * 1.45;
					}
				}
			} else if (name == 'm4a1'){
				for(i = 0; i < pattern.length;i++){
					for(j = 0; j<pattern[i].length;j++){
						pattern[i][j] = pattern[i][j] * .14
					}
				}
			}
			break;
		case 'D2 Long Corner - T':
			if(name == 'ak47'){
				for(i = 0; i < pattern.length;i++){
					for(j = 0; j<pattern[i].length;j++){
						pattern[i][j] = pattern[i][j] * 1.5;
					}0
				}
			} else if (name == 'm4a1'){
				for(i = 0; i < pattern.length;i++){
					for(j = 0; j<pattern[i].length;j++){
						pattern[i][j] = pattern[i][j] * .145;
					}
				}
			}
			break;
		case 'D2 Long Corner - CT':
			if(name == 'ak47'){
				for(i = 0; i < pattern.length;i++){
					for(j = 0; j<pattern[i].length;j++){
						pattern[i][j] = pattern[i][j] * 2;
					}
				}
			} else if (name == 'm4a1'){
				for(i = 0; i < pattern.length;i++){
					for(j = 0; j<pattern[i].length;j++){
						pattern[i][j] = pattern[i][j] * .19;
					}
				}
			}
			break;
	}
	
	
	
	return pattern;

}


var selectedGun = new AK();
var i = 0;
var radius = 3;
var firing = false;
var help = true;
var pattern = adjustPattern(selectedGun.getPattern(), selectedGun.getName());
var fireRate = selectedGun.getFireRate();
var pullDown = selectedGun.getPullDown();
var currentX = null;
var currentY = null;
var originX = null;
var originY = null;



var AR = '16-9';
make_base(AR);


function make_base(AR){
	base_image = new Image();
	
	var options = document.getElementById("mapList").options;
	var index = document.getElementById("mapList").selectedIndex;
	switch(options[index].text){
		case 'Spray Master':
			base_image.src = 'images/' + AR + '/spraymaster.jpg';
			base_image.onload = function(){
				context.drawImage(base_image, 0,0,screen.width,screen.height);
			}
			
			break;
		case 'D2 Long Corner - T':
			base_image.src = 'images/' + AR + '/dust2longt.jpg';
			base_image.onload = function(){
				context.drawImage(base_image, 0,0,screen.width,screen.height);
			}
			break;
		case 'D2 Long Corner - CT':
			base_image.src = 'images/' + AR + '/dust2longct.jpg';
			base_image.onload = function(){
				context.drawImage(base_image, 0,0,screen.width,screen.height);
			}
	}
	selectGun('ak47');
}


function toggleAR(){
	var button = document.getElementById('ar');
	
	if (AR == "16-9"){
		AR  = "4-3";
		button.innerHTML = "Aspect Ratio 4:3"
	} else if (AR == "4-3"){
		AR  = "16-9";
		button.innerHTML = "Aspect Ratio 16:9"
	}
	make_base(AR);
}



function clearDecals(){
	 //Store the current transformation matrix
	context.save();

	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Restore the transform
	//context.restore();
	make_base(AR);
}

function toggleHelp(){
	var button = document.getElementById('help');
	if(help){
		help = false;
		button.innerHTML = 'Help Off';
	}else{
		help = true;
		button.innerHTML = 'Help On';
	}
}

var boolDecals = true;
function toggleClearDecals(){
	var button = document.getElementById('decalToggle');
	if (boolDecals){
		boolDecals = false;
		button.innerHTML = 'Auto-clear decals: off';

	} else{
		boolDecals = true;
		button.innerHTML = 'Auto-clear decals: on';
	}
}

function selectGun(gun){
	var notSelected = document.getElementsByClassName('guns');
	for(var i = 0; i< notSelected.length; i++){
		notSelected[i].style.backgroundColor = '#ffffff';
	}
	
	var selected = document.getElementById(gun);
	selected.style.backgroundColor = 'gray';
	
	if(gun == 'ak47'){
		selectedGun = new AK();
	}
	if(gun=='m4a1'){
		selectedGun = new M4A1();
	}
	pattern = adjustPattern(selectedGun.getPattern(), selectedGun.getName());
	fireRate = selectedGun.getFireRate();
	pullDown = selectedGun.getPullDown();
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
	
	var sensitivity = document.getElementById('sensitivity').value;
	var recoilX =  (sensitivity/(1.2 *pullDown[i][1]/pattern[i][1])) * (x-originX) + originX + (screen.width/1920) * pattern[i][1]; //415.2/600/.14    (sensitivity/2.63) * (x-originX)+originX + (screen.width/1920)*pattern[i][1];
	var recoilY =  (sensitivity/(1.2 *pullDown[i][1]/pattern[i][1])) * (y-originY) +originY+ (screen.height/1080) * pattern[i][0];//(sensitivity/2.63) * (y-originY)+originY + (screen.height/1080)*pattern[i][0];
	
	if(firing){
		context.beginPath();
	    context.fillStyle = 'red';
		context.arc(recoilX, recoilY, radius, 0, Math.PI*2);
		context.fill();
		
		if (help){
			context.beginPath();
		    context.fillStyle = 'blue';
			context.arc(originX - (1.2/sensitivity) * pullDown[i][1],originY - (1.2/sensitivity) *pullDown[i][0],radius, 0, Math.PI * 2); //(originX - 2.63/sensitivity*pattern[i][1]), originY - (2.63/sensitivity*pattern[i][0]), radius, 0, Math.PI*2);
			context.fill();
		}
			
		var audio = new Audio('sounds/' + selectedGun.getName() + '.mp3');
		audio.play();
		if(i < pullDown.length-1){
			i++;
		} else if (i == pullDown.length-1){
			i=0;
			firing = false;
			document.body.style.cursor = 'pointer';
			if(boolDecals){
				clearDecals();
			}
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
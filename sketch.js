// globals
var gDebugMode = false;

var drawFunction;
var images = [];
var assets = ['pink_brick.jpg', 'pink_door.png', 'hanging_plant.png', 'drape.png', 'grass_stars.png', 
			  'pink_tile.jpg', 'couch.png', 'bookcase.png', 'barbie_pool.png', 'float.png', 
			  'tile.png', 'plant.png', 'bathtub.png', 'mirror.png', 'simple.jpg', 
			  'kitchen_set.png', 'fridge.png', 'mattress.png', '1200px-GameCube-Set.png', 'white_tile.jpeg',
			  'white_door.png', "vine.png", 'vine_v2.png'];
var eOffset = 100;
var origin = 0;
var tileOffset = 235;

// preloading all assests
function preload() {
  for (var i = 0; i < assets.length; i++) {
    images[i] = loadImage('assets/' + assets[i] );
  }
  print("Finished Preloading Images");
}

// Setup code goes here
function setup() {
  createCanvas(600, 600);
  textSize(40);
  textAlign(CENTER);
  // assign to the Entrance as the initial start page
  drawFunction = drawEntrance;
  print("Finished Setup");
 }

// Draw code goes here
function draw() {
	background(0);
  	drawFunction();
  	if (gDebugMode == true) {
  		drawDebugInfo();
 	}
}

// heres the entrance -- DONE
drawEntrance = function() {
	imageMode(CENTER);

	// brick background
	image(images[0], width / 2, height / 2);

	// front door and stairs
	image(images[1], width / 2, height / 2);
	image(images[4], width/2, height + eOffset + 15)
	
	// hanging plants (3 total)
	image(images[3], width / 2,  origin + eOffset + (eOffset / 4));

	imageMode(CORNER);
	image(images[2], eOffset,  origin);
	image(images[2], width - (eOffset * 2),  origin);
}

// heres the hallway
drawHallWay = function() {
	// TODO put in png of door
	fill(255);
	rect(0, 0, width, height)

	imageMode(CENTER);
	image(images[20], width/2 + 2, 245);

	imageMode(CORNER);
	for (var i = 0; i < 3; i++) {
		image(images[19], i * 175, 390);
	}

	stroke(0);

	beginShape();
	vertex(227, 390);
	vertex(227, 0);
	vertex(0, 0);
	vertex(0, 500);
	vertex(97, 500);
	endShape(CLOSE);

	beginShape();
	vertex(373, 390);
	vertex(373, 0);
	vertex(width, 0);
	vertex(width, 500);
	vertex(width - 97, 500);
	endShape(CLOSE);

	var gOffset = eOffset - 3;

	rect(width - gOffset, origin, gOffset, height - eOffset);
	rect(origin, origin, gOffset, height - eOffset);
	
	image(images[11], -211, -92);
	image(images[21], 426.5, -81);
	image(images[22], 476.5, -81);

	drawArrow('n');
	drawArrow('e');
	drawArrow('s');
	drawArrow('w');

	// TODO add the floor tiling

	// TODO weird back shapes that are supposed to represent the walls

	// TODO add png of plants (3 total)
}

// heres the bed room --DONE
drawBedRoom = function() {
	// TODO add the back panels (2 total)
	fill(255);
	rect(0, 0, width, height);

	fill("#FFFEF8");
	// fill(101, 133, 207);
	beginShape();
	vertex(width, 423);
	vertex(423, 373);
	vertex(211, 373);
	vertex(211, 0);
	vertex(width, 0);
	endShape(CLOSE);

	fill("#FFF5E6");
	rect(origin, origin, 211, 400);

	// TODO add mattress
	image(images[17], -29, 273);

	// TODO add GameCube
	image(images[18], 378, 416);
	drawArrow('e');


	// BONUS a picture of danny devito
}

// heres the void
drawVoid = function() {
	// TODO add the picture of the void 
	// BONUS find a couple of pngs and slap them on
}

// heres the bathroom --DONE
drawBathroom = function() {
	// TODO set bg color
	fill("#D6D1D1");
	rect(0, 0, height, width);
	// TODO start by adding the background tiles
	for (var i = 0; i < 2; i++) {
		image(images[10], (i * 300), 0)
	}
	// TODO add mirror
	// TODO add plant png
	image(images[11], 279, -130);
	image(images[12], 201, 300);
	image(images[13], 34, 11);
	// TODO add bathtub
	drawArrow('w');

}

// heres the pool --DONE
drawPool = function() {
	// background 
	fill("#404D7C");
	rect(0, 0, height, width);
	// pool png
	image(images[8],  eOffset * -1, origin);
	// pool floaty
	image(images[9], eOffset * 4, 415);

	drawArrow('s');
}

// heres the living room --DONE
drawLivingRoom = function() {
	// TODO background tiling
	fill("#E8B9AB");
	rect(0, 0, width, height);
	imageMode(CORNER);
	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < 3; j++) {
			image(images[5], j * tileOffset , i * tileOffset);
		}
	}

	image(images[7],  172, -52);
	image(images[6], -53, height / 2);

	drawArrow('e');
	drawArrow('w');

}

// heres the kitchen --DONE
drawKitchen = function() {
	fill("#EFA7BE");
	rect(0, 0, width, height);
	fill(0)
	rect(0, 294, width, 182);
	for (var i = 0; i < 2; i++) {
		image(images[14], i * 300, 0);
	}
	// TODO add background
	// TODO add sink unit
	image(images[15], -28, 83);

	// TODO add fridge
	image(images[16], 436, 95);
	drawArrow('w');


}

// responds to user key input to move
// between rooms
function keyPressed() {
	// Entrance
	if (drawFunction === drawEntrance) {
		if (keyCode === ENTER){
			drawFunction = drawHallWay;
		}
		return;
	} 
	// Hallway
	if (drawFunction === drawHallWay) {
		if (keyCode === LEFT_ARROW) {
			drawFunction = drawBedRoom;
		} 
		else if (keyCode === RIGHT_ARROW) {
			drawFunction = drawBathroom;
		} 
		else if (keyCode === UP_ARROW) {
			drawFunction = drawPool;
		}
		else if (keyCode === DOWN_ARROW) {
			drawFunction = drawLivingRoom;
		}
		else if (keyCode === RETURN) {
			drawFunction = drawEntrance;
		}
		return;
	}
	// Bedroom
	if (drawFunction === drawBedRoom) {
		if (keyCode === RIGHT_ARROW) {
			drawFunction = drawHallWay;
		}
	}
	// Bathroom
	if (drawFunction === drawBathroom) {
		if (keyCode === LEFT_ARROW) {
			drawFunction = drawHallWay;
		}
	}
	// Pool
	if (drawFunction === drawPool) {
		if (keyCode === DOWN_ARROW) {
			drawFunction = drawHallWay;
		}
	}
	// Living Room 
	if (drawFunction === drawLivingRoom) {
		if (keyCode === LEFT_ARROW) {
			drawFunction = drawHallWay;
		}
		else if (keyCode === RIGHT_ARROW) {
			drawFunction = drawKitchen;
		}
	}
	// Kitchen
	if (drawFunction === drawKitchen) {
		if (keyCode === LEFT_ARROW) {
			drawFunction = drawLivingRoom;
		}
	}
}

function drawArrow(side) {
	switch(side){
		case 'w':
			triangle(15, width/2, 50, width/2 + 20, 50, width/2 - 20);
			break;
		case 'e':
			triangle(width - 15, width/2, width - 50, width/2 + 20, width - 50, width/2 - 20);
			break;
		case 'n':
			triangle(height/2, 15, height/2 + 20, 50, height/2 - 20, 50);
			break;
		case 's':
			triangle(height/2, height - 15, height/2 + 20, height - 50, height/2 - 20, height - 50);
			break;
	}

}

function drawDebugInfo() {
  fill(0);
  noStroke();
  text("X: " + mouseX + "   Y: " + mouseY, 200, 40);
  stroke(0);
}





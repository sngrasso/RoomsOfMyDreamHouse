/*************************************************************************
    (*)Rooms of My Dream House
          (*)by Stephanie Grasso

    (*)Overview - program that provides different states of rooms,
    immitating the floor plan of a house. Users are able to navigate
    throught these rooms that display a bunch of .png files. 
 
    ---------------------------------------------------------------------
    (*)Notes: 
     (1) cleaning, cleaning, more cleaning
     (2) hard coded values everywhere it hurts me
     (3) add hover effects to arrows and an instruction page
**************************************************************************/

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
    images[i] = loadImage('assets/' + assets[i]);
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

// heres the hallway --DONE
drawHallWay = function() {
	fill(255);
	rect(0, 0, width, height)

	// door
	imageMode(CENTER);
	image(images[20], width/2 + 2, 245);

	// floor tiles
	imageMode(CORNER);
	for (var i = 0; i < 3; i++) {
		image(images[19], i * 175, 390);
	}

	// hallway walls
	stroke(0);
	drawVertexShape(1);

	var gOffset = eOffset - 3;

	rect(width - gOffset, origin, gOffset, height - eOffset);
	rect(origin, origin, gOffset, height - eOffset);
	
	// plant - left
	image(images[11], -211, -92);

	// plant - right
	image(images[21], 426.5, -81);
	image(images[22], 476.5, -81);

	// draw the directional arrows
	drawArrow('n');
	drawArrow('e');
	drawArrow('s');
	drawArrow('w');
}

// heres the bed room --DONE
drawBedRoom = function() {
	fill(255);
	rect(0, 0, width, height);

	// side wall - right
	fill("#FFFEF8");
	drawVertexShape(2);

	// side wall - left
	fill("#FFF5E6");
	rect(origin, origin, 211, 400);

	// mattress
	image(images[17], -29, 273);

	// GameCube
	image(images[18], 378, 416);

	// draw the directional arrows
	drawArrow('e');
}

// heres the void
drawInstructions = function() {
	// TODO add the picture of the void 
	// BONUS find a couple of pngs and slap them on
}

// heres the bathroom --DONE
drawBathroom = function() {
	fill("#D6D1D1");
	rect(0, 0, height, width);

	// the background tiles
	for (var i = 0; i < 2; i++) {
		image(images[10], (i * 300), 0)
	}

	// plant
	image(images[11], 279, -130);

	// bathtube
	image(images[12], 201, 300);

	// mirror
	image(images[13], 34, 11);

	// directional arrow
	drawArrow('w');

}

// heres the pool --DONE
drawPool = function() {
	fill("#404D7C");
	rect(0, 0, height, width);

	// pool 
	image(images[8],  eOffset * -1, origin);

	// pool floaty
	image(images[9], eOffset * 4, 415);

	// draw arrows
	drawArrow('s');
}

// heres the living room --DONE
drawLivingRoom = function() {
	fill("#E8B9AB");
	rect(0, 0, width, height);

	// add wall tiling
	imageMode(CORNER);
	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < 3; j++) {
			image(images[5], j * tileOffset , i * tileOffset);
		}
	}

	// bookcase	
	image(images[7],  172, -52);

	// couch
	image(images[6], -53, height / 2);

	// draw directional arrows
	drawArrow('e');
	drawArrow('w');
}

// heres the kitchen --DONE
drawKitchen = function() {
	fill("#EFA7BE");
	rect(0, 0, width, height);

	// draw wall
	fill(0)
	rect(0, 294, width, 182);
	for (var i = 0; i < 2; i++) {
		image(images[14], i * 300, 0);
	}

	// sink unit
	image(images[15], -28, 83);

	// fridge
	image(images[16], 436, 95);

	// arrow
	drawArrow('w');
}

// keyPressed() responds to user key input to move between rooms
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

// drawArrow() takes in an argument side and will draw an arrow on that side of the board
// * restricted to (w)est, (e)ast, (n)orth, (s)outh
function drawArrow(side) {
	switch(side) {
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

// drawVertexShape() made this function just to make the other functions look cleaner 
// hard coded vertex shapes for some of the rooms
function drawVertexShape(room) {
	switch(room) {
		case 1:
			// first 
			beginShape();
			vertex(227, 390);
			vertex(227, 0);
			vertex(0, 0);
			vertex(0, 500);
			vertex(97, 500);
			endShape(CLOSE);
			// second
			beginShape();
			vertex(373, 390);
			vertex(373, 0);
			vertex(width, 0);
			vertex(width, 500);
			vertex(width - 97, 500);
			endShape(CLOSE);
			break;
		case 2:
			beginShape();
			vertex(width, 423);
			vertex(423, 373);
			vertex(211, 373);
			vertex(211, 0);
			vertex(width, 0);
			endShape(CLOSE);
			break;
	}
}

// drawDebugInfo() just used for debugging when needed
function drawDebugInfo() {
  fill(0);
  noStroke();
  text("X: " + mouseX + "   Y: " + mouseY, 200, 40);
  stroke(0);
}





class rectPolygon {
  constructor(ht, wd, posX, posY) {
    this.height = ht;
    this.width = wd;
    this.posX = posX;
    this.posY = posY;
    this.color = "green";
  }

  display() {
    beginShape();
    vertex(this.posX, this.posY);
    vertex(this.posX + this.width, this.posY);
    vertex(this.posX + this.width, this.posY + this.height);
    vertex(this.posX, this.posY + this.height);
    endShape(CLOSE);
  }

  getLastX() {
    return this.posX + this.width;
  }

  getLastY() {
    return this.posY + this.height;
  }

  setColor(color) {
    this.color = color;
    fill(color);
    beginShape();
    vertex(this.posX, this.posY);
    vertex(this.posX + this.width, this.posY);
    vertex(this.posX + this.width, this.posY + this.height);
    vertex(this.posX, this.posY + this.height);
    endShape(CLOSE);
  }

  getColor() {
    return this.color;
  }

  getArea() {
    return wd * ht;
  }
}

function incrementRects(i, size) {
  let rectangle = 0;
  let sum = 0;
  if (i === 0) {
    return 0;
  } else return i * size;
}

function drawRects(
  fabricX,
  fabricY,
  ht,
  wd,
  rectangles,
  greenSquares,
  redSquares
) {
  let rectNumX = fabricX / wd;
  let rectNumY = fabricY / ht;
  for (i = 0; i < rectNumY; i++) {
    for (x = 0; x < rectNumX; x++) {
      let rectNX = incrementRects(x, wd);
      let rectNY = incrementRects(i, ht);

      console.log( "paolo", ht, wd, rectNX, rectNY)
      rectangles[i] = new rectPolygon(ht, wd, rectNX, rectNY);
      console.log( "test", rectangles, rectangles.length, rectangles[i])
      textSize(11);
      fill(0, 0, 0);
      text(`${i} ${x}`, rectNX, rectNY - 10);
      rectangles[i].display();

      if (
        rectangles[i].getLastX() > fabricX ||
        rectangles[i].getLastY() > fabricY
      ) {
        rectangles[i].setColor("red");
        redSquares = redSquares.concat(rectangles[i]);
        console.log( "red",greenSquares[i]);
      } else {
        rectangles[i].setColor("green");
        greenSquares = greenSquares.concat(rectangles[i]);
        console.log("green", greenSquares[i]);
      }
    }
  }
}
/*
function filterColor(array, param, ){
  let filteredArr = []; 
  for (i = 0; i < array.length; i++){
    if(array[i].getColor() == param){
      filteredArr = filteredArr.concat(array[i]);
      console.log(array, param);   
    }
  }
  return filteredArr;
}

function calcTotArea(areas){
  let total = 0;
  for (i = 0; i< areas.length; i++){
    total = areas[i] + total; 
  }
  return total;
}

function calcWaste(rectangles){
  let totalArea = width*height
  let green = filterColor(rectangles, "green");
  let avalaibleArea = calcTotArea(green);
  let waste = totalArea - avalaibleArea;
  
  console.log(waste, totalArea, avalaibleArea, green);
}
*/
let fabricX = 400;
let fabricY = 400;
let sizeXInput,
  sizeYInput,
  button,
  rectXInput,
  rectYInput,
  rectWidth,
  rectHeight,
  p;

function setup() {
  p = createP("CIAO")
  createCanvas(fabricX, fabricY);
  noLoop();
  sizeXInput = createInput().attribute("placeholder", "Lunghezza tessuto");
  sizeXInput.position(0, 10);

  sizeYInput = createInput().attribute("placeholder", "Altezza tessuto");
  sizeYInput.position(200, 10);

  rectXInput = createInput().attribute(
    "placeholder",
    "Lunghezza rettangoli/quadrati da tagliare"
  );
  rectXInput.position(0, 50);

  rectYInput = createInput().attribute(
    "placeholder",
    "Altezza rettangoli/quadrati da tagliare"
  );
  rectYInput.position(200, 50);

  // fabricY = sizeYInput.value();

  button = createButton("Genera");
  button.position(390, 10);
  button.mousePressed(windowResized);
}

function windowResized() {
  let rectangles = [];
  let greenSquares = [];
  let redSquares = [];
  const x = sizeXInput.value();
  const y = sizeYInput.value();
  const rectWidth = rectXInput.value();
  const rectHeight = rectYInput.value();
  console.log(x, y);
  // if (x != null && y != null) {
  resizeCanvas(x, y, false);
  drawRects(
    width,
    height,
    parseInt(rectWidth),
    parseInt(rectHeight),
    rectangles,
    greenSquares,
    redSquares
  );
  // }
}

function draw() {
  background(220);
  let rectangles = [];
  let greenSquares = [];
  let redSquares = [];
  console.log(rectangles.length);
  //new rectPolygon(50, 100, 0, 0).display();
  //dimensione parte da tagliare
  drawRects(width, height, 75, 75, rectangles, greenSquares, redSquares);
  //calcWaste( redSquares, greenSquares, rectangles);
}

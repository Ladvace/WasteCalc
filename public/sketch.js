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

let rectangles = [];
let greenSquares = [];
let redSquares = [];

function incrementRects(i, size) {
  let rectangle = 0;
  let sum = 0;
  if (i === 0) {
    return 0;
  } else return i * size;
}

function drawRects(fabricX, fabricY, ht, wd) {
  let rectNumX = fabricX / wd;
  let rectNumY = fabricY / ht;
  for (i = 0; i < rectNumY; i++) {
    for (x = 0; x < rectNumX; x++) {
      let rectNX = incrementRects(x, wd);
      let rectNY = incrementRects(i, ht);

      rectangles[i] = new rectPolygon(ht, wd, rectNX, rectNY);
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
        // console.log(greenSquares[i]);
      } else {
        rectangles[i].setColor("green");
        greenSquares = greenSquares.concat(rectangles[i]);
        // console.log(greenSquares[i]);
      }
    }
  }
}

function filterColor(array, param) {
  let filteredArr = [];
  for (i = 0; i < array.length; i++) {
    if (array[i].getColor() == param) {
      filteredArr = filteredArr.concat(array[i]);
      console.log(array, param);
    }
  }
  return filteredArr;
}

function calcTotArea(areas) {
  let total = 0;
  for (i = 0; i < areas.length; i++) {
    total = areas[i] + total;
  }
  return total;
}

function calcWaste(rectangles) {
  let totalArea = width * height;
  let green = filterColor(rectangles, "green");
  let avalaibleArea = calcTotArea(green);
  let waste = totalArea - avalaibleArea;
}

let fabricX = 400;
let fabricY = 400;
let sizeXInput,
  sizeYInput,
  button,
  rectXInput,
  rectYInput,
  rectWidth,
  rectHeight;

function setup() {
  //dimensione tessuto
  createCanvas(fabricX, fabricY);
  noLoop();

  sizeXInput = createInput().attribute("placeholder", "Lunghezza");
  sizeXInput.position(0, 10);

  sizeYInput = createInput().attribute("placeholder", "Altezza");
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

  fill(255, 255, 255);
  text("word", 420, 10);
}

function windowResized() {
  const x = sizeXInput.value();
  const y = sizeYInput.value();
  rectWidth = rectXInput.value();
  rectHeight = rectYInput.value();
  console.log(x, y);
  // if (x != null && y != null) {
  resizeCanvas(x, y);
  calcWaste(redSquares, greenSquares, rectangles);
  // }
}

function draw() {
  background(220);
  console.log(rectangles);
  //new rectPolygon(50, 100, 0, 0).display();
  //dimensione parte da tagliare
  drawRects(width, height, 75, 75);
}

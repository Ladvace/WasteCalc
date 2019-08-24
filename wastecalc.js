class rectPolygon{
  constructor(ht, wd, posX, posY) {
    this.height = ht;
    this.width = wd;
    this.posX = posX;
    this.posY = posY;
    this.color = "green";
  }
  
  display(){
  beginShape();
  vertex(this.posX, this.posY);
  vertex(this.posX + this.width, this.posY);
  vertex(this.posX + this.width, this.posY + this.height);
  vertex(this.posX, this.posY + this.height);
  endShape(CLOSE); 
  }
  
  getLastX(){
  return this.posX + this.width;
  }
  
  getLastY(){
  return this.posY + this.height;
  }
  
  setColor(color){
    this.color = color;
    fill(color);
    beginShape();
    vertex(this.posX, this.posY);
    vertex(this.posX + this.width, this.posY);
    vertex(this.posX + this.width, this.posY + this.height);
    vertex(this.posX, this.posY + this.height);
    endShape(CLOSE); 
  }
  
  getColor(){
  return this.color;
  }
  
  getArea(){
    return wd*ht;
  }
}


function incrementRects(i, size){
  let rectangle = 0;
  let sum = 0;
if(i === 0){
return 0;
  } else return i * size;
}

function drawRects(fabricX, fabricY, ht, wd, rectangles, greenSquares, redSquares){
  let rectNumX = fabricX/wd;
  let rectNumY = fabricY/ht;
  for(i = 0; i <  rectNumY; i++){
      for(x = 0; x <  rectNumX; x++){
            let rectNX= incrementRects(x, wd);
            let rectNY = incrementRects(i, ht);
            
            rectangles[i]  = new rectPolygon(ht, wd, rectNX, rectNY);
            textSize(11);
            fill(0,0,0);
            text(`${i} ${x}` , rectNX, rectNY - 10);
            rectangles[i].display();        
        
            if(rectangles[i].getLastX() > fabricX || rectangles[i].getLastY() > fabricY){
             rectangles[i].setColor('red');
              //redSquares = redSquares.concat(rectangles[i]);
              //console.log(greenSquares[i]);
          } else{ 
            rectangles[i].setColor('green');
            //greenSquares = greenSquares.concat(rectangles[i]);
            //console.log(greenSquares[i]);
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

function setup() {
  let fabricX = 400;
  let fabricY = 400;
  createCanvas(fabricX, fabricY);
  noLoop()
}

function draw() {
  background(220);
  let rectangles = [];
  let greenSquares = [];
  let redSquares = [];
  console.log(rectangles);
  //new rectPolygon(50, 100, 0, 0).display();
  drawRects(width, height, 75, 75, rectangles, greenSquares, redSquares);
  //calcWaste( redSquares, greenSquares, rectangles);
  
}

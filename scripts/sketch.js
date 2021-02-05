let time = 0;
let path = [];
let x = [];
let y = [];
let penUp = [];
let FourierY;
let FourierX;
var contours;
var ans = null;
var started = false;
let cnv;






function setup() {
  cnv = createCanvas(1280, 720);

  var obj = extractImage("svg/spider.svg", 2);
  let arr = obj.arr;


  started = true;

  penUp = obj.strk;

  var obj2 = compressArr(arr, penUp, 1);
  arr = obj2.newArr;
  penUp = obj2.newFP;

  for (let i = 0; i < arr.length; i++) {

    x.push(arr[i].x);
    y.push(arr[i].y);
  }



  FourierX = dft(x);
  FourierY = dft(y);

  FourierX.sort((a, b) => b.amp - a.amp);
  FourierY.sort((a, b) => b.amp - a.amp);
}


function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevX = x;
    let prevY = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp * 0.5;
    x += radius * cos(freq * time + fourier[i].phase + rotation);
    y += radius * sin(freq * time + fourier[i].phase + rotation);
    strokeWeight(2);
    stroke(255, 0, 0)
    ellipse(prevX, prevY, radius * 2);
    stroke(255, 0, 0);
    line(prevX, prevY, x, y)

  }

  return createVector(x, y);
}
function draw() {

  if (started) {
    background(0, 0, 255);
    noFill();
    //let radius = 100;
    //translate(200,200);
    //stroke(255);


    let y = 0;
    let x = 0;

    let vx = epicycles(400, 200, 0, FourierX);
    let vy = epicycles(200, 400, HALF_PI, FourierY);

    let v = createVector(vx.x, vy.y);


    path.push(v);

    //fill(255);
    //ellipse(x,y,5);
    //translate(500,400);
    //line(x-200,y,0,wave[0]);
    //noFill();
    line(vx.x, vx.y, path[path.length - 1].x, path[path.length - 1].y);
    line(vy.x, vy.y, path[path.length - 1].x, path[path.length - 1].y);

    beginShape();
    noFill();

    for (let i = 0; i < path.length; i++) {
      //stroke(0);
      if (penUp.includes(i)) {
        endShape();
        beginShape();
        noFill();
      }
      //continue;
      vertex(path[i].x, path[i].y);

    }

    endShape();




    const dt = TWO_PI / FourierY.length;
    time += dt;


    // if(time >TWO_PI)
    // {
    //   time = 0;
    //   path = [];
    // }
    // if(wave.length>500)
    //   wave.pop();
  }


}
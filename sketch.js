var serial;          // variable to hold an instance of the serialport library
var portName = 'COM3';
var inData;
/////

var close = false;
var far = false;
var tooClose = false;
var anxiety = 1;

var sounds = [];
// declare arrays
var verbs = ["scared.","alone.","being judged.","nervous."]; // verbs for I am..
var adjectives = ["stupid.","ugly.","worthless.","boring.","a fuck up.",]; // adjectives for I am..
var response = ["fine.","okay.","not a freak.","not crazy."]; // response to negative comments
 
function preload(){
    sounds = [loadSound("ax.wav"), loadSound("ax1.wav"), loadSound("ax2.wav"), loadSound("ax3.wav"), loadSound("ax4.wav"), loadSound("ax5.wav"), loadSound("ax6.wav") , loadSound("ax7.wav")];
}

//////

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  textAlign(CENTER,CENTER); //text align is centered
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  //serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

  


}
function serverConnected() {
  println('connected to server.');
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
  // read a string from the serial port:
  var inString = serial.readLine();
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
  // convert it to a number:
  inData = Number(inString);
	

  if (inData < 30 && inData > 10){
        tooClose = true;
      
      if (sounds[2].isPlaying() == false) {
      console.log("play!");
          sounds[2].setVolume(.09);
        sounds[2].loop();
          sounds[0].stop();
            sounds[1].stop();
          //sounds[3].stop();
      }
        anxiety = 20;
        
        
    
    } 
    if (inData > 30 && inData < 187){
        close = true;
        if (sounds[1].isPlaying() == false) {
      console.log("play!");
            sounds[1].setVolume(0.05);
        sounds[1].loop();
            sounds[0].stop();
            sounds[2].stop();
      }if (sounds[7].isPlaying() == false) {
      console.log("Heartbeat");
           sounds[7].setVolume(.7);
            sounds[7].loop();
           
      }
        anxiety = 5;
    }
    if(inData == 0){
        far = true;
        if (sounds[0].isPlaying() == false) {
      console.log("play!");
           // sounds[0].setVolume(0.2);
            //sounds[0].play();
            sounds[1].stop();
            sounds[2].stop();
            sounds[0].stop();
      }
        anxiety = .5;
    }

if (inData < 10 && inData > 1){
    if (sounds[4].isPlaying() == false) {
      console.log("play!");
            sounds[4].setVolume(0.5);
            sounds[4].loop();
            sounds[1].stop();
            sounds[2].stop();
            sounds[0].stop();
      }
    if (sounds[5].isPlaying() == false) {
      console.log("play!");
            sounds[0].setVolume(0.5);
            sounds[5].loop();
            sounds[1].stop();
            sounds[2].stop();
            sounds[0].stop();
      }
    if (sounds[6].isPlaying() == false) {
      console.log("play!");
            sounds[6].setVolume(0.5);
            sounds[6].loop();
            sounds[1].stop();
            sounds[2].stop();
            sounds[0].stop();
      }far = true;
       close = true;
        tooClose = true;
    anxiety = 60;

}

  }
 
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}

////

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    background(0);
  } 
}



///
function draw(){
    if (sounds[3].isPlaying() == false) {
      console.log("playssss!");
          sounds[3].setVolume(.8);
        sounds[3].loop();
    }
frameRate(anxiety); // framerate is slowed
  textSize(50); // text size is set
  fill(255); // fill is white
  noStroke(); // text has no stroke
  var randoVerb = int(random(verbs.length)); // generate random number according to number of verbs
  var randoAdjective = int(random(adjectives.length)); // generate random number according to number of adjectives
  var randoResponse = int(random(response.length)); // generate random number according to number of responses
  
  // randomize Xs and Ys for positioning text
  var randomX = int(random(width));
  var randomY = int(random(height));
  var randomX2 = int(random(width));
  var randomY2 = int(random(height));
  var randomX3 = int(random(width));
  var randomY3 = int(random(height));
  if(far){
        var fullString2 = "I am... " + verbs[randoVerb]; // declare string variable 2
        text(fullString2,randomX,randomY); // output string 2 in random position
    }
    if(close){
        stroke(0); // stroke is black
        strokeWeight(5); // stroke weight is 5px
        var fullString3 = "I am... " + adjectives[randoAdjective]; // declare string variable 3
        text(fullString3,randomX2,randomY2); // output string 3 in random position
    }
    if(tooClose){
        fill(255,0,0); // fill is red
        var fullString4 = "I am... " + response[randoResponse]; // declare string variable 4
        text(fullString4,randomX3,randomY3); // output string 4 in random position
    } 
  noStroke(); // no stroke
  textSize(150); // text is 100 in size
  fill(0); // fill is black
  var fullString= "i have anxiety..."; // declare string variable 1
    text(fullString,width/2,height/2); // output string in center
 
 console.log(inData);
  
}
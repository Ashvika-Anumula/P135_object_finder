status="";
video="";
objects=[];

function preload()
{

}

function setup()
{
 canvas=createCanvas(480,380);
 canvas.position(400,150);
 video = createCapture(VIDEO);
 video.hide();
}

function draw()
{
 image(video, 0, 0, 480, 380);

 if(status!="")
 {
  objectDetector.detect(video,gotResults);
  for(i=0; i < objects.length; i++)
  {
    document.getElementById("status").innerHTML= "Status: Objects Detected";

    fill("red");
    percent= floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke("red");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label==object_name)
    {
        video.stop();
        objectDectector.detect(gotResults);
        document.getElementById("object_status").innerHTML= object_name +"Found";
        synth=window.SpeechSynthesis;
        utterThis= new SpeechSynthesisUtterance(object_name +"Found");
        synth.speak(utterThis);
    }
    else
    {
     document.getElementById("object_status").innerHTML=object_name + "Not found";
    }
  }
 }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Object Detected";
    object_name= document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

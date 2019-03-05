var RaspiCam = require("raspicam");

// Video configuration - bitrate 0.1Mbits/s with timeout at 60s with 10 frames per second
var camera = new RaspiCam({
	mode: "video",
	output: "/data/%Y-%m-%d%X.mp4",
	t: "60000",
	framerate: "2",
	listen: "true",
	ex: "auto",
	rot: "180",
});

// Video configuration - timeout at 60s with 2 frames per second - output to listening port 3333
//var camera = new RaspiCam({
//	mode: "video",
//	output: "tcp://0.0.0.0:3333",
//	t: "60000",
//	framerate: "2",
//	listen: "true",
//	ex: "auto",
//	rot: "180",
//});


//listen for the "start" event triggered when the start method has been successfully initiated
camera.on("started", function( err, timestamp ){
	console.log("photo started at " + timestamp );
});

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function( err, timestamp, filename ){
	console.log("photo image captured with filename: " + filename );
	//we can now do stuff with the captured image, which is stored in /data
});

//listen for the process to exit when the timeout has been reached
camera.on("exit", function( timestamp ){
	console.log("photo child process has exited at " + timestamp );
});

//to take a snapshot, start a timelapse or video recording
camera.start();

// loads of more options below

//to stop a timelapse or video recording
camera.stop();


//listen for the "stop" event triggered when the stop method was called
camera.on("stop", function( err, timestamp ){
	console.log("capture started at " + timestamp );
});
var RaspiCam = require("raspicam");

// Timelapse configuration
var camera = new RaspiCam({
	mode: "timelapse",
	output: "/data/image%03d-today.jpg",
	latest: "/data/latest.jpg",
	encoding: "jpg",
	tl: "10000",
	ex: "auto",
	rot: "180",
	t: "600000"
});

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
//camera.stop();


//listen for the "stop" event triggered when the stop method was called
camera.on("stop", function( err, timestamp ){
	console.log("capture started at " + timestamp );
});
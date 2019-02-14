const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {
  exec
} = require('child_process');

server.listen(3000);

app.get('/video', function(req, res) {
  const path = '/data/sample.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})

io.on('connection', function(socket) {
  'use strict';
  console.log('video is streaming');
  let dataLoop = setInterval(function() {
    listen(socket);
    get(socket);
  }, 1000);
	socket.on('disconnect', function() {
      console.log('video stopped streaming');
			clearInterval(dataLoop);
   });
});

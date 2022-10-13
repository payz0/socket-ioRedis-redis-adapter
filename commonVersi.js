var express = require('express');
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server)
var redis = require('socket.io-redis')
var port = 3000

io.adapter(redis({host:'localhost',port:6379}))

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

var space = io.of('/latihan')



space.on('connection',(socket)=>{
    console.log('user connected');
    socket.emit('status',true)
})

server.listen(port,()=>{
   console.log(`runing in ${port}`); 
})
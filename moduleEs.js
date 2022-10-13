import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import express from "express"
import http from "http"
let port  = 3000
let app = express()
let server = http.Server(app)

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

const io = new Server();

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
io.listen(server);

io.on('connection',(socket)=>{
    console.log('user connected');
    socket.emit('status',true)
})

server.listen(port,()=>{
    console.log(`run modul es ${port}`);
})
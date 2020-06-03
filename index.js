var express = require('express');
var socket = require('socket.io')

var app = express();
var server = app.listen(5000, function(){
    console.log("App Run on 5000")
})

// setup socket
var io = socket(server);

app.get('/', () => {
    return "Hello world"
})

io.on('connection', function(socket){
    console.log("socket Connection found")

    socket.on("join_room", room =>{
        socket.join(room.room)
        console.log("join room "+room.room)
    })

    socket.on("message", ({nama, message, room}) => {
        console.log("Message Broadcasted")
        socket.to(room).emit("message",{
            nama,
            message,
        })
    })

    // socket.on('broad', function(data){
    //     io.sockets.emit('broad', data)
    // })

    // socket.on('typing', ({room}) => {
    //     socket.to(room).emit("typing", "someone is typing")
    // })

    // socket.on('stopped_typing', ({room}) => {
    //     socket.to(room).emit("stoped_typing")
    // })
})


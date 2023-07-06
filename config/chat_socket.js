module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer
        ,{
        cors: {
          origin: "http://localhost:8000",
        //   methods: ["GET", "POST"],
        //   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
          credentials: true
        }
      });

    io.on('connection', function(socket){
        console.log('new connection received:', socket.id)

        socket.on('disconnect', function(){
            console.log('Socket Disconnected!')
        })

        socket.on('join_room', function(data){
            console.log('Joining request received:', data);

            socket.join(data.chatRoom)

            io.in(data.chatRoom).emit('user_joined', data)
        })

        socket.on('send_message', function(data){
          console.log('SEND MESSAGE:', data.message)
          io.in(data.chatRoom).emit('receive_message', data)
        })
    })
}
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox=$(`${chatBoxId}`);
        this.userEmail=userEmail;
        
        this.socket=io.connect('http://localhost:5000'
        , {
            withCredentials: true,
            // transports: ['websocket', 'polling'],
            // extraHeaders: {
            //   "my-custom-header": "abcd"
            // }
          })
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self=this;
        this.socket.on('connect', function(){
            console.log('Connection made .....')
        })

        self.socket.emit('join_room', {
            user_email: self.userEmail,
            chatRoom: 'codeial'
        })

        self.socket.on('user_joined', function(data){
            console.log('A user joined:', data)
        })



        $('#submit-button').click(function(){
            let msg=$('#text-box').val();
            console.log('NEW MESSAGE:', msg)
            $('#text-box').val('')
            if(msg!=''){
                console.log('SEND MESSAGE:', msg)
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatRoom: 'codeial'
                })
            }
        })
        console.log('Going to receive message')
        self.socket.on('receive_message', function(data){
            console.log('Message Received:', data.message)

            let newMessage=$('<div>')

            var messageType="friend_msg"

            if(data.user_email==self.userEmail){
                messageType='my_msg'
            }

            newMessage.append($('<span>', {'html': data.message}))
            newMessage.append($('<sub>', {'html': data.user_email}))
            newMessage.addClass(messageType)

            $('#messages').prepend(newMessage)
        })

    }
}
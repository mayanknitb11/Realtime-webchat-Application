// node server

//run socket.io server at 6000 port which listen incoming event
const io = require('socket.io')(8000)
const users = {}


//whenever their is a connection fire arrow function
//io.on is an instance of socket.io
io.on('connection',socket => {

    //when new user join 
    socket.on('newUserJoined',name => {
        users[socket.id] = name;
        //inform other users that new users joined
        socket.broadcast.emit('userJoined',name)
    });

    socket.on('send',message => {
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });


})
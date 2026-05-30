const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const socketio = require('socket.io');
require('dotenv').config();
const { Vonage } = require('@vonage/server-sdk');
const { Channels } = require('@vonage/messages');

const vonage = new Vonage(
 {
 apiKey: process.env.apiKey,
 apiSecret: process.env.apiSecret,
 }
);

//init app
const app = express();

//Template engine setup
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

//Public folder setup
app.use(express.static(__dirname + '/public'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Index Route
app.get('/', (req,res)=>{         
    res.render('index');
})

//Catch form submit
app.post('/', (req,res)=>{
    console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;
    
vonage.messages.send({
    messageType: 'text',
    channel: Channels.SMS,
    text: text,
    to: number,
    from: 'Vonage APIs',
})
    .then(({ messageUUID }) =>
    {
    io.emit('smsStatus', {
        id: messageUUID,
        number: number
    });

    res.json({ success: true });
} )
    .catch((error) => console.error(error));

});

 //Define port
 const port = 3000;

 //Start server
 const server = app.listen(port, ()=>{console.log(`Server started on ${port}`)});

 //Connect to socket.io
 const io = socketio(server);
 io.on('connection', (socket)=>{
    console.log('Connected');

    socket.on('disconnect',()=>{
        console.log('Disconnected');
    });
 })
const numberInput = document.getElementById('phoneno');
const textInput = document.getElementById('msg');
const button = document.getElementById('btn');
const response = document.querySelector('.response');

const socket = io();

socket.on('smsStatus', (data)=>{
    response.innerHTML = '<p> Text message sent to ' + data.number + '</p>';
})

function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;

    fetch('/', {
        method:'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({number:number, text:text})
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err) {
        console.log(err);
    })
}
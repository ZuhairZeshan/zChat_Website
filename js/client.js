const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector('.container');

var audio=new Audio("message-tone.mp3");

const append = (message,position) => {
    const messagElement=document.createElement('div');
    messagElement.innerText=message;
    messagElement.classList.add('message');
    messagElement.classList.add(position);
    messageContainer.append(messagElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinp.value;
    if(messageinp.value){
        append(`You: ${message}`,'right');
    }
    socket.emit('send',message);
    messageinp.value='';
})

let username;
while (!username) {
    username = prompt('Enter your User_Name:');  
    if (!username) {
        alert('Username cannot be empty. Please enter your Username.');
    }
}

if (username) {
    // console.log("Emitting new-user-joined event with name:", username); 
    socket.emit('new-user-joined', username);
}

socket.on('user-joined',name=>{
    append(`${name} has joined the Chat`,'left');
})

socket.on('receive',data =>{
    if(data.message != ''){
        append(`${data.name} : ${data.message}`,'left');
    }
})

socket.on('left',name =>{
    if(name){
        append(`${name} has left the Chat`,'left');
    }
})
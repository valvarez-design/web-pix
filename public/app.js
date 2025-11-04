console.log('hiiii are we working?');

//initialize and connect socket.io
let socket = io ();

//listen for socket connection
socket.on('connect', () => {
    console.log('Connected');
});

//references for HTML elements
let messageContainer = document.getElementById('chat-messages');
//let messageForm = document.getElementById('send-container'); //not using
let messageInput = document.getElementById('chat-input');
let sendButton = document.getElementById('send-btn');

//send message when Enter key is pressed
messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

//send message to server when button is clicked
sendButton.addEventListener('click', function () {
    sendMessage();
});

//function to send message to server
function sendMessage() {
    let message = messageInput.value.trim();
    //return empty messages
    if (message === '') return;

    //send message to server
    socket.emit('message', message);

    //clear input field after sending
    messageInput.value = '';
}

//listen for a single new message from server
socket.on('message', (data) => {
    //log the object
    console.log('Message received: ', data);
    displayMessage(data);
});
//listener for previously saved messages
socket.on('initial-messages', (messages) => {
    if (!Array.isArray(messages)) return;
    messages.forEach(displayMessage);
});


//function to display message in message container
function displayMessage(message) {
    //create new div element for message
    let messageElement = document.createElement('div');
    messageElement.className = 'message';
    //set message text
    messageElement.innerText = message.text;
    //append message element to message container
    messageContainer.appendChild(messageElement);
}


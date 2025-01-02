// Configurar la fecha objetivo (ajusta la fecha al cumpleaños de tu hija)
const targetDate = new Date("2025-01-18T00:00:00").getTime();

// Actualizar el contador cada segundo
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Si la fecha ya pasó, mostrar todos ceros
    if (distance < 0) {
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}, 1000);

// Array para almacenar los mensajes
let messages = [];

// Función para cargar mensajes desde el servidor
async function loadMessages() {
    try {
        const response = await fetch('http://localhost:5000/api/messages');
        messages = await response.json();
        displayMessages();
    } catch (error) {
        console.error('Error al cargar mensajes:', error);
    }
}

// Modificar el evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
});

// Función para mostrar los mensajes
function displayMessages() {
    const messageList = document.getElementById("messageList");
    messageList.innerHTML = ''; // Limpiar la lista actual
    
    // Mostrar cada mensaje
    messages.forEach(message => {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message-item";
        messageDiv.innerHTML = `
            <strong>${message.name}</strong>
            <p>${message.text}</p>
        `;
        messageList.appendChild(messageDiv);
    });
}

// Modificar la función addMessage
async function addMessage() {
    const messageText = document.getElementById("messageText").value;
    const messageName = document.getElementById("messageName").value;
    
    if (messageText && messageName) {
        const newMessage = {
            name: messageName,
            text: messageText
        };
        
        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage)
            });
            
            if (response.ok) {
                // Recargar mensajes
                await loadMessages();
                
                // Limpiar los campos
                document.getElementById("messageText").value = "";
                document.getElementById("messageName").value = "";
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        }
    }
}
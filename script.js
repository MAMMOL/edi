// Gráfico de Transacciones
const ctxTrans = document.getElementById('chart-transactions').getContext('2d');
new Chart(ctxTrans, {
    type: 'bar',
    data: {
        labels: ['Órdenes (850)', 'Facturas (810)', 'Avisos Envío (856)', 'Pagos (820)'],
        datasets: [{
            label: 'Volumen Mensual',
            data: [1200, 1150, 950, 800],
            backgroundColor: '#3498db'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    }
});

// Gráfico de Errores
const ctxErrors = document.getElementById('chart-errors').getContext('2d');
new Chart(ctxErrors, {
    type: 'line',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Tasa de Error %',
            data: [5.2, 4.8, 4.1, 3.5, 3.2, 2.8],
            borderColor: '#e74c3c',
            tension: 0.1,
            fill: false
        }]
    },
    options: {
        responsive: true
    }
});

// Función para actualizar el Video
function updateVideo() {
    const url = document.getElementById('video-url').value;
    const frame = document.getElementById('video-frame');
    const placeholder = document.querySelector('.video-container .placeholder');
    
    if (url) {
        // Intentar convertir URL de Youtube normal a Embed si es necesario
        let embedUrl = url;
        if (url.includes('youtube.com/watch?v=')) {
            embedUrl = url.replace('watch?v=', 'embed/');
        } else if (url.includes('youtu.be/')) {
            embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
        }
        
        frame.src = embedUrl;
        frame.style.display = 'block';
        placeholder.style.display = 'none';
    }
}

// Función para actualizar el Chatbot
function updateChatbot() {
    const url = document.getElementById('chatbot-url').value;
    const frame = document.getElementById('chatbot-frame');
    const placeholder = document.querySelector('.chatbot-container .placeholder');
    
    if (url) {
        frame.src = url;
        frame.style.display = 'block';
        placeholder.style.display = 'none';
    }
}

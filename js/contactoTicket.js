// ========================================
//  GENERADOR DE TICKET/BAUCHER
// ========================================

function generarNumeroTicket() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `VA-${año}${mes}${dia}-${random}`;
}

function obtenerFechaHoraActual() {
    const fecha = new Date();
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return fecha.toLocaleDateString('es-PE', opciones);
}

function generarCodigoQR(texto) {
    // Simulación de código QR con patrón ASCII
    return `
        ████ ▄▄▄▄ ████
        ████ █▀▀█ ████
        ████ █▄▄█ ████
        ████      ████
        ████ ▄▄▄▄ ████
    `.trim();
}

function crearTicketHTML(datos) {
    const numeroTicket = generarNumeroTicket();
    const fechaHora = obtenerFechaHoraActual();
    const codigoQR = generarCodigoQR(numeroTicket);
    
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket de Visita - Voz Animal</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 20px;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .ticket-container {
                background: white;
                max-width: 600px;
                width: 100%;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: aparecer 0.6s ease-out;
            }
            
            @keyframes aparecer {
                from {
                    opacity: 0;
                    transform: scale(0.8) translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            .ticket-header {
                background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                padding: 30px;
                text-align: center;
                color: white;
                position: relative;
                overflow: hidden;
            }
            
            .ticket-header::before {
                content: '🐾';
                position: absolute;
                font-size: 150px;
                opacity: 0.1;
                top: -30px;
                right: -20px;
                animation: rotar 20s linear infinite;
            }
            
            @keyframes rotar {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .logo-container {
                width: 120px;
                height: 120px;
                margin: 0 auto 15px;
                background: white;
                border-radius: 50%;
                padding: 10px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            
            .logo-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
            
            .logo-placeholder {
                font-size: 50px;
                color: #4CAF50;
            }
            
            .ticket-header h1 {
                font-size: 32px;
                margin-bottom: 5px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            }
            
            .ticket-header p {
                font-size: 16px;
                opacity: 0.9;
            }
            
            .ticket-body {
                padding: 40px 30px;
            }
            
            .ticket-title {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .ticket-title h2 {
                color: #333;
                font-size: 28px;
                margin-bottom: 10px;
            }
            
            .ticket-numero {
                display: inline-block;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 10px 25px;
                border-radius: 25px;
                font-weight: bold;
                font-size: 18px;
                letter-spacing: 1px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            
            .info-section {
                margin: 25px 0;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 15px;
                border-left: 5px solid #4CAF50;
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                margin: 12px 0;
                padding: 10px 0;
                border-bottom: 1px dashed #ddd;
            }
            
            .info-row:last-child {
                border-bottom: none;
            }
            
            .info-label {
                font-weight: bold;
                color: #666;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .info-value {
                color: #333;
                font-weight: 500;
                text-align: right;
            }
            
            .mensaje-section {
                margin: 25px 0;
                padding: 20px;
                background: #fff9e6;
                border-radius: 15px;
                border: 2px dashed #ffc107;
            }
            
            .mensaje-section h3 {
                color: #f57c00;
                margin-bottom: 10px;
                font-size: 18px;
            }
            
            .mensaje-texto {
                color: #666;
                line-height: 1.6;
                font-style: italic;
            }
            
            .qr-section {
                text-align: center;
                margin: 30px 0;
                padding: 20px;
                background: #f0f0f0;
                border-radius: 15px;
            }
            
            .qr-code {
                display: inline-block;
                background: white;
                padding: 20px;
                border-radius: 10px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                line-height: 1.2;
                white-space: pre;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            
            .qr-label {
                margin-top: 10px;
                color: #666;
                font-size: 14px;
            }
            
            .ticket-footer {
                background: #f8f9fa;
                padding: 25px;
                text-align: center;
                border-top: 3px dashed #ddd;
            }
            
            .importante {
                background: #fff3cd;
                border: 2px solid #ffc107;
                border-radius: 10px;
                padding: 15px;
                margin: 20px 0;
            }
            
            .importante h4 {
                color: #856404;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .importante ul {
                list-style: none;
                padding: 0;
                color: #856404;
            }
            
            .importante li {
                padding: 5px 0;
                padding-left: 25px;
                position: relative;
            }
            
            .importante li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: #4CAF50;
                font-weight: bold;
            }
            
            .contacto-footer {
                margin-top: 20px;
                color: #666;
                font-size: 14px;
                line-height: 1.6;
            }
            
            .botones-accion {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 25px;
                flex-wrap: wrap;
            }
            
            .btn {
                padding: 12px 30px;
                border: none;
                border-radius: 25px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }
            
            .btn-imprimir {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            
            .btn-imprimir:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
            }
            
            .btn-descargar {
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
            }
            
            .btn-descargar:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(76, 175, 80, 0.6);
            }
            
            .btn-cerrar {
                background: #e0e0e0;
                color: #333;
            }
            
            .btn-cerrar:hover {
                background: #d0d0d0;
                transform: translateY(-2px);
            }
            
            .huellitas {
                text-align: center;
                margin: 20px 0;
                font-size: 24px;
                opacity: 0.3;
                animation: flotar 3s ease-in-out infinite;
            }
            
            @keyframes flotar {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @media print {
                body {
                    background: white;
                    padding: 0;
                }
                
                .botones-accion {
                    display: none;
                }
                
                .ticket-container {
                    box-shadow: none;
                }
            }
            
            @media (max-width: 600px) {
                .ticket-container {
                    border-radius: 0;
                }
                
                .ticket-body {
                    padding: 30px 20px;
                }
                
                .info-row {
                    flex-direction: column;
                    gap: 5px;
                }
                
                .info-value {
                    text-align: left;
                }
                
                .botones-accion {
                    flex-direction: column;
                }
                
                .btn {
                    width: 100%;
                    justify-content: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="ticket-container">
            <!-- HEADER -->
            <div class="ticket-header">
                <div class="logo-container">
                    <img src="../img/logo_voz_animal.png.jpg" alt="Voz Animal" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="logo-placeholder" style="display: none;">🐾</div>
                </div>
                <h1>Voz Animal</h1>
                <p>Adopta, cuida y ama</p>
            </div>
            
            <!-- BODY -->
            <div class="ticket-body">
                <div class="ticket-title">
                    <h2>🎫 Ticket de Visita Confirmado</h2>
                    <p style="color: #666; margin-top: 10px;">Guarda este ticket para tu visita</p>
                    <div style="margin-top: 15px;">
                        <span class="ticket-numero">${numeroTicket}</span>
                    </div>
                </div>
                
                <!-- INFORMACIÓN DEL VISITANTE -->
                <div class="info-section">
                    <div class="info-row">
                        <span class="info-label">👤 Nombre:</span>
                        <span class="info-value">${datos.nombre}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">📧 Email:</span>
                        <span class="info-value">${datos.email}</span>
                    </div>
                    ${datos.telefono ? `
                    <div class="info-row">
                        <span class="info-label">📱 Teléfono:</span>
                        <span class="info-value">${datos.telefono}</span>
                    </div>
                    ` : ''}
                    <div class="info-row">
                        <span class="info-label">📅 Fecha de Emisión:</span>
                        <span class="info-value">${fechaHora}</span>
                    </div>
                </div>
                
                <!-- MENSAJE -->
                ${datos.mensaje ? `
                <div class="mensaje-section">
                    <h3>💬 Tu mensaje:</h3>
                    <p class="mensaje-texto">"${datos.mensaje}"</p>
                </div>
                ` : ''}
                
                <!-- CÓDIGO QR -->
                <div class="qr-section">
                    <div class="qr-code">${codigoQR}</div>
                    <p class="qr-label">Escanea en recepción</p>
                </div>
                
                <!-- INFORMACIÓN IMPORTANTE -->
                <div class="importante">
                    <h4>⚠️ Información Importante</h4>
                    <ul>
                        <li>Presenta este ticket al llegar a nuestras instalaciones</li>
                        <li>Horario: Lunes a Viernes 9:00 AM - 6:00 PM</li>
                        <li>Sábados 10:00 AM - 4:00 PM (Domingos cerrado)</li>
                        <li>Ubicación: Av. Esperanza 555, Huancayo, Perú</li>
                        <li>Te responderemos en máximo 24 horas hábiles</li>
                    </ul>
                </div>
                
                <div class="huellitas">🐾 🐾 🐾</div>
            </div>
            
            <!-- FOOTER -->
            <div class="ticket-footer">
                <div class="contacto-footer">
                    <strong>Voz Animal</strong><br>
                    Av. Esperanza 555, Huancayo, Perú<br>
                    📞 (01) 0000000 | 📧 info@vozanimal.org<br>
                    🌐 www.vozanimal.org
                </div>
                
                <div class="botones-accion">
                    <button class="btn btn-imprimir" onclick="window.print()">
                        🖨️ Imprimir Ticket
                    </button>
                    <button class="btn btn-descargar" onclick="descargarPDF()">
                        📥 Descargar PDF
                    </button>
                    <button class="btn btn-cerrar" onclick="window.close()">
                        ✖️ Cerrar
                    </button>
                </div>
            </div>
        </div>
        
        <script>
            function descargarPDF() {
                window.print();
                setTimeout(() => {
                    alert('💡 Tip: Usa "Guardar como PDF" en las opciones de impresión para crear un archivo PDF del ticket.');
                }, 100);
            }
            
            // Animación de entrada
            window.addEventListener('load', () => {
                document.querySelector('.ticket-container').style.animation = 'aparecer 0.6s ease-out';
            });
        </script>
    </body>
    </html>
    `;
}

function abrirTicketEnNuevaVentana(htmlTicket) {
    const ventana = window.open('', 'Ticket', 'width=800,height=900,scrollbars=yes');
    if (ventana) {
        ventana.document.write(htmlTicket);
        ventana.document.close();
    } else {
        alert('⚠️ Por favor permite las ventanas emergentes para ver tu ticket.');
    }
}

function descargarTicketHTML(htmlTicket, nombreArchivo) {
    const blob = new Blob([htmlTicket], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ========================================
//  INTEGRACIÓN CON EL FORMULARIO
// ========================================
function procesarFormularioConTicket() {
    const formulario = document.getElementById('formulario-contacto');
    
    if (!formulario) {
        console.error('No se encontró el formulario de contacto');
        return;
    }
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Recopilar datos del formulario
        const datos = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            mensaje: document.getElementById('mensaje').value.trim()
        };
        
        // Validaciones básicas
        if (datos.nombre.length < 3) {
            alert('⚠️ El nombre debe tener al menos 3 caracteres');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(datos.email)) {
            alert('⚠️ Por favor ingresa un email válido');
            return;
        }
        
        if (datos.mensaje.length < 10) {
            alert('⚠️ El mensaje debe tener al menos 10 caracteres');
            return;
        }
        
        // Mostrar confirmación
        const confirmar = confirm(
            `¿Confirmar envío?\n\n` +
            `Nombre: ${datos.nombre}\n` +
            `Email: ${datos.email}\n\n` +
            `Se generará un ticket de visita.`
        );
        
        if (!confirmar) return;
        
        // Generar el HTML del ticket
        const ticketHTML = crearTicketHTML(datos);
        
        // Abrir ticket en nueva ventana
        abrirTicketEnNuevaVentana(ticketHTML);
        
        // Opción para descargar
        setTimeout(() => {
            const descargar = confirm('✅ ¡Ticket generado!\n\n¿Deseas descargar una copia del ticket en HTML?');
            if (descargar) {
                const nombreArchivo = `ticket_vozanimal_${datos.nombre.replace(/\s+/g, '_')}.html`;
                descargarTicketHTML(ticketHTML, nombreArchivo);
            }
        }, 500);
        
        // Mostrar mensaje de éxito
        alert(`🎉 ¡Gracias ${datos.nombre}!\n\nTu ticket ha sido generado exitosamente.\nTe responderemos pronto a: ${datos.email}\n\n🐾 ¡Esperamos verte pronto en Voz Animal!`);
        
        // Resetear formulario
        this.reset();
    });
}

// ========================================
//  INICIALIZACIÓN AUTOMÁTICA
// ========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', procesarFormularioConTicket);
} else {
    procesarFormularioConTicket();
}

console.log('🎫 Sistema de tickets Voz Animal cargado correctamente');
// ========================================
//  SISTEMA DE PARTÍCULAS FLOTANTES DE FONDO
// ========================================
function crearParticulasFlotantes() {
    const container = document.createElement('div');
    container.className = 'particulas-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.insertBefore(container, document.body.firstChild);

    const particulas = ['🐾', '❤️', '🐕', '🐈', '⭐', '✨'];
    
    setInterval(() => {
        const particula = document.createElement('div');
        particula.textContent = particulas[Math.floor(Math.random() * particulas.length)];
        particula.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: 100%;
            font-size: ${20 + Math.random() * 20}px;
            opacity: 0;
            animation: flotar ${5 + Math.random() * 5}s linear forwards;
        `;
        container.appendChild(particula);
        
        setTimeout(() => particula.remove(), 10000);
    }, 3000);
}

// Agregar animación CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes flotar {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulsar {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes brillar {
        0%, 100% { box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
        50% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.8); }
    }
    
    @keyframes sacudir {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    .input-enfocado {
        animation: brillar 1.5s ease-in-out infinite;
        transition: all 0.3s ease;
    }
    
    .boton-hover {
        animation: pulsar 0.6s ease-in-out infinite;
    }
    
    .campo-error {
        animation: sacudir 0.4s ease;
        border-color: #e74c3c !important;
    }
`;
document.head.appendChild(style);

// ========================================
//  CONFETI MEJORADO CON FORMAS Y COLORES
// ========================================
function confetiAnimacion() {
    const colores = ["#FFC107", "#4CAF50", "#03A9F4", "#E91E63", "#FF5722", "#9C27B0", "#00BCD4"];
    const formas = ['circle', 'square', 'triangle'];
    const cantidad = 80;

    for (let i = 0; i < cantidad; i++) {
        const confeti = document.createElement("div");
        const forma = formas[Math.floor(Math.random() * formas.length)];
        const tamaño = 8 + Math.random() * 12;
        
        confeti.style.cssText = `
            position: fixed;
            width: ${tamaño}px;
            height: ${tamaño}px;
            background-color: ${colores[Math.floor(Math.random() * colores.length)]};
            left: ${Math.random() * 100}vw;
            top: -30px;
            opacity: ${0.6 + Math.random() * 0.4};
            z-index: 10000;
            pointer-events: none;   
            ${forma === 'circle' ? 'border-radius: 50%;' : ''}
            ${forma === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
        `;

        document.body.appendChild(confeti);

        const duracion = 2000 + Math.random() * 2000;
        const rotacion = Math.random() * 720 - 360;
        const desplazamientoX = (Math.random() - 0.5) * 200;

        confeti.animate([
            { 
                transform: 'translateY(0) rotate(0deg) translateX(0)',
                opacity: confeti.style.opacity
            },
            { 
                transform: `translateY(${window.innerHeight + 50}px) rotate(${rotacion}deg) translateX(${desplazamientoX}px)`,
                opacity: 0
            }
        ], {
            duration: duracion,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => confeti.remove(), duracion);
    }
}

// ========================================
//  VALIDACIÓN EN TIEMPO REAL
// ========================================
function configurarValidacionTiempoReal() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

    // Validación de nombre
    nombre.addEventListener('input', function() {
        if (this.value.length > 0 && this.value.length < 3) {
            this.classList.add('campo-error');
        } else {
            this.classList.remove('campo-error');
        }
    });

    // Validación de email
    email.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.length > 0 && !emailRegex.test(this.value)) {
            this.classList.add('campo-error');
        } else {
            this.classList.remove('campo-error');
        }
    });

    // Contador de caracteres para el mensaje
    const contador = document.createElement('div');
    contador.style.cssText = `
        font-size: 12px;
        color: #666;
        text-align: right;
        margin-top: 5px;
    `;
    mensaje.parentElement.insertBefore(contador, mensaje.nextSibling);

    mensaje.addEventListener('input', function() {
        const caracteresActuales = this.value.length;
        contador.textContent = `${caracteresActuales} caracteres`;
        
        if (caracteresActuales < 10 && caracteresActuales > 0) {
            this.classList.add('campo-error');
            contador.style.color = '#e74c3c';
        } else {
            this.classList.remove('campo-error');
            contador.style.color = '#4CAF50';
        }
    });
}

// ========================================
//  EFECTOS DE FOCUS EN INPUTS
// ========================================
function configurarEfectosFocus() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('input-enfocado');
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('input-enfocado');
            this.style.transform = 'scale(1)';
        });
    });
}

// ========================================
//  ANIMACIÓN DEL BOTÓN DE ENVÍO
// ========================================
function configurarBotonEnvio() {
    const boton = document.querySelector('button[type="submit"]');
    
    boton.addEventListener('mouseenter', function() {
        this.classList.add('boton-hover');
    });
    
    boton.addEventListener('mouseleave', function() {
        this.classList.remove('boton-hover');
    });

    // Efecto de ondas al hacer clic
    boton.addEventListener('click', function(e) {
        const onda = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        onda.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(onda);
        
        onda.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => onda.remove(), 600);
    });
}

// ========================================
//  NOTIFICACIÓN PERSONALIZADA
// ========================================
function mostrarNotificacion(titulo, mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    const icono = tipo === 'success' ? '✅' : '⚠️';
    
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: -400px;
        background: ${tipo === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #ff6b6b, #ee5a6f)'};
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10001;
        max-width: 350px;
        font-family: Arial, sans-serif;
    `;
    
    notificacion.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 30px;">${icono}</span>
            <div>
                <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${titulo}</div>
                <div style="font-size: 14px; opacity: 0.95;">${mensaje}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notificacion);
    
    // Animación de entrada
    setTimeout(() => {
        notificacion.style.transition = 'right 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        notificacion.style.right = '20px';
    }, 10);
    
    // Animación de salida
    setTimeout(() => {
        notificacion.style.transition = 'right 0.4s ease-in, opacity 0.4s ease-in';
        notificacion.style.right = '-400px';
        notificacion.style.opacity = '0';
        setTimeout(() => notificacion.remove(), 400);
    }, 4000);
}

// ========================================
//  ENVÍO DEL FORMULARIO CON LOADING
// ========================================
document.getElementById('formulario-contacto').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const boton = this.querySelector('button[type="submit"]');
    
    // Validaciones
    if (nombre.length < 3) {
        mostrarNotificacion('Error', 'El nombre debe tener al menos 3 caracteres', 'error');
        document.getElementById('nombre').classList.add('campo-error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarNotificacion('Error', 'Por favor ingresa un email válido', 'error');
        document.getElementById('email').classList.add('campo-error');
        return;
    }
    
    if (mensaje.length < 10) {
        mostrarNotificacion('Error', 'El mensaje debe tener al menos 10 caracteres', 'error');
        document.getElementById('mensaje').classList.add('campo-error');
        return;
    }
    
    // Efecto de loading en el botón
    const textoOriginal = boton.textContent;
    boton.disabled = true;
    boton.style.opacity = '0.7';
    boton.style.cursor = 'not-allowed';
    
    let puntos = 0;
    const loading = setInterval(() => {
        puntos = (puntos + 1) % 4;
        boton.textContent = 'Enviando' + '.'.repeat(puntos);
    }, 300);
    
    // Simular envío (en producción aquí iría la petición real)
    setTimeout(() => {
        clearInterval(loading);
        boton.textContent = '¡Enviado! ✓';
        boton.style.background = '#4CAF50';
        
        // Confeti y notificación
        confetiAnimacion();
        mostrarNotificacion(
            '¡Mensaje Enviado!',
            `Gracias ${nombre}, te responderemos pronto a ${email} 🐾`,
            'success'
        );
        
        // Resetear formulario
        this.reset();
        
        // Restaurar botón
        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.disabled = false;
            boton.style.opacity = '1';
            boton.style.cursor = 'pointer';
            boton.style.background = '';
        }, 3000);
    }, 2000);
});

// ========================================
//  ANIMACIÓN DEL MAPA AL HACER SCROLL
// ========================================
function animarMapaScroll() {
    const mapa = document.querySelector('.mapa-contacto');
    if (!mapa) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                entry.target.style.transition = 'all 0.8s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(mapa);
}

// ========================================
//  EFECTO PARALLAX EN SECCIONES
// ========================================
function efectoParallax() {
    const secciones = document.querySelectorAll('.info-contacto, .formulario-contacto');
    
    window.addEventListener('scroll', () => {
        secciones.forEach(seccion => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            seccion.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ========================================
//  INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    crearParticulasFlotantes();
    configurarValidacionTiempoReal();
    configurarEfectosFocus();
    configurarBotonEnvio();
    animarMapaScroll();
    // efectoParallax(); // Descomenta si deseas el efecto parallax
    
    console.log('🐾 Sistema de contacto mejorado cargado exitosamente');
});
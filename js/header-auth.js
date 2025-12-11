// ===================================
// HEADER AUTH - Manejo de autenticación en header
// Archivo: js/header-auth.js
// ===================================

/**
 * Verifica el estado de login y actualiza el header
 */
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const container = document.getElementById('headerLoginContainer');

    if (!container) {
        console.warn('Contenedor headerLoginContainer no encontrado');
        return;
    }

    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            showUserInfo(user, container);
        } catch (error) {
            console.error('Error al parsear usuario:', error);
            showLoginButton(container);
        }
    } else {
        showLoginButton(container);
    }
}

/**
 * Muestra información del usuario logueado
 */
function showUserInfo(user, container) {
    const dashboardUrl = user.rol === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
    const userInitial = user.nombre.charAt(0).toUpperCase();
    
    container.innerHTML = `
        <div class="user-info-header">
            <div class="user-avatar-small">${userInitial}</div>
            <span class="user-name-header">${user.nombre}</span>
            <a href="${dashboardUrl}" class="btn-dashboard">Mi Panel</a>
            <button onclick="logoutFromIndex()" class="btn-logout-header">Salir</button>
        </div>
    `;
}

/**
 * Muestra el botón de iniciar sesión
 */
function showLoginButton(container) {
    container.innerHTML = `
        <a href="login.html" class="btn-login">
            <span class="btn-login-icon">👤</span>
            <span>Iniciar Sesión</span>
        </a>
    `;
}

/**
 * Cierra la sesión del usuario
 */
function logoutFromIndex() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }
}

// Hacer funciones globales
window.checkLoginStatus = checkLoginStatus;
window.logoutFromIndex = logoutFromIndex;

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', checkLoginStatus);
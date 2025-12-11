// ============================================
// 📄 frontend/js/auth.js
// Funciones de autenticación
// ============================================

/**
 * Iniciar sesión
 */
async function login(email, password) {
  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      // Guardar token y usuario
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      return { success: true, user: data.data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, message: 'Error de conexión con el servidor' };
  }
}

/**
 * Registrar nuevo usuario
 */
async function register(userData) {
  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (data.success) {
      // Guardar token y usuario
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      return { success: true, user: data.data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error en register:', error);
    return { success: false, message: 'Error de conexión con el servidor' };
  }
}

/**
 * Cerrar sesión
 */
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

/**
 * Verificar autenticación y redirigir si es necesario
 */
function requireAuth(requiredRole = null) {
  const token = getToken();
  const user = getCurrentUser();

  // No está autenticado
  if (!token || !user) {
    window.location.href = 'login.html';
    return false;
  }

  // Verificar rol si se especifica
  if (requiredRole && user.rol !== requiredRole) {
    if (user.rol === 'admin') {
      window.location.href = 'admin-dashboard.html';
    } else {
      window.location.href = 'user-dashboard.html';
    }
    return false;
  }

  return true;
}

/**
 * Obtener perfil del usuario autenticado
 */
async function getProfile() {
  try {
    const data = await apiRequest('/auth/profile');
    return data;
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return null;
  }
}

/**
 * Actualizar perfil
 */
async function updateProfile(profileData) {
  try {
    const data = await apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
    
    if (data.success) {
      // Actualizar usuario en localStorage
      const user = getCurrentUser();
      const updatedUser = { ...user, ...data.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return data;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return { success: false, message: 'Error al actualizar perfil' };
  }
}

/**
 * Cambiar contraseña
 */
async function changePassword(currentPassword, newPassword) {
  try {
    const data = await apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
    
    return data;
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    return { success: false, message: 'Error al cambiar contraseña' };
  }
}
// ============================================
// 📄 frontend/js/admin/solicitudes.js
// CRUD de Solicitudes para Admin
// ============================================

/**
 * Cargar todas las solicitudes
 */
async function loadSolicitudes() {
  try {
    const data = await apiRequest('/solicitudes');

    const container = document.getElementById('solicitudesContainer');

    if (data.success && data.data.length > 0) {
      container.className = 'table-container';
      container.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Animal</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${data.data.map(sol => `
              <tr>
                <td><strong>#${sol.id_solicitud}</strong></td>
                <td>${sol.nombre_usuario || 'Usuario'}</td>
                <td>${sol.nombre_animal || 'Animal'}</td>
                <td>${formatDate(sol.fecha_solicitud)}</td>
                <td><span class="badge badge-${sol.estado}">${sol.estado}</span></td>
                <td>
                  <button class="btn-sm btn-view" onclick="verSolicitud(${sol.id_solicitud})">Ver</button>
                  ${sol.estado === 'pendiente' ? `
                    <button class="btn-sm btn-approve" onclick="aprobarSolicitud(${sol.id_solicitud})">Aprobar</button>
                    <button class="btn-sm btn-reject" onclick="rechazarSolicitud(${sol.id_solicitud})">Rechazar</button>
                  ` : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else {
      container.className = 'empty-state';
      container.innerHTML = `
        <div class="empty-icon">📋</div>
        <p>No hay solicitudes registradas</p>
      `;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('solicitudesContainer').innerHTML = 
      '<p style="color:red;text-align:center;">Error al cargar solicitudes</p>';
  }
}

/**
 * Ver detalles de una solicitud
 */
async function verSolicitud(id) {
  try {
    const data = await apiRequest(`/solicitudes/${id}`);
    
    if (data.success) {
      const sol = data.data;
      alert(`
DETALLES DE LA SOLICITUD #${sol.id_solicitud}

Usuario: ${sol.nombre_usuario}
Email: ${sol.email_usuario}
Teléfono: ${sol.telefono_usuario || 'No proporcionado'}

Animal: ${sol.nombre_animal}
Tipo: ${sol.tipo_animal}

Motivo de adopción:
${sol.motivo_adopcion || 'No especificado'}

Experiencia con mascotas:
${sol.experiencia_mascotas || 'No especificado'}

Estado: ${sol.estado}
Fecha: ${formatDate(sol.fecha_solicitud)}
      `);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al cargar detalles de la solicitud');
  }
}

/**
 * Aprobar solicitud
 */
async function aprobarSolicitud(id) {
  if (!confirm('¿Aprobar esta solicitud de adopción?\n\nEl usuario será notificado y el animal pasará a estado "reservado".')) {
    return;
  }

  try {
    const data = await apiRequest(`/solicitudes/${id}/estado`, {
      method: 'PUT',
      body: JSON.stringify({ estado: 'aprobada' })
    });

    if (data.success) {
      alert('✅ Solicitud aprobada exitosamente');
      loadSolicitudes();
      loadDashboardStats();
    } else {
      alert(data.message || 'Error al aprobar solicitud');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al aprobar solicitud');
  }
}

/**
 * Rechazar solicitud
 */
async function rechazarSolicitud(id) {
  const motivo = prompt('¿Por qué se rechaza esta solicitud?\n(El motivo será visible para el usuario)');
  
  if (motivo === null) {
    return; // Usuario canceló
  }

  try {
    const data = await apiRequest(`/solicitudes/${id}/estado`, {
      method: 'PUT',
      body: JSON.stringify({ 
        estado: 'rechazada',
        motivo_rechazo: motivo || 'Sin motivo especificado'
      })
    });

    if (data.success) {
      alert('❌ Solicitud rechazada');
      loadSolicitudes();
      loadDashboardStats();
    } else {
      alert(data.message || 'Error al rechazar solicitud');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al rechazar solicitud');
  }
}
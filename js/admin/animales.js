// ============================================
// 📄 frontend/js/admin/animales.js
// CRUD de Animales para Admin
// ============================================

/**
 * Cargar todos los animales
 */
async function loadAnimales() {
  try {
    const data = await apiRequest('/animales');

    const container = document.getElementById('animalesContainer');

    if (data.success && data.data.length > 0) {
      container.className = 'table-container';
      container.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${data.data.map(animal => `
              <tr>
                <td><strong>#${animal.id_animal}</strong></td>
                <td>${animal.nombre}</td>
                <td>${animal.tipo === 'perro' ? '🐕 Perro' : '🐈 Gato'}</td>
                <td>${animal.raza || 'Mixto'}</td>
                <td>${animal.edad_anos || 0}a ${animal.edad_meses || 0}m</td>
                <td><span class="badge badge-${animal.estado}">${animal.estado}</span></td>
                <td>
                  <button class="btn-sm btn-view" onclick="verAnimal(${animal.id_animal})">Ver</button>
                  <button class="btn-sm btn-edit" onclick="editarAnimal(${animal.id_animal})">Editar</button>
                  <button class="btn-sm btn-delete" onclick="eliminarAnimal(${animal.id_animal})">Eliminar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else {
      container.className = 'empty-state';
      container.innerHTML = `
        <div class="empty-icon">🐾</div>
        <p>No hay animales registrados</p>
        <button class="btn-primary" onclick="openModalAnimal()" style="margin-top: 1rem;">
          Agregar Primer Animal
        </button>
      `;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('animalesContainer').innerHTML = 
      '<p style="color:red;text-align:center;">Error al cargar animales</p>';
  }
}

/**
 * Ver detalles de un animal
 */
function verAnimal(id) {
  alert(`Funcionalidad en desarrollo: Ver detalles del animal #${id}`);
}

/**
 * Abrir modal para editar animal
 */
function editarAnimal(id) {
  openModalAnimal(id);
}

/**
 * Eliminar animal
 */
async function eliminarAnimal(id) {
  if (!confirm('¿Estás seguro de eliminar este animal? Esta acción no se puede deshacer.')) {
    return;
  }

  try {
    const data = await apiRequest(`/animales/${id}`, {
      method: 'DELETE'
    });

    if (data.success) {
      alert('Animal eliminado exitosamente');
      loadAnimales();
      loadDashboardStats();
    } else {
      alert(data.message || 'Error al eliminar animal');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar animal');
  }
}

/**
 * Abrir modal de animal (agregar o editar)
 */
function openModalAnimal(id = null) {
  document.getElementById('modalAnimal').classList.add('show');
  document.getElementById('formAnimal').reset();
  document.getElementById('modalAlert').style.display = 'none';

  if (id) {
    document.getElementById('modalAnimalTitle').textContent = 'Editar Animal';
    document.getElementById('btnSubmitAnimal').textContent = 'Actualizar Animal';
    cargarDatosAnimal(id);
  } else {
    document.getElementById('modalAnimalTitle').textContent = 'Agregar Animal';
    document.getElementById('btnSubmitAnimal').textContent = 'Guardar Animal';
    document.getElementById('animalId').value = '';
  }
}

/**
 * Cerrar modal de animal
 */
function closeModalAnimal() {
  document.getElementById('modalAnimal').classList.remove('show');
}

/**
 * Cargar datos de un animal en el formulario
 */
async function cargarDatosAnimal(id) {
  try {
    const data = await apiRequest(`/animales/${id}`);

    if (data.success) {
      const animal = data.data;
      document.getElementById('animalId').value = animal.id_animal;
      document.getElementById('animalNombre').value = animal.nombre;
      document.getElementById('animalTipo').value = animal.tipo;
      document.getElementById('animalSexo').value = animal.sexo;
      document.getElementById('animalRaza').value = animal.raza || '';
      document.getElementById('animalTamanio').value = animal.tamanio;
      document.getElementById('animalEdadAnos').value = animal.edad_anos || 0;
      document.getElementById('animalEdadMeses').value = animal.edad_meses || 0;
      document.getElementById('animalPeso').value = animal.peso || '';
      document.getElementById('animalColor').value = animal.color || '';
      document.getElementById('animalDescripcion').value = animal.descripcion || '';
      document.getElementById('animalCaracteristicas').value = animal.caracteristicas || '';
      document.getElementById('animalEstadoSalud').value = animal.estado_salud || '';
      document.getElementById('animalEstado').value = animal.estado;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al cargar datos del animal');
    closeModalAnimal();
  }
}

/**
 * Guardar animal (crear o actualizar)
 */
async function submitAnimal(event) {
  event.preventDefault();

  const id = document.getElementById('animalId').value;
  const btnSubmit = document.getElementById('btnSubmitAnimal');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Guardando...';

  const animalData = {
    nombre: document.getElementById('animalNombre').value,
    tipo: document.getElementById('animalTipo').value,
    sexo: document.getElementById('animalSexo').value,
    raza: document.getElementById('animalRaza').value || null,
    tamanio: document.getElementById('animalTamanio').value,
    edad_anos: parseInt(document.getElementById('animalEdadAnos').value) || 0,
    edad_meses: parseInt(document.getElementById('animalEdadMeses').value) || 0,
    peso: parseFloat(document.getElementById('animalPeso').value) || null,
    color: document.getElementById('animalColor').value || null,
    descripcion: document.getElementById('animalDescripcion').value || null,
    caracteristicas: document.getElementById('animalCaracteristicas').value || null,
    estado_salud: document.getElementById('animalEstadoSalud').value || null,
    estado: document.getElementById('animalEstado').value
  };

  try {
    const endpoint = id ? `/animales/${id}` : '/animales';
    const method = id ? 'PUT' : 'POST';

    const data = await apiRequest(endpoint, {
      method: method,
      body: JSON.stringify(animalData)
    });

    if (data.success) {
      showModalAlert('success', id ? 'Animal actualizado exitosamente' : 'Animal agregado exitosamente');

      setTimeout(() => {
        closeModalAnimal();
        loadAnimales();
        loadDashboardStats();
      }, 1500);
    } else {
      showModalAlert('error', data.message || 'Error al guardar animal');
      btnSubmit.disabled = false;
      btnSubmit.textContent = id ? 'Actualizar Animal' : 'Guardar Animal';
    }
  } catch (error) {
    console.error('Error:', error);
    showModalAlert('error', 'Error al guardar animal');
    btnSubmit.disabled = false;
    btnSubmit.textContent = id ? 'Actualizar Animal' : 'Guardar Animal';
  }
}

/**
 * Mostrar alerta en el modal
 */
function showModalAlert(type, message) {
  const alert = document.getElementById('modalAlert');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  alert.style.display = 'block';

  if (type === 'success') {
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  }
}
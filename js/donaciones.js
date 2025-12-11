// donaciones.js

// Función para calcular el total de donaciones
function calcularTotal() {
    // Obtener valores de comida para perros
    const precioPerro = parseFloat(document.getElementById('comidaPerro').value);
    const cantidadPerro = parseFloat(document.getElementById('cantidadPerro').value) || 0;
    
    // Obtener valores de comida para gatos
    const precioGato = parseFloat(document.getElementById('comidaGato').value);
    const cantidadGato = parseFloat(document.getElementById('cantidadGato').value) || 0;
    
    // Calcular subtotales
    const subtotalPerro = precioPerro * cantidadPerro;
    const subtotalGato = precioGato * cantidadGato;
    
    // Calcular total
    const total = subtotalPerro + subtotalGato;
    
    // Mostrar resultado
    document.getElementById('costoTotal').value = 'S/ ' + total.toFixed(2);
    
    // Guardar datos para el PDF (opcional)
    window.datosdonacion = {
        perro: {
            precio: precioPerro,
            cantidad: cantidadPerro,
            subtotal: subtotalPerro,
            marca: document.getElementById('comidaPerro').options[document.getElementById('comidaPerro').selectedIndex].text
        },
        gato: {
            precio: precioGato,
            cantidad: cantidadGato,
            subtotal: subtotalGato,
            marca: document.getElementById('comidaGato').options[document.getElementById('comidaGato').selectedIndex].text
        },
        total: total
    };
}

// Función para generar PDF con matriz de donaciones
function generarPDF() {
    // Verificar que se haya calculado el total
    if (!window.datosdonacion) {
        alert('Por favor, primero calcule el total de la donación');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuración de colores
    const colorPrimario = [41, 128, 185]; // Azul
    const colorSecundario = [52, 73, 94]; // Gris oscuro
    
    // Encabezado
    doc.setFillColor(...colorPrimario);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('VOZ ANIMAL', 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Comprobante de Donación', 105, 25, { align: 'center' });
    
    // Información general
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-PE')}`, 20, 50);
    doc.text(`Hora: ${new Date().toLocaleTimeString('es-PE')}`, 20, 56);
    
    // Título de la matriz
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colorSecundario);
    doc.text('DETALLE DE DONACIÓN EN ALIMENTOS', 105, 70, { align: 'center' });
    
    // Crear matriz/tabla con autoTable
    doc.autoTable({
        startY: 80,
        head: [['Tipo', 'Marca', 'Precio/kg', 'Cantidad (kg)', 'Subtotal (S/)']],
        body: [
            [
                'Comida para Perros',
                window.datosdonacion.perro.marca,
                'S/ ' + window.datosdonacion.perro.precio.toFixed(2),
                window.datosdonacion.perro.cantidad.toFixed(2),
                'S/ ' + window.datosdonacion.perro.subtotal.toFixed(2)
            ],
            [
                'Comida para Gatos',
                window.datosdonacion.gato.marca,
                'S/ ' + window.datosdonacion.gato.precio.toFixed(2),
                window.datosdonacion.gato.cantidad.toFixed(2),
                'S/ ' + window.datosdonacion.gato.subtotal.toFixed(2)
            ]
        ],
        foot: [['', '', '', 'TOTAL:', 'S/ ' + window.datosdonacion.total.toFixed(2)]],
        headStyles: {
            fillColor: colorPrimario,
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center'
        },
        footStyles: {
            fillColor: [236, 240, 241],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            halign: 'right'
        },
        bodyStyles: {
            halign: 'center'
        },
        columnStyles: {
            0: { halign: 'left' },
            1: { halign: 'left' },
            4: { halign: 'right' }
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245]
        },
        margin: { left: 20, right: 20 }
    });
    
    // Pie de página
    const finalY = doc.lastAutoTable.finalY + 20;
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('¡Gracias por tu generosa donación!', 105, finalY, { align: 'center' });
    doc.text('Tu apoyo ayuda a alimentar a muchos animales refugiados.', 105, finalY + 6, { align: 'center' });
    
    // Información de contacto
    doc.setFontSize(8);
    doc.text('Voz Animal - www.vozanimal.org', 105, finalY + 20, { align: 'center' });
    doc.text('Av. Esperanza 555, Huancayo, Perú', 105, finalY + 25, { align: 'center' });
    doc.text('Tel: (01) 0000000', 105, finalY + 30, { align: 'center' });
    
    // Guardar PDF
    doc.save(`Donacion_VozAnimal_${new Date().getTime()}.pdf`);
}
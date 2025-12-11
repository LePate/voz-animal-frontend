function crearContenidoBaucher(nombre, mascota, fecha, horario) {
    return `
        <h2>Refugio de Mascotas "Voz Animal"</h2>
        <p><strong>Adoptante:</strong> ${nombre}</p>
        <p><strong>Mascota:</strong> ${mascota}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Horario:</strong> ${horario}</p>
        <p><strong>Encargado:</strong> Srta. María López</p>
        <p><em>⚠️ Si el adoptante no se presenta en el horario establecido, la adopción será cancelada automáticamente.</em></p>
    `;
}

document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('adoptante').value;
    const mascota = document.getElementById('mascota').value;
    const fecha = document.getElementById('fecha').value;
    const horario = document.getElementById('horario').value;

    const contenidoHTML = crearContenidoBaucher(nombre, mascota, fecha, horario);
    document.getElementById('baucher').innerHTML = contenidoHTML;
});

function descargarPDF() {
    const nombre = document.getElementById('adoptante').value;
    const mascota = document.getElementById('mascota').value;
    const fecha = document.getElementById('fecha').value;
    const horario = document.getElementById('horario').value;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const marginLeft = 20;
    let verticalSpace = 20;

    // Título centrado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Refugio de Mascotas - Voz Animal", 105, verticalSpace, { align: "center" });
    verticalSpace += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.text("Comprobante de Solicitud de Adopción", 105, verticalSpace, { align: "center" });
    verticalSpace += 10;

    // Línea
    doc.setLineWidth(0.5);
    doc.line(marginLeft, verticalSpace, 190, verticalSpace);
    verticalSpace += 10;

    // Recuadro con datos
    const boxHeight = 60;
    doc.setDrawColor(150);
    doc.rect(marginLeft, verticalSpace, 170, boxHeight);

    let y = verticalSpace + 10;
    const labelX = marginLeft + 5;
    const valueX = marginLeft + 50;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text("Adoptante:", labelX, y);
    doc.text(`${nombre}`, valueX, y);
    y += 8;

    doc.text("Mascota:", labelX, y);
    doc.text(`${mascota}`, valueX, y);
    y += 8;

    doc.text("Fecha:", labelX, y);
    doc.text(`${fecha}`, valueX, y);
    y += 8;

    doc.text("Horario:", labelX, y);
    doc.text(`${horario}`, valueX, y);
    y += 8;

    doc.text("Lugar:", labelX, y);
    doc.text("Refugio Central - Av. Siempre Viva 123", valueX, y);
    y += 8;

    doc.text("Encargado:", labelX, y);
    doc.text("Ana Torres (Responsable de Adopciones)", valueX, y);

    verticalSpace += boxHeight + 10;

    // Indicaciones
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Indicaciones Importantes:", marginLeft, verticalSpace);
    verticalSpace += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const indicaciones = [
        "- Si el adoptante no se presenta en el horario acordado, la cita será anulada.",
        "- Se recomienda llegar con 10 minutos de anticipación.",
        "- Llevar documento de identidad original.",
        "- El proceso puede tardar entre 20 y 30 minutos."
    ];

    indicaciones.forEach(line => {
        doc.text(line, marginLeft, verticalSpace);
        verticalSpace += 6;
    });

    // Pie de página
    verticalSpace += 10;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Gracias por dar una segunda oportunidad a un peludo.", 105, verticalSpace, { align: "center" });

    doc.save("Comprobante_Adopcion.pdf");
}

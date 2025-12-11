document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-voluntariado");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validar si jsPDF está disponible
    if (typeof window.jspdf === "undefined") {
      alert("Error: jsPDF no se ha cargado correctamente.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // === 1. Obtener datos del formulario ===
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const estado = document.querySelector('input[name="estado"]:checked')?.value || "";
    const profesion = document.getElementById("profesion").value;
    const distrito = document.getElementById("distrito").value;
    const disponibilidad = document.getElementById("disponibilidad").value;
    const animal = document.getElementById("animalFaborito").value;

    // === 2. Título del PDF ===
    doc.setTextColor(44, 62, 80); // Azul oscuro
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("BOLETA DE REGISTRO DE VOLUNTARIADO", 105, 25, { align: "center" });

    // === 3. Caja decorativa ===
    doc.setDrawColor(150); // Borde gris claro
    doc.setLineWidth(0.5);
    doc.rect(15, 35, 180, 115); // x, y, width, height

    // === 4. Contenido del formulario ===
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const datos = [
      `Nombre completo: ${nombre}`,
      `Número de celular: ${telefono}`,
      `Correo electrónico: ${correo}`,
      `Estado: ${estado}`,
      `Profesión o carrera: ${profesion}`,
      `Distrito de residencia: ${distrito}`,
      `Disponibilidad: ${disponibilidad}`,
      `Animal preferido: ${animal}`
    ];

    let y = 45;
    const espacio = 10;

    datos.forEach((linea) => {
      doc.text(linea, 25, y);
      y += espacio;
    });

    // === 5. Pie de agradecimiento ===
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("Gracias por unirte a esta hermosa causa animalista 💙🐾", 105, 160, { align: "center" });
    doc.text("Voz Animal - www.vozanimal.org", 105, 168, { align: "center" });

    // === 6. Guardar PDF ===
    doc.save("boleta_voluntariado.pdf");
  });
});

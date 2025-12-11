// Contenido para visitas.js (CORREGIDO)

document.addEventListener("DOMContentLoaded", () => {
    
    // Tus funciones originales (calcularVisitas, analizarRutina, etc.) se mantienen igual.
    // ...
    window.calcularVisitas = function () {
      const duracion = parseInt(document.getElementById("duracion").value);
      const resultado = document.getElementById("resultadoVisitas");
      if (isNaN(duracion) || duracion <= 0) { resultado.innerHTML = "<span style='color:red;'>Duración inválida.</span>"; return; }
      const DURACION_DIA_MINUTOS = 480;
      const cantidadVisitas = Math.floor(DURACION_DIA_MINUTOS / duracion);
      resultado.innerHTML = `Se pueden programar <strong>${cantidadVisitas}</strong> visitas por día.`;
    };

    window.analizarRutina = function () {
      const peso = parseFloat(document.getElementById("pesoRutina").value) || 0;
      const juego = parseFloat(document.getElementById("juegoRutina").value) || 0;
      const resultado = document.getElementById("resultadoRutina");
      if (peso <= 0 || juego < 0) { resultado.innerHTML = "<span style='color:red;'>Datos inválidos.</span>"; return; }
      const agua = peso * 50 + juego * 15;
      const energia = peso * 20 + juego * 25;
      resultado.innerHTML = `Agua: <strong>${agua.toFixed(0)} ml</strong> | Energía: <strong>${energia.toFixed(0)} kcal</strong>`;
    };
    
    window.planificarSalud = function () {
      const edad = parseInt(document.getElementById("edadMascota").value);
      const actividad = document.getElementById("tipoActividad").value;
      const resultado = document.getElementById("resultadoSalud");
      if (isNaN(edad) || edad < 0 || edad > 25) { resultado.innerHTML = "<span style='color:red;'>Ingresa una edad válida.</span>"; return; }
      let frecBaño, proxVet;
      if (actividad === 'alta') frecBaño = "Cada 3-4 semanas"; else if (actividad === 'moderada') frecBaño = "Cada 4-6 semanas"; else frecBaño = "Cada 6-8 semanas";
      if (edad < 1) proxVet = "Revisión en 3 meses"; else if (edad <= 7) proxVet = "Revisión anual"; else proxVet = "Revisión semestral";
      resultado.innerHTML = `Frecuencia de Baño: <strong>${frecBaño}</strong><br>Próxima Visita al Vet: <strong>${proxVet}</strong>`;
    };

    window.sugerirJuegos = function () {
        const tipoMascota = document.getElementById("tipoMascotaJuego").value;
        const energia = document.getElementById("nivelEnergia").value;
        const resultado = document.getElementById("resultadoJuegos");
        const juegos = {
            perro: { baja: ["Búsqueda de premios", "Juguetes Kong"], media: ["Buscar la pelota", "Nuevos trucos"], alta: ["Correr o trotar", "Agility"] },
            gato: { baja: ["Puntero láser", "Cajas de cartón"], media: ["Cañas de pescar", "Rascadores altos"], alta: ["Circuitos caseros", "Juguetes motorizados"] }
        };
        const sugerencias = juegos[tipoMascota][energia];
        resultado.innerHTML = `Sugerencias: <strong>${sugerencias.join(', ')}</strong>`;
    };

    window.calcularVacunas = function () {
      const especie = document.getElementById("especieVacuna").value;
      const edadMeses = parseInt(document.getElementById("edadVacuna").value);
      const resultado = document.getElementById("resultadoVacunas");
      if (isNaN(edadMeses) || edadMeses < 1) { resultado.innerHTML = "<span style='color:red;'>Ingresa edad en meses.</span>"; return; }
      let proximaVacuna = "Refuerzo Anual";
      if (especie === 'perro') {
          if (edadMeses < 2) proximaVacuna = "Primovacunación (Parvo/Moquillo)";
          else if (edadMeses <= 3) proximaVacuna = "Polivalente (2da dosis)";
          else if (edadMeses <= 4) proximaVacuna = "Polivalente (refuerzo) + Rabia";
      } else {
          if (edadMeses < 2) proximaVacuna = "Trivalente Felina (1ra dosis)";
          else if (edadMeses <= 3) proximaVacuna = "Trivalente Felina (2da dosis)";
          else if (edadMeses <= 4) proximaVacuna = "Leucemia (si es de riesgo)";
      }
      resultado.innerHTML = `Próxima vacuna sugerida: <strong>${proximaVacuna}</strong>`;
    };

    // --- CÓDIGO PARA GENERAR PDF (VERSIÓN CORREGIDA) ---
    document.getElementById("generarPlanPDF").addEventListener("click", () => {
      if (typeof window.jspdf === "undefined") { alert("Error: PDF no disponible."); return; }
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      const nombreMascota = document.getElementById("nombreMascota").value || "Tu Mascota";
      const peso = parseFloat(document.getElementById("pesoRutina").value) || 0;
      const juego = parseFloat(document.getElementById("juegoRutina").value) || 0;
      const edad = parseInt(document.getElementById("edadMascota").value) || 0;
      const tipoActividad = document.getElementById("tipoActividad").value;
      const tipoMascotaJuego = document.getElementById("tipoMascotaJuego").value;
      const nivelEnergia = document.getElementById("nivelEnergia").value;
      const recomendacionVacuna = document.getElementById("resultadoVacunas").innerHTML.replace(/<[^>]*>/g, "");

      if (peso <= 0) { alert("Introduce el peso de la mascota para generar el plan."); return; }
      
      doc.setFontSize(20); doc.setFont("helvetica", "bold");
      doc.text(`PLAN DE CUIDADO PARA ${nombreMascota.toUpperCase()}`, 105, 22, { align: "center" });
      
      doc.setDrawColor(180); doc.rect(15, 28, 180, 165); // Rectángulo ligeramente más alto
      
      doc.setFontSize(12); let y = 40; const espacio = 9; const seccionEspacio = 15;

      // Sección 1: CUIDADO FISICO
      doc.setFont("helvetica", "bold"); doc.text("CUIDADO FISICO:", 25, y); y += espacio;
      doc.setFont("helvetica", "normal");
      const agua = peso * 50 + juego * 15;
      const energia = peso * 20 + juego * 25;
      doc.text(`- Hidratacion (Agua): ${agua.toFixed(0)} ml`, 30, y); y += espacio;
      doc.text(`- Energia (Calorias): ${energia.toFixed(0)} kcal`, 30, y); y += seccionEspacio; // Espacio mayor entre secciones

      // Sección 2: PLAN DE SALUD
      let frecBaño, proxVet;
      if (tipoActividad === 'alta') frecBaño = "Cada 3-4 semanas"; else if (tipoActividad === 'moderada') frecBaño = "Cada 4-6 semanas"; else frecBaño = "Cada 6-8 semanas";
      if (edad < 1) proxVet = "Revision en 3 meses"; else if (edad <= 7) proxVet = "Revision anual"; else proxVet = "Revision semestral";
      doc.setFont("helvetica", "bold"); doc.text("PLAN DE SALUD:", 25, y); y += espacio;
      doc.setFont("helvetica", "normal");
      doc.text(`Frecuencia de Bano:`, 30, y); y += 6; // Menor espacio para el valor
      doc.text(frecBaño, 30, y); y += espacio;
      doc.text(`Proxima Visita al Vet:`, 30, y); y += 6;
      doc.text(proxVet, 30, y); y += seccionEspacio;

      // Sección 3: JUEGOS Y ESTÍMULO
      const juegosSugeridos = {
          perro: { baja: ["Busqueda de premios", "Juguetes Kong"], media: ["Buscar la pelota", "Nuevos trucos"], alta: ["Correr o trotar", "Agility"] },
          gato: { baja: ["Puntero laser", "Cajas de carton"], media: ["Canas de pescar", "Rascadores altos"], alta: ["Circuitos caseros", "Juguetes motorizados"] }
      };
      const sugerenciasPDF = juegosSugeridos[tipoMascotaJuego][nivelEnergia];
      doc.setFont("helvetica", "bold"); doc.text("JUEGOS Y ESTIMULO:", 25, y); y += espacio;
      doc.setFont("helvetica", "normal");
      doc.text(`Sugerencias: ${sugerenciasPDF.join(', ')}`, 30, y); y += seccionEspacio;
      
      // Sección 4: CALENDARIO DE VACUNACION
      doc.setFont("helvetica", "bold"); doc.text("CALENDARIO DE VACUNACION:", 25, y); y += espacio;
      doc.setFont("helvetica", "normal");
      doc.text(recomendacionVacuna, 30, y); y += seccionEspacio;

      // Sección 5: CHECKLIST ESENCIAL
      doc.setFont("helvetica", "bold"); doc.text("CHECKLIST ESENCIAL:", 25, y); y += espacio;
      doc.setFont("helvetica", "normal");
      doc.text(`- Collar y Placa: ${document.getElementById("check-collar").checked ? "[OK]" : "[PENDIENTE]"}`, 30, y); y += espacio;
      doc.text(`- Cama: ${document.getElementById("check-cama").checked ? "[OK]" : "[PENDIENTE]"}`, 30, y);

      // Pie de página
      doc.setFontSize(10); doc.setTextColor(100);
      doc.text("Este plan es una guia. Consulta siempre a un veterinario.", 105, 205, { align: "center" });

      doc.save(`plan_cuidado_${nombreMascota.replace(/\s/g, '_')}.pdf`);
    });
});
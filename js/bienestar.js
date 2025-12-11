document.addEventListener("DOMContentLoaded", () => {
  const edadesMascotas = [2, 5, 1, 7]; // Puedes modificar según tus mascotas

  window.evaluarMascota = function(i) {
    const peso = parseFloat(document.getElementById(`peso${i}`).value);
    const juego = parseFloat(document.getElementById(`juego0`).value);
    const resultado = document.getElementById(`resultado0`);

    if (isNaN(peso) || peso <= 0 || peso > 60 || isNaN(juego) || juego < 0 || juego > 24) {
      resultado.innerHTML = "<span style='color:red;'>❗ Datos no válidos.</span>";
      return;
    }

    const comida = peso * 30;
    const agua = peso * 40 + juego * 20;
    const sueno = Math.max(6, 10 - juego * 0.5);
    const estado = (peso >= 5 && peso <= 30 && juego >= 1 && juego <= 4) ? "😊 Bien" : "⚠️ Revisar cuidados";

    resultado.innerHTML = `
      🍽️ Comida: <strong>${comida.toFixed(0)}g</strong><br>
      💧 Agua: <strong>${agua.toFixed(0)}ml</strong><br>
      😴 Sueño: <strong>${sueno.toFixed(1)}h</strong><br>
      🩺 Estado: <strong>${estado}</strong>
    `;
  };

  window.mostrarEdades = function () {
    const tabla = document.getElementById("tablaEdades");
    const minMax = document.getElementById("minMaxEdades");

    let html = `<table style="width: 100%; border-collapse: collapse;">
                  <tr><th style="border: 1px solid #ccc; padding: 5px;">#</th>
                      <th style="border: 1px solid #ccc; padding: 5px;">Edad (años)</th></tr>`;
    edadesMascotas.forEach((edad, index) => {
      html += `<tr><td style="border: 1px solid #ccc; padding: 5px;">${index + 1}</td>
                   <td style="border: 1px solid #ccc; padding: 5px;">${edad}</td></tr>`;
    });
    html += `</table>`;
    tabla.innerHTML = html;

    const max = Math.max(...edadesMascotas);
    const min = Math.min(...edadesMascotas);

    minMax.innerHTML = `
      Edad mínima: <strong>${min} años</strong><br>
      Edad máxima: <strong>${max} años</strong>
    `;
  };

  window.calcularComida = function () {
    const peso = parseFloat(document.getElementById("pesoComida").value);
    const resultado = document.getElementById("resultado2");

    if (isNaN(peso) || peso <= 0 || peso > 60) {
      resultado.innerHTML = "<span style='color:red;'>❗ Ingrese un peso válido.</span>";
      return;
    }

    const comida = peso * 30;
    resultado.innerHTML = `Porción recomendada: <strong>${comida.toFixed(0)}g</strong>`;
  };

  window.calcularSueno = function () {
    const juego = parseFloat(document.getElementById("horasJuego").value);
    const resultado = document.getElementById("resultado3");

    if (isNaN(juego) || juego < 0 || juego > 24) {
      resultado.innerHTML = "<span style='color:red;'>❗ Ingrese horas válidas.</span>";
      return;
    }

    const sueno = Math.min(16, Math.max(6, 8 + juego * 0.6));
    resultado.innerHTML = `Dormirá aprox.: <strong>${sueno.toFixed(1)} horas</strong>`;
  };
});

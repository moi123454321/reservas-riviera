// 1. Arreglo con 10 experiencias (se agregaron 4 nuevas, incluyendo Gastronomía)
const experiencias = [
  { nombre: "Cenote Azul", categoria: "naturaleza", precio: 350, icono: "&#127754;" },
  { nombre: "Zona arqueológica", categoria: "cultura", precio: 480, icono: "&#128511;" },
  { nombre: "Ruta en tirolesa", categoria: "aventura", precio: 750, icono: "&#127796;" },
  { nombre: "Reserva de tortugas", categoria: "naturaleza", precio: 420, icono: "&#128034;" },
  { nombre: "Comunidad maya", categoria: "cultura", precio: 550, icono: "&#127963;" },
  { nombre: "Kayak en manglar", categoria: "aventura", precio: 680, icono: "&#128758;" },
  // 4 nuevas experiencias agregadas:
  { nombre: "Tours de Tacos y Antojitos", categoria: "gastronomia", precio: 390, icono: "&#127790;" },
  { nombre: "Cena Show Maya", categoria: "gastronomia", precio: 890, icono: "&#127869;" },
  { nombre: "Snorkel en Arrecife", categoria: "naturaleza", precio: 600, icono: "&#129416;" },
  { nombre: "Paseo en Cuatrimoto", categoria: "aventura", precio: 820, icono: "&#127949;" }
];

// Variables de estado
let categoriaSeleccionada = "todas";
let busquedaTexto = "";
let ordenado = false;

// Elementos del DOM
const catalogo = document.querySelector("#catalogo");
const contador = document.querySelector("#contador");
const botones = document.querySelectorAll("[data-categoria]");
const buscador = document.querySelector("#buscador");
const btnOrdenar = document.querySelector("#btn-ordenar");

// Función principal para renderizar
function actualizarInterfaz() {
  // 1. Filtrar por categoría
  let resultados = categoriaSeleccionada === "todas"
    ? experiencias
    : experiencias.filter(exp => exp.categoria === categoriaSeleccionada);

  // 2. Filtrar por texto en el buscador
  if (busquedaTexto.trim() !== "") {
    resultados = resultados.filter(exp =>
      exp.nombre.toLowerCase().includes(busquedaTexto.toLowerCase())
    );
  }

  // 3. Ordenar por precio de menor a mayor si está activado
  if (ordenado) {
    resultados = [...resultados].sort((a, b) => a.precio - b.precio);
  }

  // 4. Mostrar en el DOM
  if (resultados.length === 0) {
    catalogo.innerHTML = `<div class="sin-resultados">No se encontraron experiencias</div>`;
  } else {
    catalogo.innerHTML = resultados.map(experiencia => `
      <article class="tarjeta">
        <div class="imagen">${experiencia.icono}</div>
        <div class="informacion">
          <span class="etiqueta">${experiencia.categoria}</span>
          <h3>${experiencia.nombre}</h3>
          <p class="precio">$${experiencia.precio} MXN</p>
        </div>
      </article>
    `).join("");
  }

  // Actualizar el contador
  contador.textContent = `${resultados.length} experiencia${resultados.length !== 1 ? "s" : ""} encontrada${resultados.length !== 1 ? "s" : ""}`;
}

// Evento: Botones de filtro por categoría
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    botones.forEach(el => el.classList.remove("activo"));
    boton.classList.add("activo");
    categoriaSeleccionada = boton.dataset.categoria;
    actualizarInterfaz();
  });
});

// Evento: Buscador por nombre
buscador.addEventListener("input", (e) => {
  busquedaTexto = e.target.value;
  actualizarInterfaz();
});

// Evento: Ordenar por menor a mayor precio
btnOrdenar.addEventListener("click", () => {
  ordenado = !ordenado;
  btnOrdenar.classList.toggle("activo", ordenado);
  btnOrdenar.textContent = ordenado 
    ? "Ordenado: Menor a mayor precio ✓" 
    : "Ordenar: Menor a mayor precio";
  actualizarInterfaz();
});

// Carga inicial
actualizarInterfaz();
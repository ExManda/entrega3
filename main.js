

// Destinos
const destinos = [
    { id: 1, nombre: "Bali, Indonesia", precio: 1200, imagen: "images/bali.jpg" },
    { id: 2, nombre: "Puerto Escondido, Mexico", precio: 800, imagen: "images/puerto_escondido.jpg" },
    { id: 3, nombre: "Gold Coast, Australia", precio: 1500, imagen: "images/gold_coast.jpg" },
    { id: 4, nombre: "Jeffreys Bay, Sudáfrica", precio: 1000, imagen: "images/jeffreys_bay.jpg" },
    { id: 5, nombre: "Río de Janeiro, Brasil", precio: 600, imagen: "images/rio_de_janeiro.jpg" },
    { id: 6, nombre: "Half Moon Bay, EE.UU", precio: 1800, imagen: "images/maverick.jpg" }
];



function renderApp() {
    const app = document.getElementById("app");


    const destinosSection = document.createElement("section");
    destinosSection.id = "destinos";
    destinosSection.innerHTML = `
    <h2>Destinos Disponibles</h2>
    <div id="destinos-container"></div>
    `;

    // Formulario de contacto
    const formularioSection = document.createElement("section");
    formularioSection.id = "formulario";
    formularioSection.innerHTML = `
    <h2>Formulario de Contacto</h2>
    <form id="contactoForm">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" required placeholder="Ingrese su nombre completo">
        

        <label for="email">Email:</label>
        <input type="email" id="email" required placeholder="Ingrese su email">

        <label for="destino">Destino:</label>
        <select id="destino"></select>

        <button type="submit">Comprar Pasaje</button>
    </form>
    `;

    // Mensaje
    const mensajeSection = document.createElement("section");
    mensajeSection.id = "mensaje";

    // Añadir las secciones al DOM
    app.appendChild(destinosSection);
    app.appendChild(formularioSection);
    app.appendChild(mensajeSection);

    renderDestinos();
}




// Renderizar los destinos en el contenedor
function renderDestinos() {
    const destinosContainer = document.getElementById("destinos-container");
    const selectDestino = document.getElementById("destino");

    destinosContainer.innerHTML = destinos.map(({ nombre, precio, imagen }) => `
    <div class="card">
        <img src="${imagen}" alt="${nombre}" class="card-img">
        <div class="card-info">
        <h3>${nombre}</h3>
        <p>Precio: $${precio} USD</p>
        </div>
    </div>
    `).join("");

    selectDestino.innerHTML = destinos.map(({ id, nombre }) => `
    <option value="${id}">${nombre}</option>
    `).join("");
}



// localStorage


// Guardar los datos
function guardarEnLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Leer datos
function leerDeLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Evento de formulario
function agregarEventoFormulario() {
    const contactoForm = document.getElementById("contactoForm");
    const mensaje = document.getElementById("mensaje");

    contactoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const idDestino = parseInt(document.getElementById("destino").value);

        // Buscar destino seleccionado
        const destinoSeleccionado = destinos.find(({ id }) => id === idDestino);

        // Mensaje de confirmación
        destinoSeleccionado
            ? mensaje.innerHTML = `<p>¡Gracias ${nombre}! Tu pasaje a ${destinoSeleccionado.nombre} ha sido confirmado. A Surfear !!!.</p>`
            : mensaje.innerHTML = `<p>Ocurrió un error, por favor intenta nuevamente.</p>`;

        // Guardar datos en localStorage
        const cliente = { nombre, email, destino: destinoSeleccionado.nombre };
        const clientes = leerDeLocalStorage("clientes");
        guardarEnLocalStorage("clientes", [...clientes, cliente]);
    });
}





// Iniciar la aplicación
function init() {
    renderApp();
    agregarEventoFormulario();
}

init();

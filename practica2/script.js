// header, footer, ubi de pag, index y team, servicios, alta, guardar alta, borrar alta

document.addEventListener("DOMContentLoaded", function () {
  var cont = document.getElementById("contenido");

  // Header
  var header = document.createElement("header");

  header.innerHTML = `
    <h1>Sistema de Servicios - Ingeniero en Sistemas</h1>
    
    <nav>
      <a href="index.html">Inicio</a>
      <a href="servicios.html">Servicios</a>
      <a href="alta.html">Alta Servicio</a>
    </nav>
    `;

  document.body.prepend(header);

  // Footer
  var footer = document.createElement("footer");

  footer.innerHTML = `
    <p>2026 - ISC - Catalogo de Servicios</p>
    <a href="https://validator.w3.org/nu/#textarea" target="_blank">
    <img src="https://www.w3.org/Icons/valid-html401">
    </a>
    <a href="https://jigsaw.w3.org/css-validator/#validate-by-input" target="_blank">
    <img src="https://jigsaw.w3.org/css-validator/images/vcss">
    </a>
    `;

  document.body.appendChild(footer);

  // Pagina
  var pagina = window.location.pathname;

  // Index
  if (pagina.includes("index")) {
    let titulo = document.createElement("h2");
    titulo.textContent = "Curriculum del Equipo";

    cont.appendChild(titulo);

    var equipo = [
      {
        nombre: "Jorge Vizaith",
        area: "Desarrollo Web y Software",
        exp: "JavaScript, HTML, CSS, C#, MySQL",
        edu: "Ingeniería en Sistemas",
        extra: "Soporte, redes, mantenimiento",
      },

      {
        nombre: "Sianya Demuñy",
        area: "Bases de Datos",
        exp: "SQL y diseño BD",
        edu: "Ingeniería en Sistemas",
        extra: "Documentación y análisis",
      },
    ];

    for (let i = 0; i < equipo.length; i++) {
      let div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <h2>${equipo[i].nombre}</h2>
        <p><b>Área:</b> ${equipo[i].area}</p>
        <p><b>Experiencia:</b> ${equipo[i].exp}</p>
        <p><b>Educación:</b> ${equipo[i].edu}</p>
        <p><b>Habilidades:</b> ${equipo[i].extra}</p>
        `;

      cont.appendChild(div);
    }
  }

  // Servicios
  if (pagina.includes("servicios")) {
    let serviciosBase = [
      {
        nombre: "Desarrollo Web",
        desc: "Paginas profesionales",
        precio: 1500,
        img: "images/computadora.png",
      },
      {
        nombre: "Mantenimiento",
        desc: "Reparacion PC",
        precio: 500,
        img: "images/Mantenimiento.png",
      },
      {
        nombre: "Redes",
        desc: "Instalacion redes",
        precio: 2000,
        img: "images/Redes.png",
      },
      {
        nombre: "Base de Datos",
        desc: "Diseño BD",
        precio: 1200,
        img: "images/BD.png",
      },
      {
        nombre: "Soporte",
        desc: "Soporte tecnico",
        precio: 300,
        img: "images/Soporte.png",
      },
      {
        nombre: "App Movil",
        desc: "Android",
        precio: 2500,
        img: "images/AppMovil.png",
      },
      {
        nombre: "Seguridad",
        desc: "Ciberseguridad",
        precio: 1800,
        img: "images/Seguridad.png",
      },
      {
        nombre: "Servidor",
        desc: "Config servidor",
        precio: 2200,
        img: "images/Servidor.png",
      },
      {
        nombre: "Linux",
        desc: "Admin Linux",
        precio: 900,
        img: "images/Linux.png",
      },
      {
        nombre: "Consultoria",
        desc: "Asesoria",
        precio: 1100,
        img: "images/Consultoria.png",
      },
    ];

    let guardados = localStorage.getItem("servicios");

    if (guardados != null) {
      let extra = JSON.parse(guardados);

      serviciosBase = serviciosBase.concat(extra);
    }

    for (let i = 0; i < serviciosBase.length; i++) {
      let s = serviciosBase[i];

      let div = document.createElement("div");

      if (s.precio > 1000) {
        div.className = "servicio caro";
      } else {
        div.className = "servicio";
      }

      div.innerHTML = `
        <h2>${s.nombre}</h2>
        <p>${s.desc}</p>
        <p>Precio: $${s.precio}</p>
        <img src="${s.img}">
        `;

      cont.appendChild(div);
    }
  }

  // Alta
  if (pagina.includes("alta")) {
    let titulo = document.createElement("h2");
    titulo.textContent = "Alta de Servicio";

    cont.appendChild(titulo);

    let form = document.createElement("form");

    form.innerHTML = `

      <label>Nombre</label>
      <input type="text" id="nombre">

      <label>Descripcion</label>
      <input type="text" id="desc">

      <label>Precio</label>
      <input type="number" id="precio">

      <label>Imagen</label>
      <input type="file" id="img">

      <button type="button" id="guardar">Guardar</button>

      <hr>

      <h3>Borrar servicio por nombre</h3>

      <input type="text" id="borrarNombre">

      <button type="button" id="borrar">Borrar</button>

      <p id="mensajeError"></p>

      `;

    cont.appendChild(form);

    // Guardar
    document.getElementById("guardar").addEventListener("click", function () {
      let nombre = document.getElementById("nombre").value.trim();
      let desc = document.getElementById("desc").value.trim();
      let precio = document.getElementById("precio").value;
      let fileInput = document.getElementById("img");
      let file = fileInput.files[0];

      let error = document.getElementById("mensajeError");
      error.textContent = "";

      if (nombre == "" || desc == "" || precio == "" || !file) {
        error.textContent = "Complete todos los campos";
        return;
      }

      if (precio <= 0) {
        error.textContent = "Precio debe ser mayor a 0";
        return;
      }
      let serviciosBase = [
        { nombre: "Desarrollo Web" },
        { nombre: "Mantenimiento" },
        { nombre: "Redes" },
        { nombre: "Base de Datos" },
        { nombre: "Soporte" },
        { nombre: "App Movil" },
        { nombre: "Seguridad" },
        { nombre: "Servidor" },
        { nombre: "Linux" },
        { nombre: "Consultoria" },
      ];

      let reader = new FileReader();
      reader.onload = function (e) {
        let lista = JSON.parse(localStorage.getItem("servicios")) || [];
        let listaCompleta = serviciosBase.concat(lista);

        let exist = listaCompleta.some(
          (servicio) => servicio.nombre.toLowerCase() === nombre.toLowerCase(),
        );
        if (exist) {
          error.textContent = "Ya existe un servicio con ese nombre";
          return;
        }

        let nuevo = {
          nombre: nombre,
          desc: desc,
          precio: parseFloat(precio),
          img: e.target.result,
        };

        lista.push(nuevo);
        localStorage.setItem("servicios", JSON.stringify(lista));

        window.location.href = "servicios.html";
      };
      reader.readAsDataURL(file);
    });

    // Borrar
    document.getElementById("borrar").addEventListener("click", function () {
      let nombreBorrar = document.getElementById("borrarNombre").value.trim();

      let error = document.getElementById("mensajeError");

      error.textContent = "";

      if (nombreBorrar == "") {
        error.textContent = "Escribe el nombre";
        return;
      }

      let lista = JSON.parse(localStorage.getItem("servicios")) || [];

      let nueva = [];

      let encontrado = false;

      for (let i = 0; i < lista.length; i++) {
        if (lista[i].nombre == nombreBorrar) {
          encontrado = true;
        } else {
          nueva.push(lista[i]);
        }
      }

      // Si no existe
      if (!encontrado) {
        error.textContent = "No existe ese servicio";
        return;
      }

      // Guardar
      localStorage.setItem("servicios", JSON.stringify(nueva));

      error.textContent = "Servicio eliminado";
    });
  }
});

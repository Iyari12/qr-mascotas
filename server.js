const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

// Datos simulados de mascotas
const mascotas = {
  "123": {
    nombre: "Luna",
    tipo: "Perro",
    raza: "Labrador",
    edad: "2 años",
    ciudad: "Lambayeque",
    direccion: "Av. Las Flores 456",
    telefono: "987654321",
    contactoTexto: "912 345 678 (Dueño)"
  }
};

// Ruta principal 
app.get("/", (req, res) => {
  res.send(`
    <h1>🐾 Sistema de Mascotas</h1>
    <p>Opciones:</p>
    <ul>
      <li><a href="/qr/123">Ver QR de mascota</a></li>
      <li><a href="/mascota/123">Ver ficha</a></li>
    </ul>
  `);
});

// Ruta para generar QR
app.get("/qr/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://qr-mascotas.onrender.com/mascota/${id}`;

  try {
    const qr = await QRCode.toDataURL(url);
    res.send(`
      <h2>QR de la mascota 🐾</h2>
      <img src="${qr}" />
      <p><a href="/">Volver</a></p>
    `);
  } catch (err) {
    res.send("Error generando QR");
  }
});

// Ruta de la ficha de mascota
app.get("/mascota/:id", (req, res) => {
  const mascota = mascotas[req.params.id];

  if (!mascota) return res.send("Mascota no encontrada");

  res.send(`
    <html>
    <head>
      <title>Ficha de Mascota</title>
      <style>
        body {
          font-family: Arial;
          background: #f2f2f2;
        }
        .card {
          width: 350px;
          margin: 40px auto;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .header {
          background: #ff6b6b;
          color: white;
          text-align: center;
          padding: 20px;
        }
        .header img {
          width: 100px;
          border-radius: 50%;
          border: 4px solid white;
        }
        .content {
          padding: 20px;
        }
        .item {
          margin-bottom: 10px;
        }
        .btn {
          display: block;
          text-align: center;
          background: green;
          color: white;
          padding: 12px;
          border-radius: 10px;
          text-decoration: none;
        }
      </style>
    </head>
    <body>

      <div class="card">
        <div class="header">
          <img src="https://placedog.net/200/200" />
          <h2>Ficha de Mascota</h2>
        </div>

        <div class="content">
          <div class="item"><b>Nombre:</b> ${mascota.nombre}</div>
          <div class="item"><b>Tipo:</b> ${mascota.tipo}</div>
          <div class="item"><b>Raza:</b> ${mascota.raza}</div>
          <div class="item"><b>Edad:</b> ${mascota.edad}</div>
          <div class="item"><b>Ciudad:</b> ${mascota.ciudad}</div>
          <div class="item"><b>Dirección:</b> ${mascota.direccion}</div>
          <div class="item"><b>Contacto:</b> ${mascota.contactoTexto}</div>

          <a class="btn" href="tel:${mascota.telefono}">
             Llamar al dueño
          </a>
        </div>
      </div>

    </body>
    </html>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo `);
});
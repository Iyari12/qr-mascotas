const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = "https://qr-mascotas-1.onrender.com";

// Datos simulados de mascotas
const mascotas = {
  "123": {
    nombre: "Mathias",
    tipo: "Perro",
    raza: "BullDog Americano",
    edad: "2 años",
    ciudad: "Lambayeque",
    direccion: "Av. Las Flores 456",
    telefono: "912 345 678",
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
  const url = `${BASE_URL}/mascota/${id}`;

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

// Ruta ficha RESPONSIVA
app.get("/mascota/:id", (req, res) => {
  const mascota = mascotas[req.params.id];

  if (!mascota) return res.send("Mascota no encontrada");

  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ficha de Mascota</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f2f2f2;
      margin: 0;
      padding: 0;
    }

    .card {
      width: 90%;
      max-width: 400px;
      margin: 20px auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .header {
      background: #ff6b6b;
      color: white;
      text-align: center;
      padding: 25px 15px;
    }

    .header img {
      width: 90px;
      height: 90px;
      object-fit: cover;
      border-radius: 50%;
      border: 4px solid white;
      margin-bottom: 10px;
    }

    .content {
      padding: 20px;
    }

    .item {
      margin-bottom: 12px;
      font-size: 15px;
    }

    .btn {
      display: block;
      text-align: center;
      background: #25D366;
      color: white;
      padding: 14px;
      border-radius: 12px;
      text-decoration: none;
      font-size: 16px;
      margin-top: 15px;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .header h2 {
        font-size: 18px;
      }
      .item {
        font-size: 14px;
      }
      .btn {
        font-size: 15px;
        padding: 12px;
      }
    }
  </style>
</head>

<body>

  <div class="card">
    <div class="header">
      <img src="https://www.zooplus.es/magazine/wp-content/uploads/2017/10/fotolia_58776564-768x491.webp" />
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

// Servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor corriendo");
});

/**
 * ==============================================================================
 * STANDALONE BAILEYS WHATSAPP BACKEND SERVER - DINAS PUPR KABUPATEN GARUT
 * ==============================================================================
 *
 * Struktur Modular:
 * - /server/config/baileys.js         (Pengaturan Port & Path Sesi)
 * - /server/services/waSocket.js      (Siklus Hidup Engine Baileys WASocket)
 * - /server/controllers/baileysController.js (Penanganan Logika API)
 * - /server/routes/baileysRoutes.js   (Definisi Endpoint REST API)
 */

const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/baileys');
const baileysRoutes = require('./routes/baileysRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Registrasi Route API Backend
app.use('/api', baileysRoutes);

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`   PUPR GARUT BAILEYS STANDALONE SERVER READY ON :${PORT}  `);
  console.log(`=======================================================`);
});

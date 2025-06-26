
// routes/upload_routes.js

const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid'); // Para generar un nombre único para las imágenes

const router = express.Router();
const upload = multer(); 

// Ruta para subir imágenes
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      public_id: uuidv4(), // Usamos un ID único para la imagen
      resource_type: 'auto', // Deja que Cloudinary determine el tipo de archivo (image, video, etc.)
    });

   
    res.status(200).json({
      message: 'Imagen subida correctamente',
      imageUrl: result.secure_url, // URL de la imagen en Cloudinary
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir la imagen', error });
  }
});

module.exports = router;
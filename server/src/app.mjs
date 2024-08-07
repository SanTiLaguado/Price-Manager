import express from 'express';
import cors from 'cors';
import multer from 'multer'; // Para manejo de archivos
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser'; // Para procesar archivos CSV
import { listarProductos } from './service/productService.mjs';
import { listarProveedores, crearProveedor } from './service/providerService.mjs';
import pool from './dataBaseConfig.mjs'; // Importa la configuración de la base de datos

const app = express();

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use(cors());
app.use(express.json());

// Configuración de multer para la carga de archivos
const upload = multer({ dest: 'uploads/' });

//LISTAR PRODUCTOS
app.get('/api/products', async (req, res) => {
    try {
        const products = await listarProductos();
        res.json(products);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' });
    }
});

//LISTAR PROVEEDORES
app.get('/api/providers', async (req, res) => {
    try {
        const providers = await listarProveedores();
        res.json(providers);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' });
    }
});

// CREAR PROVEEDOR
app.post('/api/createProvider', async (req, res) => {
    const { id, nombre, formula_id } = req.body;
  
    try {
        const result = await crearProveedor(id, nombre, formula_id);
        res.status(201).json({ message: 'Proveedor creado exitosamente', result });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' });
    }
});


//SUBIR ARCHIVO
app.post('/api/upload', upload.single('file'), async (req, res) => {
    const filePath = path.join('uploads', req.file.filename);
    const providerId = req.body.provider_id;
  
    try {
        fs.createReadStream(filePath)
            .pipe(csv({ delimiter: ";" }))
            .on('data', async (row) => {
                const { nombre, descripcion, precio_neto } = row;
                
                const query = `
                    INSERT INTO producto (nombre, descripcion, precio_neto, proveedor_id)
                    VALUES (?, ?, ?, ?)
                `;
                await pool.execute(query, [nombre, descripcion, precio_neto, providerId]);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                res.send('File uploaded and data inserted');
            });
    } catch (error) {
        res.status(500).json({ message: 'Error processing file', error: error.message });
    }
});


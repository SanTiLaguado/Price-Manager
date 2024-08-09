import express from 'express';
import cors from 'cors';
import { listarProductos } from './service/productService.mjs';
import { listarProveedores, crearProveedor } from './service/providerService.mjs';
import { subirProductos } from './service/listService.mjs';

const app = express();

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use(cors());
app.use(express.json());

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
app.post('/api/upload', async (req, res) => {
    const { proveedor_id, csvData } = req.body;
    
    try {
        for (const row of csvData) {
            const { marca, nombre, descripcion, precio_neto } = row;
            await subirProductos(proveedor_id, marca, nombre, descripcion, precio_neto, );
        } 
        res.status(200).json({ message: 'Datos procesados e insertados exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos', error: error.message });
    }
});


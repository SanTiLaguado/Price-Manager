import pool from '../dataBaseConfig.mjs';

export const subirProductos = async (proveedor_id, marca, nombre, descripcion, precio_neto, ) => {

    try {
      const query = 'INSERT INTO producto (proveedor_id, marca, nombre, descripcion, precio_neto) VALUES (?, ?, ?, ?, ?)';
      const [result] = await pool.execute(query, [proveedor_id, marca, nombre, descripcion, precio_neto]);
      return result;
    } catch (error) {
      console.error('Error en la función subirProductos:', error);
      throw new Error('Error al subir productos');
    }
};
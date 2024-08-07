import pool from '../dataBaseConfig.mjs';

// Función para listar proveedores
export const listarProveedores = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM proveedor");
        return rows;
    } catch (error) {
        throw { status: 500, message: "Error al obtener proveedores" };
    }
};

// Función para crear un nuevo proveedor
export const crearProveedor = async (id, nombre, formula_id) => {

    try {
      const query = 'INSERT INTO proveedor (id, nombre, formula_id) VALUES (?, ?, ?)';
      const [result] = await pool.execute(query, [id, nombre, formula_id]);
      return result;
    } catch (error) {
      console.error('Error en la función crearProveedor:', error);
      throw new Error('Error al crear proveedor');
    }
  };
  

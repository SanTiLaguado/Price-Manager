import pool from '../dataBaseConfig.mjs';

export const listarProductos = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM producto");
        return rows;
    } catch (error) {
        throw { status: 500, message: "Error al obtener productos" };
    }
};

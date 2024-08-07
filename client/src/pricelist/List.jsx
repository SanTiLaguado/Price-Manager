import React, { useState } from 'react';
import SelectComp from '../components/SelectComp';
import InputComp from '../components/InputComp';
import SearchButtonComp from '../components/SearchButtonComp';

const List = () => {
    // Datos de ejemplo
    const products = [
        {
            id: 1,
            proveedor: 'Proveedor A',
            nombre: 'Producto 1',
            descripcion: 'Descripción del Producto 1',
            precio_costo: '$10.00',
            precio_venta: '$15.00',
        },
        {
            id: 2,
            proveedor: 'Proveedor B',
            nombre: 'Producto 2',
            descripcion: 'Descripción del Producto 2',
            precio_costo: '$20.00',
            precio_venta: '$25.00',
        },
        {
            id: 3,
            proveedor: 'Proveedor C',
            nombre: 'Producto 3',
            descripcion: 'Descripción del Producto 3',
            precio_costo: '$30.00',
            precio_venta: '$35.00',
        },
        {
            id: 4,
            proveedor: 'Proveedor D',
            nombre: 'Producto 4',
            descripcion: 'Descripción del Producto 4',
            precio_costo: '$40.00',
            precio_venta: '$45.00',
        },
        {
            id: 5,
            proveedor: 'Proveedor E',
            nombre: 'Producto 5',
            descripcion: 'Descripción del Producto 5',
            precio_costo: '$50.00',
            precio_venta: '$55.00',
        },
    ];

    return (
        <section className="main" id="List">
            <div id="filters">
                <div className="filter">
                    <label htmlFor="search">Buscar Productos</label>
                    <div className="select-container">
                        <InputComp id="search" />
                    </div>
                </div>
                <div className="filter">
                    <label htmlFor="provider">Proveedor</label>
                    <div className="select-container">
                    <SelectComp placeholder="Filtrar por proveedores..." />
                        <SearchButtonComp />
                    </div>
                </div>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Proveedor</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Precio Costo</th>
                            <th>Precio Venta</th>
                        </tr>
                    </thead>
                    <tbody id="data_value">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.proveedor}</td>
                                <td>{product.nombre}</td>
                                <td>{product.descripcion}</td>
                                <td>{product.precio_costo}</td>
                                <td>{product.precio_venta}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default List;

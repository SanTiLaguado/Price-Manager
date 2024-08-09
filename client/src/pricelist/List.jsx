import React, { useState, useEffect } from 'react';
import SelectComp from '../components/SelectComp';
import InputComp from '../components/InputComp';
import SearchButtonComp from '../components/SearchButtonComp';
import { getProducts } from '../api'; //

const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleProviderChange = (value) => {
    setSelectedProvider(value); // Actualiza el estado del proveedor seleccionado


    //lógica adicional para filtrar productos por proveedor, si es necesario
  };

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
            <SelectComp
              placeholder="Filtrar por proveedores..."
              onChange={handleProviderChange}
            />
            <SearchButtonComp />
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Marca</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio Costo</th>
              <th>Precio Venta</th>
            </tr>
          </thead>
          <tbody id="data_value">
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.proveedor_id}</td>
                <td>{product.marca}</td>
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>{product.precio_neto}</td>
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

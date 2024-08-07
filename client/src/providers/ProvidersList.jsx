import React, { useEffect, useState } from 'react';
import { getProviders } from '../api'; // Importa la función getProviders

const ProvidersList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener los productos y actualizar el estado
    const fetchProviders = async () => {
      try {
        const providers = await getProviders();
        setProviders(providers);
      } catch (err) {
        setError('Error fetching providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>NIT/CC</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody id="data_value">
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.id}</td>
                <td>{provider.nombre}</td>
                <td><i className="fa fa-times delete-icon" data-id="${provider.id}"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default ProvidersList;

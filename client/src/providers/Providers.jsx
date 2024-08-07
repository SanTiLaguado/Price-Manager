import React from 'react';
import ProvidersList from './ProvidersList'
import CreateProvider from './CreateProvider'

const Providers = () => {
  return (
    
    <section className="main" id="Providers">
      <div className='ListWrapper'>
        <h1>Lista de Proveedores</h1>
        <ProvidersList  />
      </div>
      <div className='FromWrapper'>
        <h1>Crear Proveedores</h1>
        <CreateProvider  />
      </div>
    </section>
    
  );
};

export default Providers;


import React, { useState } from 'react';
import SelectComp from '../components/SelectComp';
import UploadComp from '../components/UploadComp';

const UploadList = () => {
  const [selectedProvider, setSelectedProvider] = useState('');

  const handleProviderChange = (value) => {
    setSelectedProvider(value);
  };

  return (
    <section className="main" id="UploadList">
      <div className='content'>
        <div className='wrapper'>
          <label className="selectprovider">Selecciona un Proveedor:</label>
          <SelectComp 
            placeholder="Seleccione un proveedor..." 
            onChange={handleProviderChange} 
          />
        </div>
        <UploadComp selectedProvider={selectedProvider} />
      </div>
    </section>
  );
};

export default UploadList;

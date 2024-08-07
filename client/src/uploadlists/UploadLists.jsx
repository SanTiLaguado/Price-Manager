import React from 'react';
import SelectComp from '../components/SelectComp';
import UploadComp from '../components/UploadComp';

const UploadList = () => {
  return (
    
    <section className="main" id="UploadList">

      <div className='up'>
        <div className='wrapper'>
          <label className="selectprovider">Selecciona un Proveedor:</label>
          <SelectComp placeholder="Seleccione un proveedor..." />
        </div>
        <UploadComp />
      </div>
      
    </section>
    
  );
};

export default UploadList;
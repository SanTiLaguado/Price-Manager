import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Table } from 'antd';
import Papa from 'papaparse';
import axios from 'axios';

const { Dragger } = Upload;

const UploadComp = ({ selectedProvider }) => {
  const [csvData, setCsvData] = useState([]);

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv',
    beforeUpload: (file) => {
      const isLt500M = file.size < 500000000;
      const isCsv = file.type === 'text/csv';
      if (!isLt500M) {
        message.error('File size more than 500MB');
        return Upload.LIST_IGNORE;
      }
      if (!isCsv) {
        message.error('You can only upload CSV files');
        return Upload.LIST_IGNORE;
      }
      return isLt500M && isCsv;
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      if (!selectedProvider) {
        message.error('Please select a provider.');
        onError('Provider not selected');
        return;
      }

      Papa.parse(file, {
        header: true,
        delimiter: ";",
        complete: async (results) => {
          setCsvData(results.data); // Guardar los datos CSV en el estado
          try {
            const response = await axios.post('/api/upload', {
              provider_id: selectedProvider,
              csvData: results.data,
            });
            message.success('File uploaded successfully');
            onSuccess("ok");
          } catch (error) {
            message.error('Error uploading file');
            onError(error);
          }
        },
        error: (error) => {
          message.error('Error parsing CSV file');
          onError(error);
        }
      });
    }
  };

  const columns = [
    { title: 'Marca', dataIndex: 'marca', key: 'marca' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Descripcion', dataIndex: 'descripcion', key: 'descripcion' },
    { title: 'Precio Neto', dataIndex: 'precio_neto', key: 'precio_neto' }
  ];

  return (
    <div>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haga clic o arrastre el archivo CSV a esta área para cargarlo</p>
        <p className="ant-upload-hint">
          Solo se permiten archivos CSV con el siguiente patrón.
        </p>
      </Dragger>
      <Table 
        dataSource={csvData} 
        columns={columns} 
        rowKey={(index) => index} // Usar el índice del array como clave
      />
    </div>
  );
};

export default UploadComp;

import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Table } from 'antd';
import Papa from 'papaparse';
import axios from 'axios';

const { Dragger } = Upload;

const UploadComp = ({ selectedProvider }) => {
  console.log("selected provider:", selectedProvider)
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

      const formData = new FormData();
      formData.append('file', file);
      formData.append('provider_id', selectedProvider);

      try {
        await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('File uploaded successfully');
        onSuccess("ok");
      } catch (error) {
        message.error('Error uploading file');
        onError(error);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedProvider) {
      message.error('Please select a provider.');
      return;
    }

    if (!csvData.length) {
      message.error('Please upload a CSV file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('provider_id', selectedProvider);
      formData.append('file', new Blob([Papa.unparse(csvData)], { type: 'text/csv' }));

      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('File uploaded and data inserted');
    } catch (error) {
      message.error('Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  const columns = [
    { title: 'Familia', dataIndex: 'FAMILIA', key: 'familia' },
    { title: 'Marca', dataIndex: 'MARCA', key: 'marca' },
    { title: 'Nombre', dataIndex: 'NOMBRE', key: 'nombre' },
    { title: 'Descripcion', dataIndex: 'DESCRIPCION', key: 'descripcion' },
    { title: 'Precio Costo', dataIndex: 'PRECIO_COSTO', key: 'precio_costo' }
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
      <Table dataSource={csvData} columns={columns} rowKey="id" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadComp;

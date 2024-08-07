import React from 'react';
import { Input, Space } from 'antd';
import '../styles/comps.css';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const InputCom = () => (
  <Space direction="vertical">
    <Search
      placeholder="Buscar Productos..."
      allowClear
      onSearch={onSearch}
      className="custom-search-input"
      style={{ width: 500 }}
    />
  </Space>
);

export default InputCom;

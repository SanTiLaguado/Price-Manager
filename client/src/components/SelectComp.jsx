import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types'; // Para validación de tipos de props
import '../styles/comps.css';

const { Option } = Select;

const SelectComp = ({ placeholder }) => (
  <Select
    showSearch
    placeholder={placeholder}
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().includes(input.toLowerCase())
    }
    className="custom-select"
    style={{ width: 300 }}
  >
    <Option value="1">Jack</Option>
    <Option value="2">Lucy</Option>
    <Option value="3">Tom</Option>
  </Select>
);

// Establece el valor predeterminado para el placeholder si no se pasa uno
SelectComp.defaultProps = {
  placeholder: 'Filtrar por Proveedor',
};

// Valida el tipo de props
SelectComp.propTypes = {
  placeholder: PropTypes.string,
};

export default SelectComp;

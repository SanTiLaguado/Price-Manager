import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types'; // Para validación de tipos de props
import '../styles/comps.css';
import { getProviders } from '../api'; // Asegúrate de que esta función existe

const { Option } = Select;

const SelectComp = ({ placeholder, onChange }) => {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providerOptions = await getProviders(); // Ajusta según tu implementación
        setOptions(providerOptions);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange} // Asegúrate de pasar el valor seleccionado al padre
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
      className="custom-select"
      style={{ width: 300 }}
    >
      {options.map(option => (
        <Option key={option.id} value={option.nombre}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};

SelectComp.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired, // `onChange` es requerido
};

export default SelectComp;

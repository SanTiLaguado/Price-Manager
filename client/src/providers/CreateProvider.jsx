import React from 'react';
import { Button, Form, Input, Select,  } from 'antd';
import { createProvider } from '../api'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const MyFormItemContext = React.createContext([]);

function toArr(str) {
  return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

const CreateProvider = () => {
  const [form] = Form.useForm();

  // Función para manejar el envío del formulario
  const onFinish = async (values) => {
    console.log('Valores recibidos:', values);
    try {
      await createProvider(values.id, values.name, values.selection);
      message.success('Proveedor creado exitosamente');
      form.resetFields(); // Opcional: para limpiar el formulario después de enviar
    } catch (error) {
      // Mostrar detalles del error en el mensaje
      message.error(`Error al crear proveedor: ${error.message}`);
    }
  };
  

  return (
    <Form
      form={form}
      name="form_item_path"
      layout="vertical"
      onFinish={onFinish}
    >
        <MyFormItem name="id" label="Ingresa el NIT/CC:">
            <Input />
        </MyFormItem>
          <MyFormItem name="name" label="Ingresa el Nombre de la empresa:">
            <Input />
          </MyFormItem>

        <MyFormItem name="selection" label="Selecciona una formula:">
          <Select placeholder="Selecciona una Formula">
            <Select.Option value="1">Costo * 1.21 / 0.90</Select.Option>
            <Select.Option value="2">Costo * 1.21 / 0.90</Select.Option>
          </Select>
        </MyFormItem>

      <Button type="primary" htmlType="submit">
        Crear Proveedor
      </Button>
    </Form>
  );
};

export default CreateProvider;

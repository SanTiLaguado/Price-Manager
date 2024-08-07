import React from 'react';
import { Calendar, ConfigProvider } from 'antd';
import esES from 'antd/es/locale/es_ES'; // Importa el idioma deseado
import '../styles/comps.css';

const CalendarComp = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <ConfigProvider locale={esES}>
      <Calendar className="custom-calendar" onPanelChange={onPanelChange} />
    </ConfigProvider>
  );
};

export default CalendarComp;

import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const SearchButtonComp = () => {
  return (
    <Tooltip title="Filtrar">
      <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
    </Tooltip>
  );
};

export default SearchButtonComp;

import React from 'react';
import { Checkbox } from '@chakra-ui/react';

const CheckBoxInput = (props: any) => {
  const { name, value, lebel, checked, handleInputChange } = props;

  return (
    <div>
      <Checkbox
        colorScheme="green"
        value={value}
        defaultIsChecked={checked}
        onChange={handleInputChange}
        name={name}
      >
        {lebel}
      </Checkbox>
    </div>
  );
};

export default CheckBoxInput;

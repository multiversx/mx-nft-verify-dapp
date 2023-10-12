import React, { ChangeEvent } from 'react';
import { RadioElementType, VerificationType } from '../build.types';

interface BuildFormRadioGroupProps {
  elements: RadioElementType[];
  title: string;
  setVerificationType: (verificationType: VerificationType) => void;
}

export const BuildFormRadioGroup = ({
  elements,
  title,
  setVerificationType
}: BuildFormRadioGroupProps) => {
  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVerificationType(event.target.value as VerificationType);
  };

  return (
    <div className='radio-group'>
      <p>{title}</p>
      {elements.map(({ id, value, label, checked }) => (
        <div className='radio-field' key={id}>
          <input
            type='radio'
            id={id}
            name={elements[0].id}
            value={value}
            defaultChecked={checked}
            onChange={onRadioChange}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
    </div>
  );
};

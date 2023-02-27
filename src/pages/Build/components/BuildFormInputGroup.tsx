import React, { FC } from 'react';

interface BuildFormInputGroupProps {
  id: string;
  placeholder: string;
  labelValue: string;
  value: string;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  isError: boolean;
  error?: string;
  className?: string;
}

export const BuildFormInputGroup: FC<BuildFormInputGroupProps> = ({
  id,
  placeholder,
  labelValue,
  value,
  onChange,
  onBlur,
  isError,
  error,
  className
}) => {
  return (
    <div className={`form-group position-relative ${className}`}>
      <label htmlFor={id}>{labelValue}</label>
      <input
        className={`form-control ${isError && 'input-error'}`}
        type='text'
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isError && <span className='error'>{error}</span>}
    </div>
  );
};

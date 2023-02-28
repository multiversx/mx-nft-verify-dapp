import React from 'react';
import classNames from 'classnames';

interface BuildFormInputGroupProps {
  id: string;
  placeholder: string;
  labelValue: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  error?: string;
  className?: string;
}

export const BuildFormInputGroup = ({
  id,
  placeholder,
  labelValue,
  value,
  onChange,
  onBlur,
  isError,
  error,
  className
}: BuildFormInputGroupProps) => {
  return (
    <div
      className={classNames('form-group position-relative', {
        [className ? className : '']: className
      })}
      // className={`form-group position-relative ${className}`}
    >
      <label htmlFor={id}>{labelValue}</label>
      <input
        className={classNames('form-control', { 'input-error': isError })}
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

import React from 'react';
import classNames from 'classnames';
import { Bubble } from 'components';

interface BuildFormInputGroupProps {
  id: string;
  placeholder?: string;
  labelValue: string;
  tooltipInfo?: string;
  isOptional?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  error?: string;
  className?: string;
}

export const BuildFormInputGroup = ({
  id,
  placeholder,
  labelValue,
  value,
  tooltipInfo,
  isOptional = false,
  onChange,
  onBlur,
  isError,
  error,
  className
}: BuildFormInputGroupProps) => {
  return (
    <div
      className={`form-group position-relative ${className ? className : ''}`}
    >
      <label htmlFor={id}>
        {labelValue}{' '}
        {isOptional && <span className='text-secondary ml-1'>(optional)</span>}
        {tooltipInfo && (
          <Bubble identifier={id} className='ml-2'>
            {tooltipInfo}
          </Bubble>
        )}
      </label>
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

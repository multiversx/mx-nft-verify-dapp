import React from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

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
    <div className={`form-group ${className ? className : ''}`}>
      <label htmlFor={id}>
        {labelValue} {isOptional && <span>(optional)</span>}
        {tooltipInfo && (
          <div className='info-icon'>
            <FontAwesomeIcon icon={faInfoCircle} />
            <span className='info-tooltip'>{tooltipInfo}</span>
          </div>
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

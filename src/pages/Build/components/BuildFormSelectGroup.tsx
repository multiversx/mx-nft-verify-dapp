import React from 'react';

interface SelectOptionType {
  value: string;
  label: string;
  selected?: boolean;
}

interface BuildFormSelectGroupProps {
  id: string;
  labelValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOptionType[];
  className?: string;
}

export const BuildFormSelectGroup = ({
  id,
  labelValue,
  onChange,
  options,
  className
}: BuildFormSelectGroupProps) => {
  return (
    <div className={`form-group ${className ? className : ''}`}>
      <label htmlFor={id}>{labelValue}</label>
      <select className='form-control' id={id} onChange={onChange}>
        {options.map((option: SelectOptionType, idx: number) => (
          <option key={idx} selected={option.selected} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

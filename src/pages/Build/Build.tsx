import React from 'react';

import { BuildPosFormCard } from './components';
import { validationSchema } from './validation';

const ageSelectOptions = [
  {
    value: '3600',
    label: '1 hour'
  },
  {
    value: '86400',
    label: '1 day',
    selected: true
  },
  {
    value: '604800',
    label: '1 week'
  },
  {
    value: '2628288',
    label: '1 month'
  },
  {
    value: '31556952',
    label: '1 year'
  }
];

export const Build = () => {
  return (
    <section className='build'>
      <BuildPosFormCard
        validationSchema={validationSchema}
        ageSelectOptions={ageSelectOptions}
      />
    </section>
  );
};

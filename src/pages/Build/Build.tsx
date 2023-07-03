import React, { useState } from 'react';

import { BuildPosFormCard, BuildScannerFormCard } from './components';
import { BuildTabs } from './components/BuildTabs';
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
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className='build'>
      <BuildTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 ? (
        <BuildPosFormCard
          validationSchema={validationSchema}
          ageSelectOptions={ageSelectOptions}
        />
      ) : (
        <BuildScannerFormCard
          validationSchema={validationSchema}
          ageSelectOptions={ageSelectOptions}
        />
      )}
    </section>
  );
};

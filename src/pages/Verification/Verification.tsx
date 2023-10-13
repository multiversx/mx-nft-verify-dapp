import React, { useEffect, useState } from 'react';

import { Loader } from '@multiversx/sdk-dapp/UI/Loader';
import { VerificationTypeEnum } from 'pages/Build/build.types';
import { VerificationTypeTabs } from 'pages/Build/components/VerificationTypeTabs';
import { QueryParamEnum } from 'pages/Result/result.types';
import { Pos, Scanner } from './components';

export const Verification = () => {
  const [activeTab, setActiveTab] = useState<VerificationTypeEnum | null>(null);
  const [showTabs, setShowTabs] = useState(false);

  const getVerificationTypeFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.href);

    const verificationTypeParam = urlParams.get(QueryParamEnum.type);
    const switcherParam = urlParams.get(QueryParamEnum.switcher);

    if (switcherParam) {
      setShowTabs(true);
    }

    setActiveTab(verificationTypeParam as VerificationTypeEnum);
  };

  useEffect(getVerificationTypeFromUrl, []);

  if (activeTab === null) {
    return <Loader noText />;
  }

  return (
    <div className='verification'>
      {showTabs && (
        <VerificationTypeTabs
          verificationTypeTab={activeTab}
          setVerificationTypeTab={setActiveTab}
        />
      )}

      {activeTab === VerificationTypeEnum.pos ? <Pos /> : <Scanner />}
    </div>
  );
};

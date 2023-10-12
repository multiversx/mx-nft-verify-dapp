import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { VerificationTypeEnum } from '../build.types';

interface VerificationTypeTabsProps {
  verificationTypeTab: VerificationTypeEnum;
  setVerificationTypeTab: (verificationTab: VerificationTypeEnum) => void;
}

export const VerificationTypeTabs = ({
  verificationTypeTab,
  setVerificationTypeTab
}: VerificationTypeTabsProps) => {
  const [, setSearchParams] = useSearchParams();

  const onTabClick = (value: VerificationTypeEnum) => {
    const url = new URL(window.location.href);

    const paramsObject = Object.fromEntries(url.searchParams.entries());

    setVerificationTypeTab(value);
    setSearchParams({ ...paramsObject, type: value });
  };

  return (
    <div className='build-tabs'>
      <button
        className={classNames('build-tab', {
          'build-tab-active': verificationTypeTab === VerificationTypeEnum.pos
        })}
        onClick={() => onTabClick(VerificationTypeEnum.pos)}
      >
        PoS
      </button>
      <button
        className={classNames('build-tab', {
          'build-tab-active':
            verificationTypeTab === VerificationTypeEnum.scanner
        })}
        onClick={() => onTabClick(VerificationTypeEnum.scanner)}
      >
        Scanner
      </button>
    </div>
  );
};

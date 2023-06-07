import React from 'react';
import classNames from 'classnames';

interface BuildTabsProps {
  activeTab: number;
  setActiveTab: (activeTab: number) => void;
}

export const BuildTabs = ({ activeTab, setActiveTab }: BuildTabsProps) => {
  return (
    <div className='build-tabs'>
      <button
        className={classNames('build-tab', {
          'build-tab-active': activeTab === 0
        })}
        onClick={() => setActiveTab(0)}
      >
        PoS
      </button>
      <button
        className={classNames('build-tab', {
          'build-tab-active': activeTab === 1
        })}
        onClick={() => setActiveTab(1)}
      >
        Scanner
      </button>
    </div>
  );
};

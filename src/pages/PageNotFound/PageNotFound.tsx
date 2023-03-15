import * as React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

export const PageNotFound = () => {
  const { pathname } = useLocation();
  return (
    <div className='page-not-found'>
      <div className='card'>
        <div className='dapp-icon icon-medium'>
          <FontAwesomeIcon icon={faSearch} className='fa-3x' />
        </div>
        <h4 className='page-not-found-title'>Page not found</h4>
        <span className='empty-details'>{pathname}</span>
      </div>
    </div>
  );
};

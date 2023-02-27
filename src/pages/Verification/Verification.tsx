import React from 'react';
import { OwnershipVerification } from './components';

export const Verification = () => {
  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <OwnershipVerification />
        </div>
      </div>
    </div>
  );
};

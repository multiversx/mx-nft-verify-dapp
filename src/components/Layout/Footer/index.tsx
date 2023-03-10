import React from 'react';
import { ReactComponent as MultiversxLogo } from 'assets/img/multiversx.svg';

export const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        <a
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href='https://multiversx.com/'
        >
          <span>Powered by</span>
          <MultiversxLogo className='mutliversx-logo' />
        </a>
      </div>
    </footer>
  );
};

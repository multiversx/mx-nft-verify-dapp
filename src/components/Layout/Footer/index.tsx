import React from 'react';
import { ReactComponent as MultiversxLogo } from 'assets/img/multiversx.svg';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div>
        <a
          {...{
            target: '_blank'
          }}
          href='https://multiversx.com/'
        >
          <span>Powered by</span>
          <MultiversxLogo className='mutliversx-logo' />
        </a>
      </div>
    </footer>
  );
};

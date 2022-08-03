import React from 'react';
import { WalletConnectLoginButton } from '@elrondnetwork/dapp-core/UI';
import { routeNames } from 'routes';

export const Verification: () => JSX.Element = () => {
  const getRef = (e: HTMLDivElement) => {
    const buttonRef = e.querySelector('button');

    if (buttonRef) {
      setTimeout(() => {
        buttonRef.click();
      }, 1);
    }
  };

  const onModalOpens = (props: any) => {
    console.log(props);
  };

  return (
    <div className='card shadow-sm rounded p-4 border-0'>
      <div ref={getRef} className='card-body text-center'>
        <WalletConnectLoginButton
          callbackRoute={routeNames.dashboard}
          className='button-verify'
          lead='Two transactions will be required'
          loginButtonText={'Verify'}
          title='Scan the QR using Maiar App'
          hideButtonWhenModalOpens={true}
          wrapContentInsideModal={false}
          onModalOpens={onModalOpens}
        />
      </div>
    </div>
  );
};

export default Verification;

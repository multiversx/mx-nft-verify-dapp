import React from 'react';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import { WalletConnectLoginButton } from '@elrondnetwork/dapp-core/UI';
import { routeNames } from 'routes';

export const UnlockRoute: () => JSX.Element = () => {
  const { isLoggedIn } = useGetLoginInfo();

  React.useEffect(() => {
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    }
  }, [isLoggedIn]);

  return (
    <WalletConnectLoginButton
      callbackRoute={routeNames.dashboard}
      className='button--hidden'
      lead='Two transactions will be required'
      loginButtonText={''}
      shouldRenderDefaultCss={false}
      title='Scan the QR using Maiar App'
      wrapContentInsideModal={false}
    />
  );
};

export default UnlockRoute;

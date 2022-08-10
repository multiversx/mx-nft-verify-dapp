import * as React from 'react';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import { useLocation } from 'react-router-dom';
import { routeNames } from 'routes';
import Verification from '../../components/Verification';

const OwnershipVerification = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const { search } = useLocation();

  React.useEffect(() => {
    if (isLoggedIn) {
      location.href = `${window.location.origin}${routeNames.home}${search}`;
    }
  }, [isLoggedIn]);

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <Verification />
        </div>
      </div>
    </div>
  );
};

export default OwnershipVerification;

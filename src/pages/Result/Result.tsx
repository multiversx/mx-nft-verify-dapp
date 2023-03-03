import React, { useEffect } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Loader } from '@multiversx/sdk-dapp/UI/Loader';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { COLLECTION_ID, CALLBACK_URL, AGE } from 'config';
import { useApiRequests } from 'hooks/network';
import { useValidateNft } from 'hooks/nft';
import { routeNames } from 'routes';
import { ResultMessage } from './components';
import { QueryParamEnum } from './result.types';

export const Result = () => {
  const account = useGetAccountInfo();

  const { address: accountAddress } = account;

  const { callbackUrlAfterValidate } = useApiRequests();

  const { isValidatedNft, isLoadingValidateNft } = useValidateNft();
  const { search } = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    updateSearchParams();

    if (!searchParams.get(QueryParamEnum.collectionId)) {
      navigate(routeNames.home);
    }

    const callbackUrlParam = searchParams.get(QueryParamEnum.callbackUrl);

    if (callbackUrlParam) {
      callbackUrlAfterValidate({
        callbackUrl: callbackUrlParam,
        address: accountAddress
      });
    }
  }, []);

  const handleLogout = () => {
    logout(`${location.origin}${routeNames.verify}${search}`);
  };

  const updateSearchParams = () => {
    if (COLLECTION_ID) {
      searchParams.set(QueryParamEnum.collectionId, COLLECTION_ID);
    }

    if (CALLBACK_URL) {
      searchParams.set(QueryParamEnum.callbackUrl, CALLBACK_URL);
    }

    if (AGE) {
      searchParams.set(QueryParamEnum.age, AGE);
    }

    setSearchParams(searchParams);
  };

  if (isLoadingValidateNft) {
    return <Loader noText />;
  }

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <ResultMessage
            isValidated={isValidatedNft}
            handleReset={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

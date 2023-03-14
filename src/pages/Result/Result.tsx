import React, { useEffect } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Loader } from '@multiversx/sdk-dapp/UI/Loader';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { COLLECTION, PIXEL, CALLBACK, AGE, REF } from 'config';
import { useApiRequests } from 'hooks/network';
import { useValidateNft } from 'hooks/nft';
import { routeNames } from 'routes';
import { ResultMessage } from './components';
import { QueryParamEnum } from './result.types';

export const Result = () => {
  const account = useGetAccountInfo();

  const { address: accountAddress } = account;

  const { callPixelAfterValidate } = useApiRequests();

  const { isValidatedNft, isLoadingValidateNft } = useValidateNft();
  const { search } = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    updateSearchParams();

    if (!searchParams.get(QueryParamEnum.collection)) {
      navigate(routeNames.home);
    }

    const pixelParam = searchParams.get(QueryParamEnum.pixel);
    const callbackParam = searchParams.get(QueryParamEnum.callback);
    const refParam = searchParams.get(QueryParamEnum.ref);

    if (pixelParam && isValidatedNft) {
      callPixelAfterValidate({
        pixel: pixelParam,
        address: accountAddress,
        ...(callbackParam && { callback: callbackParam }),
        ...(refParam && { ref: refParam })
      });
    }

    // if (callbackParam && isValidatedNft) {
    //   setTimeout(() => {
    //     window.location.href = callbackParam;
    //   }, 2000);
    // }
  }, []);

  const handleLogout = () => {
    logout(`${location.origin}${routeNames.verify}${search}`);
  };

  // If the params are set in the conifg, we update the searchParams with those, otherwise those built in the Build URL form will remain
  const updateSearchParams = () => {
    if (COLLECTION) {
      searchParams.set(QueryParamEnum.collection, COLLECTION);
    }

    if (PIXEL) {
      searchParams.set(QueryParamEnum.pixel, PIXEL);
    }

    if (CALLBACK) {
      searchParams.set(QueryParamEnum.callback, CALLBACK);
    }

    if (AGE) {
      searchParams.set(QueryParamEnum.age, AGE);
    }

    if (REF) {
      searchParams.set(QueryParamEnum.ref, REF);
    }

    setSearchParams(searchParams);
  };

  if (isLoadingValidateNft) {
    return <Loader noText />;
  }

  console.log('isValidatedNft: ', isValidatedNft);

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

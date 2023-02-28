import React, { useState, useEffect } from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { COLLECTION_ID, CALLBACK_URL, AGE } from 'config';
import { useApiRequests } from 'hooks/network';
import { routeNames } from 'routes';
import { FetchResult, Nft, Transaction } from 'types';
import { checkNftOwnership, getTimestamp, queryParamsParser } from 'utils';
import { ResultMessage } from './components';
import { QueryParamEnum } from './result.types';

export const Result = () => {
  const account = useGetAccountInfo();

  const { address: accountAddress } = account;

  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getAccountNfts, getAccountTransfers, callbackUrlAfterValidate } =
    useApiRequests();
  const { search } = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [isValidated, setIsValidated] = useState(false);

  const getNftCollection = async () => {
    const queryParams: Map<string, string> | null = queryParamsParser(search);

    if (queryParams) {
      const nftCollection = queryParams.get(QueryParamEnum.collectionId);

      if (!nftCollection) {
        return;
      }

      const [accountNftsResult, transactionResult] = await Promise.all([
        getAccountNfts({
          apiAddress,
          accountAddress,
          collections: [nftCollection]
        }),
        getAccountTransfers({
          apiAddress,
          accountAddress,
          after: getTimestamp('hours', -48),
          token: nftCollection
        })
      ]);

      const hasNft = checkNftOwnership(
        accountNftsResult as FetchResult<Nft>,
        transactionResult as FetchResult<Transaction>
      );

      setIsValidated(hasNft);

      return;
    }
  };

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

  useEffect(() => {
    getNftCollection();
  }, [isValidated, searchParams]);

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

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <ResultMessage isValidated={isValidated} handleReset={handleLogout} />
        </div>
      </div>
    </div>
  );
};

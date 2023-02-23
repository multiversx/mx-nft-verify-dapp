import React, { useState, useEffect } from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useLocation } from 'react-router-dom';
import { useApiRequests } from 'hooks/network';
import { routeNames } from 'routes';
import { FetchResult, Nft, Transaction } from 'types';
import { checkNftOwnership, getTimestamp, queryParamsParser } from 'utils';
import { ResultMessage } from './components';
import { QueryParamEnum } from './result.types';

export const Result = () => {
  const account = useGetAccountInfo();
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getAccountNfts, getAccountTransfers } = useApiRequests();
  const { search } = useLocation();

  const getNftCollection = async () => {
    const queryParams: Map<string, string> | null = queryParamsParser(search);

    if (queryParams) {
      const nftCollection = queryParams.get(QueryParamEnum.collection);

      if (!nftCollection) {
        return;
      }

      const accountAddress = account.address;

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

  const [isValidated, setIsValidated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await getNftCollection();
    })();
  }, [isValidated]);

  const handleLogout = () => {
    logout(`${location.origin}${routeNames.verify}`);
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

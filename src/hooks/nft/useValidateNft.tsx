import { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import { useSearchParams } from 'react-router-dom';
import { useApiRequests } from 'hooks/network';
import { QueryParamEnum } from 'pages/Result/result.types';
import { checkNftOwnership, getTimestamp } from 'utils';

export const useValidateNft = () => {
  const account = useGetAccountInfo();

  const { address: accountAddress } = account;

  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getAccountNfts, getTransactionsCount } = useApiRequests();

  const [isLoadingValidateNft, setIsLoadingValidateNft] = useState(false);
  const [isValidatedNft, setIsValidatedNft] = useState(false);

  const [searchParams] = useSearchParams();

  const getNftCollection = async () => {
    const nftCollection = searchParams.get(QueryParamEnum.collectionId);
    const age = searchParams.get(QueryParamEnum.age);

    if (!nftCollection || !age) {
      return;
    }

    setIsLoadingValidateNft(true);

    const [accountNftsResult, transactionsCountResult] = await Promise.all([
      getAccountNfts({
        apiAddress,
        accountAddress,
        collections: [nftCollection]
      }),
      getTransactionsCount({
        apiAddress,
        receiverAddress: accountAddress,
        collectionId: nftCollection,
        beforeTimestamp: getTimestamp('seconds', Number(age) * -1)
      })
    ]);

    setIsLoadingValidateNft(false);

    if (accountNftsResult && transactionsCountResult) {
      const hasNft = checkNftOwnership({
        accountNftsResult,
        transactionsCountResult
      });
      setIsValidatedNft(hasNft);
    }
  };

  useEffect(() => {
    getNftCollection();
  }, [isValidatedNft, searchParams]);

  return {
    isValidatedNft,
    isLoadingValidateNft
  };
};

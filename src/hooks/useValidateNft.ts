import { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import { useSearchParams } from 'react-router-dom';
import { QueryParamEnum } from 'pages/Result/result.types';
import { getTimestamp } from 'utils';
import { useApiRequests } from './useApiRequests';

export const useValidateNft = () => {
  const account = useGetAccountInfo();

  const { address: accountAddress } = account;

  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  console.log('apiAddress: ', apiAddress);

  const { getAccountNfts, getTransactionsCount } = useApiRequests();

  const [isLoadingValidateNft, setIsLoadingValidateNft] = useState(false);
  const [isValidatedNft, setIsValidatedNft] = useState(false);
  const [nftIdentifier, setNftIdentifier] = useState<string>();

  const [searchParams] = useSearchParams();

  const getNftCollection = async () => {
    const nftCollection = searchParams.get(QueryParamEnum.collection);
    const age = searchParams.get(QueryParamEnum.age);

    if (!nftCollection || !age) {
      return;
    }

    setIsLoadingValidateNft(true);

    const { data: availableNfts } = await getAccountNfts({
      apiAddress,
      accountAddress,
      collections: [nftCollection]
    });

    for (let i = 0; i < availableNfts.length; i++) {
      const { data: noOfTx } = await getTransactionsCount({
        apiAddress,
        receiverAddress: accountAddress,
        collection: availableNfts[i].identifier,
        afterTimestamp: getTimestamp('seconds', Number(age))
      });

      if (noOfTx === 0) {
        setNftIdentifier(availableNfts[i].identifier);
        setIsValidatedNft(true);
        break;
      }
    }

    setIsLoadingValidateNft(false);
  };

  useEffect(() => {
    getNftCollection();
  }, []);

  return {
    isValidatedNft,
    isLoadingValidateNft,
    nftIdentifier
  };
};

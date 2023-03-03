import axios from 'axios';
import { GetAccountNfts, GetBlocks, GetCollectionNfts } from 'types';
import { asyncWrapper } from 'utils';
import { useAxiosAuthWrapper } from './useAxiosAuthWrapper';

export const useApiRequests = () => {
  const axiosAuthWrapper = useAxiosAuthWrapper();

  const DEFAULT_TIMEOUT = 3000;

  return {
    getBlocks: ({ apiAddress, size }: GetBlocks) =>
      asyncWrapper(() =>
        axios.get(`${apiAddress}/blocks`, {
          params: {
            size
          },
          timeout: DEFAULT_TIMEOUT
        })
      ),

    getAccountNfts: ({
      apiAddress,
      accountAddress,
      collections
    }: GetAccountNfts): Promise<any> =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(`${apiAddress}/accounts/${accountAddress}/nfts`, {
            timeout: DEFAULT_TIMEOUT,
            params: {
              collections: collections.join(',')
            }
          })
        )
      ),

    getCollectionNfts: ({ apiAddress, collection }: GetCollectionNfts) =>
      asyncWrapper(() =>
        axios.get(`${apiAddress}/collections/${collection}/nfts`, {
          timeout: DEFAULT_TIMEOUT
        })
      ),
    callbackUrlAfterValidate: ({
      callbackUrl,
      address
    }: {
      callbackUrl: string;
      address: string;
    }) =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(callbackUrl, {
            params: {
              address
            },
            timeout: DEFAULT_TIMEOUT
          })
        )
      ),
    getTransactionsCount: ({
      apiAddress,
      receiverAddress,
      collectionId,
      afterTimestamp
    }: {
      apiAddress: string;
      receiverAddress: string;
      collectionId: string;
      afterTimestamp: number;
    }): Promise<any> =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(`${apiAddress}/transactions/count`, {
            params: {
              receiver: receiverAddress,
              token: collectionId,
              after: afterTimestamp
            },
            timeout: DEFAULT_TIMEOUT
          })
        )
      )
  };
};

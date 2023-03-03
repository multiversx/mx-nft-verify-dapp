import axios from 'axios';
import {
  GetAccountNfts,
  GetBlocks,
  GetCollectionNfts,
  GetTransactions
} from 'types';
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
    }: GetAccountNfts) =>
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

    getAccountTransfers: ({
      apiAddress,
      accountAddress,
      token,
      before,
      after
    }: GetTransactions) =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(`${apiAddress}/accounts/${accountAddress}/transfers`, {
            params: {
              receiver: accountAddress,
              before,
              after,
              token
            },
            timeout: DEFAULT_TIMEOUT
          })
        )
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
      )
  };
};

import axios from 'axios';
import { GetAccountNfts, GetCollectionNfts } from 'types';
import { asyncWrapper } from 'utils';
import { useAxiosAuthWrapper } from './useAxiosAuthWrapper';

export const useApiRequests = () => {
  const axiosAuthWrapper = useAxiosAuthWrapper();

  const DEFAULT_TIMEOUT = 3000;

  return {
    getAccountNfts: ({
      apiAddress,
      accountAddress,
      collections
    }: GetAccountNfts) =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(
            `${apiAddress}/accounts/erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex/nfts`,
            {
              timeout: DEFAULT_TIMEOUT,
              params: {
                collections: collections.join(',')
              }
            }
          )
        )
      ),

    getCollectionNfts: ({ apiAddress, collection }: GetCollectionNfts) =>
      asyncWrapper(() =>
        axios.get(`${apiAddress}/collections/${collection}/nfts`, {
          timeout: DEFAULT_TIMEOUT
        })
      ),
    callPixelAfterValidate: ({
      pixel,
      address,
      callback,
      ref
    }: {
      pixel: string;
      address: string;
      callback?: string;
      ref?: string;
    }) =>
      axios.get(pixel, {
        params: {
          address:
            'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex',
          callback,
          ref
        },
        timeout: DEFAULT_TIMEOUT
      }),

    getTransactionsCount: ({
      apiAddress,
      receiverAddress,
      collection,
      afterTimestamp
    }: {
      apiAddress: string;
      receiverAddress: string;
      collection: string;
      afterTimestamp: number;
    }) =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(`${apiAddress}/transactions/count`, {
            params: {
              receiver:
                'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex',
              token: collection,
              after: afterTimestamp
            },
            timeout: DEFAULT_TIMEOUT
          })
        )
      )
  };
};

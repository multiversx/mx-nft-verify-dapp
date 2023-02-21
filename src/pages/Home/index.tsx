import * as React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useLocation } from 'react-router-dom';
import OwnershipMessage from 'components/OwnershipMessage';
import { checkNftOwnership, getTimestamp, queryParamsParser } from 'utils';
import { routeNames } from 'routes';
import { FetchResult, Nft, Transaction } from 'types';
import { QueryParamEnum } from './enums';
import { useApiRequests } from 'hooks/network';

const Home: () => JSX.Element = () => {
  const account = useGetAccountInfo();
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getAccountNfts, getAccountTransfers } = useApiRequests();
  const { search } = useLocation();

  const getNftCollection = async () => {
    const queryParams: Map<string, string> | null = queryParamsParser(search);

    if (queryParams) {
      const nftCollection: string | undefined = queryParams.get(
        QueryParamEnum.collection
      );

      if (!nftCollection) {
        return;
      }

      const accountAddress = Number(account.address);

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

      const hasNft: boolean = checkNftOwnership(
        accountNftsResult as FetchResult<Nft>,
        transactionResult as FetchResult<Transaction>
      );

      setState(hasNft);

      return;
    }
  };

  const [isValidated, setState] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      await getNftCollection();
    })();
  }, [isValidated]);

  const handleLogout = () => {
    logout(`${location.origin}${routeNames.verify}${search}`);
  };

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <OwnershipMessage
            isValidated={isValidated}
            handleReset={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

import * as React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_TIMEOUT,
  getAccountNfts,
  getReceivingTransactions
} from 'apiRequests';
import OwnershipMessage from 'components/OwnershipMessage';
import { routeNames } from 'routes';
import { QueryParamEnum } from './enums';
import { checkNftOwnership, queryParamsParser } from './helpers';

const Home: () => JSX.Element = () => {
  const account = useGetAccountInfo();
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { search } = useLocation();

  const getNftCollection = async () => {
    const queryParams: Map<string, string> | null = queryParamsParser(search);

    if (queryParams) {
      const nftColletionAddress: string | undefined = queryParams.get(
        QueryParamEnum.collection
      );

      if (!nftColletionAddress) {
        return;
      }

      const accountAddress: number = account.address;
      const [nftResult, transactionResult] = await Promise.all([
        getAccountNfts({
          apiAddress,
          accountAddress,
          timeout: DEFAULT_TIMEOUT
        }),
        getReceivingTransactions({
          apiAddress,
          accountAddress,
          timeout: DEFAULT_TIMEOUT
        })
      ]);

      const hasNft: boolean = checkNftOwnership(
        nftResult,
        nftColletionAddress,
        transactionResult
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

import * as React from 'react';
import OwnershipMessage from '../../components/OwnershipMessage';
import Verification from '../../components/Verification';
import { QueryParamEnum } from './enums';
import { queryParamsParser } from './helpers';
import { HomeState, TxStatusType } from './interfaces';

const Home = () => {
  const [state, setState] = React.useState<HomeState>(new HomeState());

  React.useEffect(() => {
    const queryParams: Map<string, string> | null = queryParamsParser(
      location.search
    );

    if (queryParams) {
      setState(
        new HomeState(
          queryParams.get(QueryParamEnum.collection),
          queryParams.get(QueryParamEnum.callbackUrl)
        )
      );
    }
  }, [state.callbackUrl, state.nftCollectionHash]);

  const handleVerificationResult = (result: TxStatusType): void => {
    setState(
      new HomeState(
        state.nftCollectionHash,
        state.callbackUrl,
        true,
        result === 'success'
      )
    );
  };

  const handleReset = (): void => {
    setState(new HomeState(state.nftCollectionHash, state.callbackUrl, false));
  };

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          {!state.isVerified ? (
            <Verification
              nftCollectionHash={state.nftCollectionHash}
              callbackUrl={state.callbackUrl}
              handleVerificationResult={handleVerificationResult}
            />
          ) : (
            <OwnershipMessage
              isValidated={state.isValidated}
              handleReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

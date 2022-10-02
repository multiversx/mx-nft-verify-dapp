import React from 'react';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks';
import { WalletConnectLoginButton } from '@elrondnetwork/dapp-core/UI';
import { useLocation } from 'react-router-dom';
import { getBlocks } from 'apiRequests';
import { routeNames } from 'routes';
import { FetchResult, TransactionType } from 'types';
import { VerificationState } from './interfaces';

const Verification: () => JSX.Element = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { search } = useLocation();

  const [state, setState] = React.useState<VerificationState>(
    new VerificationState()
  );

  const getRef = async (e: HTMLDivElement) => {
    if (!e) {
      return;
    }

    const buttonRef = e.querySelector('button');

    if (buttonRef) {
      await setTimeout(() => {
        buttonRef.click();
      }, 0.01);
    }

    return e;
  };

  const getLastBlock = async (): Promise<void> => {
    const result: FetchResult<TransactionType> = await getBlocks({
      apiAddress,
      size: 1
    });

    if (result.success && result.data.length) {
      const lastBlock: TransactionType = result.data[0];

      setState({
        ...state,
        blockHash: lastBlock.hash
      });
    }
  };

  React.useEffect(() => {
    if (!state.blockHash) {
      (async () => {
        await getLastBlock();
      })();
    }
  }, [state.blockHash]);

  React.useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(async () => {
      await getLastBlock();
    }, state.refreshRate);

    return () => {
      clearInterval(interval);
    };
  }, [state.blockHash]);

  return (
    <div className='card shadow-sm rounded p-4 border-0'>
      <div ref={getRef} className='card-body text-center'>
        <WalletConnectLoginButton
          callbackRoute={routeNames.home + search}
          className='button-verify'
          hideButtonWhenModalOpens={true}
          lead='Two transactions will be required'
          loginButtonText={'Verify'}
          logoutRoute={routeNames.verify + search}
          title='Scan the QR using Maiar App'
          token={state.blockHash}
          wrapContentInsideModal={false}
        />
      </div>
    </div>
  );
};

export default Verification;

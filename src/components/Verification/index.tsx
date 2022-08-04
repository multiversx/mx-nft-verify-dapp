import React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';
import { WalletConnectLoginButton } from '@elrondnetwork/dapp-core/UI';
import { FetchResult, getBlocks } from 'apiRequests';
import { TransactionType } from 'pages/Home/interfaces';
import { routeNames } from 'routes';
import { VerificationProps, VerificationState } from './interfaces';

const Verification: (props: VerificationProps) => JSX.Element = (
  props: VerificationProps
) => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const account = useGetAccountInfo();

  console.log(account);

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
    const result: FetchResult = await getBlocks({
      apiAddress,
      size: 1,
      timeout: 3000
    });

    if (result.success && result.data.length) {
      const lastBlock: TransactionType = result.data[0];
      console.log(lastBlock);

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
          callbackRoute={props.callbackUrl || routeNames.home}
          className='button-verify'
          lead='Two transactions will be required'
          loginButtonText={'Verify'}
          title='Scan the QR using Maiar App'
          hideButtonWhenModalOpens={true}
          wrapContentInsideModal={false}
          token={state.blockHash}
        />
      </div>
    </div>
  );
};

export default Verification;

import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { ScanResult } from './components';

export const Scan = () => {
  const [nativeAuthToken, setNativeAuthToken] = useState<string | null>();

  const { ref } = useZxing({
    onDecodeResult(data) {
      console.log('data: ', data);
      setNativeAuthToken(data.getText());
    },
    onDecodeError(error) {
      console.log(`Could not scan: ${error}`);
    }
  });

  const handleReset = () => {
    setNativeAuthToken(null);
  };

  return (
    <>
      <video ref={ref} className='qr-reader-container' />

      {nativeAuthToken && (
        <ScanResult
          nativeAuthToken={nativeAuthToken}
          handleReset={handleReset}
        />
      )}
    </>
  );
};

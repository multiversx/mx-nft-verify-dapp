import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { ScanResult } from './components';

export const Scanner = () => {
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
    <div className='qr-reader-container'>
      <video ref={ref} className='qr-reader-video' />

      {nativeAuthToken && (
        <ScanResult
          nativeAuthToken={nativeAuthToken}
          handleReset={handleReset}
        />
      )}
    </div>
  );
};

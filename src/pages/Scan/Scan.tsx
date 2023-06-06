import React, { useState } from 'react';
import QrReader from 'react-web-qr-reader';
import { ScanResult } from './components';

export const Scan = () => {
  const [nativeAuthToken, setNativeAuthToken] = useState<string | null>(null);

  const handleScan = (payload: any) => {
    if (payload.data) {
      setNativeAuthToken(payload.data);
    }
  };

  const handleError = (error: unknown) => {
    console.log(error);
  };

  const handleReset = () => {
    setNativeAuthToken(null);
  };

  return (
    <>
      <div className='qr-reader-container'>
        <QrReader
          delay={2000}
          facingMode='environment'
          onError={handleError}
          onScan={handleScan}
        />
      </div>

      {nativeAuthToken && (
        <ScanResult
          nativeAuthToken={nativeAuthToken}
          handleReset={handleReset}
        />
      )}
    </>
  );
};

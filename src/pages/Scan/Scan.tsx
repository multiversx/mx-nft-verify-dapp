import React, { useState } from 'react';
import QrReader from 'react-web-qr-reader';
import { ScanResult } from './components';

export const Scan = () => {
  const [nativeAuthToken, setNativeAuthToken] = useState<string | null>();

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
      <button
        onClick={() =>
          setNativeAuthToken(
            'ZXJkMTh4Nmt3dTJmdm03bXI1ZXNyeTJqcjQwbTlnZzZ0aDBmeWhhbHE2amtybmZwbWZ5anlzaHEyajB3dTc.YlhWc2RHbDJaWEp6ZURvdkwzaHdiM0owWVd3LjMzMWFkZDJiYjFjNTdlNDQ1Y2E5N2MwODI1MTQ3MTMyYjY4ZmNjMWFlNGNjNmM1YjM1MjdiMTcwOWE4NmFiYjMuMTIwLmV5SnBaR1Z1ZEdsbWFXVnlJam9pV0ZCQlEwaEpSVlpGTFRWaE1EVXhPUzB3TVNJc0luUnBiV1Z6ZEdGdGNDSTZNVFk0T0Rjek5EWXlObjA.a3de6616963a3d9725944dec3fde00a1efa1f0677980950d42426987fbb5eab7c646b244c93506a6eb6718502ba0e48a1a4c6d4f00c1d4f1801e51cfe381b204'
          )
        }
      >
        Set Nauth
      </button>

      {nativeAuthToken && (
        <ScanResult
          nativeAuthToken={nativeAuthToken}
          handleReset={handleReset}
        />
      )}
    </>
  );
};

import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { ScanResult } from './components';

export const Scanner = () => {
  const [nativeAuthToken, setNativeAuthToken] = useState<string | null>(
    'ZXJkMTh4Nmt3dTJmdm03bXI1ZXNyeTJqcjQwbTlnZzZ0aDBmeWhhbHE2amtybmZwbWZ5anlzaHEyajB3dTc.YlhWc2RHbDJaWEp6ZURvdkwzaHdiM0owWVd3LjI5NGQxMzk1MDBkN2Y2OGMwNmE2NDk4NDJjYWU3ZWE5ZTEzYmI2ZDFmOWQzYjA0MzJjY2UwMDY3ZTM2NjdmMGMuMTIwLmV5SnBaR1Z1ZEdsbWFXVnlJam9pV0VSQldUSXpWRVZCVFMxbU4yRXpORFl0TlRZaUxDSjBhVzFsYzNSaGJYQWlPakUyT1RjME5qazBOREY5.13e6f23be664a224827013dfb419a84952946b27993c35d47e09023037109da866dc6ec4cad85b0790a3f3118d569127dcaf1a3269e19646716176e55706250f'
  );

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

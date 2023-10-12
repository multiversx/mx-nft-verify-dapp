import React from 'react';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import { Loader } from '@multiversx/sdk-dapp/UI/Loader';

interface GeneratedUrlProps {
  url: string;
  isUrlLoading: boolean;
}

export const GeneratedUrl = ({ url, isUrlLoading }: GeneratedUrlProps) => {
  if (isUrlLoading) {
    return <Loader noText />;
  }

  if (!url) {
    return null;
  }

  return (
    <div className='build-generated-url-wrapper'>
      <div className='build-generated-url'>
        <a
          href={url}
          title={url}
          {...{
            target: '_blank'
          }}
        >
          {url}
        </a>
      </div>
      <CopyButton text={url} />
    </div>
  );
};

import React, { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faClone } from '@fortawesome/free-solid-svg-icons/faClone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addNewCustomToast } from '@multiversx/sdk-dapp/utils';
import { copyTextToClipboard } from 'utils';

interface CopyButtonType {
  text: string;
  successMessage?: string;
  className?: string;
}

export const CopyButton = ({
  text,
  successMessage,
  className = ''
}: CopyButtonType) => {
  const [copyResult, setCopyResult] = useState({
    default: true,
    success: false
  });

  const handleCopyToClipboard = async () => {
    const noSpaces = text?.trim();
    setCopyResult({
      default: false,
      success: await copyTextToClipboard(noSpaces)
    });

    setTimeout(() => {
      setCopyResult({
        default: true,
        success: false
      });

      if (successMessage) {
        addNewCustomToast({
          toastId: 'Info ' + Date.now(),
          message: successMessage,
          type: 'custom',
          duration: 4000,
          title: 'Copied!',
          status: '',
          icon: faCheck,
          iconClassName: 'bg-success'
        });
      }
    }, 500);
  };

  return (
    <button
      type='button'
      onClick={handleCopyToClipboard}
      className={`btn btn-link side-action ${className}`}
    >
      {copyResult.default || !copyResult.success ? (
        <FontAwesomeIcon icon={faClone} />
      ) : (
        <FontAwesomeIcon icon={faCheck} className='primary' />
      )}
    </button>
  );
};

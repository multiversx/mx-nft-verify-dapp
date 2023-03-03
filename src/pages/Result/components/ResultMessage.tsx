import React, { FC, useEffect, useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { ResultMessageState } from 'pages/Result/result.types';

interface ResultMessageProps {
  isValidated: boolean;
  handleReset: () => void;
}

export const ResultMessage: FC<ResultMessageProps> = ({
  isValidated,
  handleReset
}) => {
  const [resultMessage, setResultMessage] = useState(new ResultMessageState());

  useEffect(() => {
    if (isValidated) {
      setResultMessage(
        new ResultMessageState(
          'result-icon text-success',
          'NFT Identifier: MOS',
          faCircleCheck,
          'Ownership Validated'
        )
      );
    } else {
      setResultMessage(
        new ResultMessageState(
          'result-icon text-danger',
          'Reason: message signature does not match',
          faCircleXmark,
          'Unable to validate ownership'
        )
      );
    }
  }, [isValidated]);

  return (
    <div className='card shadow-sm rounded p-4 border-0'>
      <div className='card-body text-center'>
        <FontAwesomeIcon
          icon={resultMessage.icon as IconDefinition}
          size='3x'
          className={resultMessage.className}
        />
        <h4 className='card-title mb-3 my-2' data-testid='title'>
          {resultMessage.title}
        </h4>
        <p className='text-secondary'>{resultMessage.description}</p>
        <Button
          onClick={handleReset}
          className='button-submit'
          variant='primary'
        >
          Start over
        </Button>
      </div>
    </div>
  );
};

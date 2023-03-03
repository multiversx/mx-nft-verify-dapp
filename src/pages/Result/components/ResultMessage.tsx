import React, { useEffect, useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { useSearchParams } from 'react-router-dom';
import { QueryParamEnum, ResultMessageState } from 'pages/Result/result.types';

interface ResultMessageProps {
  isValidated: boolean;
  handleReset: () => void;
}

export const ResultMessage = ({
  isValidated,
  handleReset
}: ResultMessageProps) => {
  const [resultMessage, setResultMessage] = useState(new ResultMessageState());
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isValidated) {
      setResultMessage(
        new ResultMessageState(
          'result-icon text-success mb-4',
          `Collection identifier: ${searchParams.get(
            QueryParamEnum.collectionId
          )}`,
          faCircleCheck,
          'Ownership Validated'
        )
      );
    } else {
      setResultMessage(
        new ResultMessageState(
          'result-icon text-danger mb-4',
          'Reason: Could not find any NFT in the specified collection',
          faCircleXmark,
          'Unable to Validate Ownership'
        )
      );
    }
  }, [isValidated]);

  return (
    <div className='card'>
      <div className='text-center'>
        <FontAwesomeIcon
          icon={resultMessage.icon as IconDefinition}
          size='7x'
          className={resultMessage.className}
        />
        <h4 className='text-white card-title mb-3 my-2' data-testid='title'>
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

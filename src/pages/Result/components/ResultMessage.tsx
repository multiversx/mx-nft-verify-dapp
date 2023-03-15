import React, { useEffect, useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    if (isValidated) {
      setResultMessage(
        new ResultMessageState(
          'result-icon color-success',
          `Collection identifier: ${searchParams.get(
            QueryParamEnum.collection
          )}`,
          faCircleCheck,
          'Ownership Validated'
        )
      );
    } else {
      setResultMessage(
        new ResultMessageState(
          'result-icon color-danger',
          `Could not find any NFT in the ${searchParams.get(
            QueryParamEnum.collection
          )} collection`,
          faCircleXmark,
          'Unable to Validate Ownership'
        )
      );
    }
  }, [isValidated]);

  return (
    <div className='result-message card'>
      <div className='result-content'>
        <FontAwesomeIcon
          icon={resultMessage.icon as IconDefinition}
          size='7x'
          className={resultMessage.className}
        />
        <h4 className='result-title'>{resultMessage.title}</h4>
        <p className='result-description'>{resultMessage.description}</p>
        <button onClick={handleReset} className='btn btn-primary'>
          Start over
        </button>
      </div>
    </div>
  );
};

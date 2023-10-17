import React, { useEffect, useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';
import { QueryParamEnum, ResultMessageState } from 'pages/Result/result.types';
import { useApiRequests } from 'hooks';

interface ResultMessageProps {
  isValidated: boolean;
  handleReset: () => void;
  accountAddress: string;
}

export const ResultMessage = ({
  isValidated,
  handleReset,
  accountAddress
}: ResultMessageProps) => {
  const { getParticipantName } = useApiRequests();

  const [resultMessage, setResultMessage] = useState(new ResultMessageState());
  const [searchParams] = useSearchParams();

  const getTicketInformation = async () => {
    const response = await getParticipantName({
      accountAddress: accountAddress
    });

    const { ticket, fullName } = response.data;

    const title =
      ticket && fullName ? (
        <div className='scan-result-message'>
          Ticket: <span>{ticket}</span> <br /> Name: <span>{fullName}</span>
        </div>
      ) : (
        `Collection identifier: ${searchParams.get(QueryParamEnum.collection)}`
      );
    setResultMessage(
      new ResultMessageState(
        'result-icon color-success outline-success',
        title as any,
        faCircleCheck,
        'Ownership Validated'
      )
    );
  };

  useEffect(() => {
    if (isValidated) {
      getTicketInformation();
    } else {
      setResultMessage(
        new ResultMessageState(
          'result-icon color-danger outline-danger',
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

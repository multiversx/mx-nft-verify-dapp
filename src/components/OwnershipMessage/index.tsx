import React, { useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { OwnershipMessageProps, OwnershipMessageState } from './interfaces';

const OwnershipMessage: (props: OwnershipMessageProps) => JSX.Element = ({
  isValidated
}: OwnershipMessageProps) => {
  const [state, setState] = useState<OwnershipMessageState>(
    new OwnershipMessageState()
  );

  React.useEffect(() => {
    if (isValidated) {
      setState(
        new OwnershipMessageState(
          'text-secondary',
          'NFT Identifier: MOS',
          faCircleCheck,
          'Ownership Validated'
        )
      );
    } else {
      setState(
        new OwnershipMessageState(
          'text-danger',
          'Reason: message signature does not match',
          faCircleXmark,
          'Unable to validate ownership'
        )
      );
    }
  });

  return (
    <div className='card shadow-sm rounded p-4 border-0'>
      <div className='card-body text-center'>
        <FontAwesomeIcon
          icon={state.icon as IconDefinition}
          className='text-secondary'
        />
        <h2 className='mb-3' data-testid='title'>
          NFT Ticket Verification
        </h2>
        <h4></h4>
        <Button variant='primary'>Primary</Button>
      </div>
    </div>
  );
};

export default OwnershipMessage;

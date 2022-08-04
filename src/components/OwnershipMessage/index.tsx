import React, { useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { OwnershipMessageProps, OwnershipMessageState } from './interfaces';

const OwnershipMessage: (props: OwnershipMessageProps) => JSX.Element = (
  props: OwnershipMessageProps
) => {
  const [state, setState] = useState<OwnershipMessageState>(
    new OwnershipMessageState()
  );

  React.useEffect(() => {
    if (props.isValidated) {
      setState(
        new OwnershipMessageState(
          'result-icon text-success',
          'NFT Identifier: MOS',
          faCircleCheck,
          'Ownership Validated'
        )
      );
    } else {
      setState(
        new OwnershipMessageState(
          'result-icon text-danger',
          'Reason: message signature does not match',
          faCircleXmark,
          'Unable to validate ownership'
        )
      );
    }
  }, [state.className, state.description, state.icon, state.title]);

  return (
    <div className='card shadow-sm rounded p-4 border-0'>
      <div className='card-body text-center'>
        <FontAwesomeIcon
          icon={state.icon as IconDefinition}
          className={state.className}
        />
        <h4 className='card-title mb-3' data-testid='title'>
          {state.title}
        </h4>
        <p className='text-secondary'>{state.description}</p>
        <Button
          onClick={props.handleReset}
          className='button-submit'
          variant='primary'
        >
          Start over
        </Button>
      </div>
    </div>
  );
};

export default OwnershipMessage;

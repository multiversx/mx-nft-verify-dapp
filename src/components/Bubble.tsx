import React, { ReactNode } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface BubbleProps {
  identifier: string;
  className?: string;
  children?: ReactNode;
}

export const Bubble = ({ identifier, className, children }: BubbleProps) => {
  const renderTooltip = (props: any) => (
    <Tooltip id={identifier} {...props}>
      {children}
    </Tooltip>
  );
  return (
    <OverlayTrigger
      placement='bottom'
      delay={{ show: 0, hide: 400 }}
      overlay={renderTooltip}
    >
      <FontAwesomeIcon icon={faInfoCircle} className={className} />
    </OverlayTrigger>
  );
};

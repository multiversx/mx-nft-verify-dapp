import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export interface OwnershipMessageProps {
  isValidated: boolean;
  handleReset: () => void;
}

export class OwnershipMessageState {
  constructor(
    public className: string = '',
    public description: string = '',
    public icon: IconDefinition = faQuestionCircle,
    public title: string = ''
  ) {}
}

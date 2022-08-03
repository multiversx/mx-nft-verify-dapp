import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface OwnershipMessageProps {
  isValidated: boolean;
}

export class OwnershipMessageState {
  constructor(
    public className: string = '',
    public description: string = '',
    public icon: IconDefinition | null = null,
    public title: string = ''
  ) {}
}

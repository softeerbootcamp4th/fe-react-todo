import { ReactElement } from 'react';

export interface ILogItemProps {
  content: string;
  oldContent: string;
  type: string;
  badge: ReactElement;
}

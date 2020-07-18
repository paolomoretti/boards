import { SyntheticEvent } from 'react';

export const stopBubblingUp = (e: SyntheticEvent) => {
  e.stopPropagation();
}

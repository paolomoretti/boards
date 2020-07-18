import * as React from 'react';
import { useState } from 'react';

export const Image = (props: any) => {
  const [errored, setErrored] = useState(false);

  const onError = () => {
    setErrored(true);
  }

  if (errored) {
    return null;
  }

  return <img onError={onError} {...props} />;
}
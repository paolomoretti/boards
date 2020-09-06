import * as React from 'react';
import {ImgHTMLAttributes, useState} from 'react';
// @ts-ignore
import * as md5 from 'md5';

interface CDNImageProps extends ImgHTMLAttributes<any> {
}

export const CDNImage = (props: CDNImageProps) => {
  const [errored, setErrored] = useState(false);

  const onError = () => {
    setErrored(true);
  };

  if (errored) {
    return null;
  }

  const p: string = md5(props.src + 'jpy');
  const mUrl: string = `http://morpheus-pp.cronycle.com/private/resize?url=${encodeURIComponent(props.src!)}&p=${p}&w=${props.width || 300}`;

  return <img onError={onError} {...props} src={mUrl} alt={props.alt || ''} />;
};

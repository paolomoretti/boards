import * as React from 'react';
import { useEffect, useState } from 'react';
import getToken from '../../utils/data/getToken';
// @ts-ignore
import * as md5 from 'md5';

export const ProtectedImage = (props: { src: string; } & any) => {
  const [errored, setErrored] = useState(false);
  const [blobSrc, setBlobSrc] = useState<string | null>(null);

  useEffect(() => {
    const p: string = md5(props.src + 'jpy');
    const mUrl: string = `http://morpheus-pp.cronycle.com/private/resize?url=${encodeURIComponent(props.src)}&p=${p}&w=${props.width || 300}`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", mUrl);
    xhr.setRequestHeader("Authorization", `Token auth_token=${getToken()}`);
    xhr.responseType = "blob";
    xhr.onload = function () {
      const status: Number = this['status'];
      const response: any = this['response'];
      if (status === 200) {
        const blob = new Blob([response], {type: response.type});
        setBlobSrc(URL.createObjectURL(blob));
      } else {
        onError();
      }
    }
    xhr.onerror = onError;
    xhr.send();
  }, [props.src])
  const onError = () => {
    setErrored(true);
  }

  if (errored || !blobSrc) {
    return null;
  }

  return <img onError={onError} {...props} src={blobSrc} />;
}
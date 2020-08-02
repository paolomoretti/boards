import { Constants } from '../../data/constants';
import { NextApiRequest, NextApiResponse } from 'next';
const formidable = require('formidable');
const FormData = require('form-data');
const fs = require('fs');

export class Uploader {
  req: NextApiRequest;
  res: NextApiResponse;
  form: any;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  getCronycleApiUri() {
    return this.req.url!.replace(`/api/`, Constants.CRONYCLE_API_URI);
  }

  send() {
    this.form = formidable({ multiples: true });
    this.form.parse(this.req, (_err: any, fields: Record<string, any>, files: Record<string, any>) => {
      const formFile = new FormData();
      Object.keys(files).forEach(fileField => {
        const file = files[fileField];
        formFile.append(fileField, fs.createReadStream(file.path), { filename: file.name, contentType: file.type, knownLength: file.size });
      });
      Object.keys(fields).forEach(fieldName =>
        formFile.append(fieldName, fields[fieldName])
      );
      fetch(this.getCronycleApiUri(), {
        method: 'POST',
        headers: { 'authorization': this.req.headers.authorization! },
        body: formFile
      })
        .then(cres => cres.json())
        .then(cres => this.res.send(cres))
        .catch(() => ({ error: true }))
    })
  }
}
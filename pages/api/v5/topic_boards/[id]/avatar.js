import { Uploader } from '../../../../../utils/api/routeUploader.class';

// Prevent body from being parsed loosing the file stream
export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req, res) => {
  const uploader = new Uploader(req, res);
  uploader.send();
}
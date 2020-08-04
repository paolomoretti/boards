// Prevent body from being parsed loosing the file stream
import { Uploader } from '../../../utils/api/routeUploader.class';

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req, res) => {
  req.url = req.url.replace(`/api/upload/`, `/api/`);
  req.url = req.url.replace(`/api/`, `https://api.cronycle.com/`);
  const uploader = new Uploader(req, res);
  uploader.send();
}
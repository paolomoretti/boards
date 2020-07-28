const multipart = require('parse-multipart');

export default (req, res) => {
  const {
    query: { slugs },
  } = req;
  req.url = req.url.replace(`/api/`, `https://api.cronycle.com/`);
  const fetchOptions = {
    method: req.method,
    headers: { 'content-type': req.headers['content-type'] }
  };
  if (req.headers['authorization']) {
    fetchOptions.headers.authorization = req.headers['authorization'];
  }
  if (req.body && req.headers['content-type'] && req.headers['content-type'].indexOf('form-data') > -1) {
    const sep = req.body.split('\n')[0].trim();
    console.log(`sep`, sep);
    console.log(`req.body`, req.body);
    const parts = multipart.Parse(req.body, sep);
    console.log(`parts`, parts);
    for(var i=0;i<parts.length;i++){
      var part = parts[i];
      console.log(`part`, part);
      // will be:
      // { filename: 'A.txt', type: 'text/plain',
      //		data: <Buffer 41 41 41 41 42 42 42 42> }
    }

    fetchOptions.body = req.body;
  } else if (req.body && req.method.toUpperCase() !== 'GET') {
    fetchOptions.body = JSON.stringify(req.body);
  }
  console.log(`[slugs]`, slugs);
  // console.log(`[fetch] ${req.url}`, fetchOptions);
  fetch(req.url, fetchOptions)
    .then((data) => data.json())
    .then((data) => {
      try {
        return res.json(data);
      } catch (err) {
        console.log(`Error returning json response`);
        return data;
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};

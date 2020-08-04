export default (req, res) => {
  const {
    query: { slugs },
  } = req;
  req.url = req.url.replace(`/api/`, `https://api.cronycle.com/`);
  const fetchOptions = {
    method: req.method,
    headers: {}
  };
  if (req.headers['authorization']) {
    fetchOptions.headers.authorization = req.headers['authorization'];
  }
  if (req.headers['content-type']) {
    fetchOptions.headers['content-type'] = req.headers['content-type'];
  }
  if (req.body && req.method.toUpperCase() !== 'GET') {
    fetchOptions.body = JSON.stringify(req.body);
  }
  console.log(`[slugs]`, slugs);
  // console.log(`[fetch] ${req.url}`, fetchOptions);
  return fetch(req.url, fetchOptions)
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

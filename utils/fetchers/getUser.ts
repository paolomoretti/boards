export const getUser = (token: string) => {
  return fetch('/api/v3/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${token}`
    }
  })
    .then(res => res.json())
};
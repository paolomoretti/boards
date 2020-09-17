export const login = (email: string, password: string) => {
  return fetch('/api/v3/sign_in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
        password_confirmation: password
      }
    })

  })
    .then(res => res.json())
    .catch(err => err);
};
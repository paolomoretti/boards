import * as Cookies from 'js-cookie';

export default function getToken(): string | undefined {
  return Cookies.get('token');
}
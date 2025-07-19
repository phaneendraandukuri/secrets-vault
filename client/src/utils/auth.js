import { jwtDecode } from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('access_token');
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
}

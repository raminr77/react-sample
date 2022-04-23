import nookies from 'nookies';
import { isDevelopment } from 'utils/env';

export function setCookie(name, value, ctx = null) {
  return nookies.set(ctx, name, value, {
    maxAge: 12 * 30 * 24 * 60 * 60,
    path: '/',
    secure: !isDevelopment
  });
}

export function getCookie(name = null, ctx = null) {
  return name ? nookies.get(ctx)[name] : nookies.get(ctx);
}

export function removeCookie(name, ctx = null) {
  return nookies.destroy(ctx, name, { path: '/' });
}

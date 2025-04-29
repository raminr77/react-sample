export function isLocal(): boolean {
  return ['localhost', '127.0.0.1'].includes(location.hostname);
}

export function isAppInstalled(): boolean {
  const mediaQuery = '(display-mode: standalone)' as const;
  // eslint-disable-next-line
  // @ts-ignore
  return !!(window.matchMedia(mediaQuery).matches || window.navigator.standalone);
}

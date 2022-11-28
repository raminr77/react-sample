import { SNACKBAR_EVENT_NAME } from 'constants/snackbar';

export function generateSnackbar(options: SnackBarEvent) {
  if (typeof CustomEvent === 'undefined') return;
  const event = new CustomEvent(SNACKBAR_EVENT_NAME, {
    detail: options
  });
  window.dispatchEvent(event);
}

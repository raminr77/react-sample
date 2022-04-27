export function generateSnackbar(options) {
  if (typeof CustomEvent === 'undefined') {
    return;
  }

  let event = new CustomEvent('DKGenerateSnackbar', {
    detail: options
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(event);
  }
}

export function generateSnackbar(options: SnackBarEvent) {
  if (typeof CustomEvent === 'undefined') {
    return;
  }
  const event = new CustomEvent('GenerateSnackbar', {
    detail: options
  });
  window.dispatchEvent(event);
}

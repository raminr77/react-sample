export function generateSnackbar(options) {
  if (typeof CustomEvent === 'undefined') {
    return;
  }

  let event = new CustomEvent('GenerateSnackbar', {
    detail: options
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(event);
  }
}

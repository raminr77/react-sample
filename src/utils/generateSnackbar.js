export function generateSnackbar(options) {
  if (typeof CustomEvent === 'undefined') {
    return;
  }
  let event = new CustomEvent('GenerateSnackbar', {
    detail: options
  });
  window.dispatchEvent(event);
}

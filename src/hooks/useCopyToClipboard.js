import { useState } from 'react';

export const useCopyToClipboard = (
  successMessage = 'کپی شد',
  failureMessage = 'مجددا تلاش کنید'
) => {
  const [copyStatus, setCopyStatus] = useState('');
  const copy = (text, useOldSchoolMethod = false) => {
    const isNavigatorAvailable = !!navigator?.permissions && !!navigator?.clipboard?.writeText;
    if (!isNavigatorAvailable || useOldSchoolMethod) {
      nativeDevicesCopy(text);
      return;
    }
    if (isNavigatorAvailable) {
      navigator.clipboard.writeText(text).then(
        () => setCopyStatus(successMessage),
        () => setCopyStatus(failureMessage)
      );

      setTimeout(() => {
        setCopyStatus('');
      }, 5000);
    }
  };

  // this method is used to handle the copy command the native devices
  const nativeDevicesCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      setCopyStatus(successful ? successMessage : failureMessage);
    } catch (err) {
      setCopyStatus(failureMessage);
    }
    document.body.removeChild(textArea);

    setTimeout(() => {
      setCopyStatus('');
    }, 5000);
  };

  return [copyStatus, copy];
};

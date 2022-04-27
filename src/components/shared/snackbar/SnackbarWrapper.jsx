import React, { useEffect } from 'react';

export const SnackbarWrapper = () => {
  const createSnackBar = (e) => {};

  useEffect(() => {
    window.addEventListener('GenerateSnackbar', createSnackBar);
    return () => {
      window.removeEventListener('GenerateSnackbar', createSnackBar);
    };
  }, []);

  return (
    <div>
      <div>SnackbarWrapper</div>
    </div>
  );
};

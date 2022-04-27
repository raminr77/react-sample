import React, { useEffect } from 'react';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';

import { SNACKBAR_POSITIONS, SNACKBAR_TYPES } from 'constants/Snackbar';

import 'react-toastify/dist/ReactToastify.min.css';

const TOAST_COLOR_TYPES = {
  DARK: 'dark',
  LIGHT: 'light',
  COLORED: 'colored'
};

const TOAST_TRANSITION_TYPES = {
  ZOOM: Zoom,
  FLIP: Flip,
  SLIDE: Slide,
  BOUNCE: Bounce
};

export const SnackbarWrapper = () => {
  const createSnackBar = (e) => {
    const {
      message,
      icon = null,
      delay = 3000,
      type = SNACKBAR_TYPES.MESSAGE,
      position = SNACKBAR_POSITIONS.BOTTOM_CENTER
    } = e.detail;
    const toastId = type + message;

    if (type === SNACKBAR_TYPES.MESSAGE) {
      return toast(message, {
        toastId,
        position,
        autoClose: delay,
        icon: () => icon,
        theme: TOAST_COLOR_TYPES.DARK,
        transition: TOAST_TRANSITION_TYPES.SLIDE
      });
    }

    toast[type]?.(message, {
      toastId,
      position,
      autoClose: delay,
      icon: () => icon,
      theme: TOAST_COLOR_TYPES.COLORED,
      transition: TOAST_TRANSITION_TYPES.SLIDE
    });
  };

  useEffect(() => {
    window.addEventListener('GenerateSnackbar', createSnackBar);
    return () => {
      window.removeEventListener('GenerateSnackbar', createSnackBar);
    };
  }, []);

  return (
    <ToastContainer
      rtl
      limit={4}
      draggable
      closeOnClick
      pauseOnHover
      hideProgressBar
      pauseOnFocusLoss={false}
    />
  );
};

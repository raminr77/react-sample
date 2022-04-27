import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { SNACKBAR_POSITIONS, SNACKBAR_TYPES } from 'constants/Snackbar';

import 'react-toastify/dist/ReactToastify.css';

const TOAST_COLOR_TYPES = {
  DARK: 'dark',
  LIGHT: 'light',
  COLORED: 'colored'
};

const TOAST_TRANSITION_TYPES = {
  ZOOM: 'zoom',
  FLIP: 'flip',
  SLIDE: 'slide',
  BOUNCE: 'bounce'
};

export const SnackbarWrapper = () => {
  const createSnackBar = (e) => {
    const {
      message,
      icon = null,
      delay = 5000,
      type = SNACKBAR_TYPES.MESSAGE,
      position = SNACKBAR_POSITIONS.BOTTOM_CENTER
    } = e.detail;

    if (type === SNACKBAR_TYPES.MESSAGE) {
      return toast(message, {
        position,
        toastId: message,
        autoClose: delay,
        icon: () => icon,
        theme: TOAST_COLOR_TYPES.DARK,
        transition: TOAST_TRANSITION_TYPES.SLIDE
      });
    }

    toast[type]?.(message, {
      position,
      toastId: message,
      autoClose: delay,
      icon: () => icon,
      theme: TOAST_COLOR_TYPES.COLORED,
      transition: TOAST_TRANSITION_TYPES.FLIP
    });
  };

  useEffect(() => {
    window.addEventListener('GenerateSnackbar', createSnackBar);
    return () => {
      window.removeEventListener('GenerateSnackbar', createSnackBar);
    };
  }, []);

  return <ToastContainer rtl draggable closeOnClick pauseOnHover hideProgressBar />;
};

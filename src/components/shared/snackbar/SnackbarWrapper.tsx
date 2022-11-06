import { ReactNode, useEffect } from 'react';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';

import { SNACKBAR_POSITIONS, SNACKBAR_TYPES } from 'constants/Snackbar';

import 'react-toastify/dist/ReactToastify.min.css';

export type SnackBarType = 'info' | 'error' | 'warn' | 'success' | 'message';

const TOAST_COLOR_TYPES: {
  DARK: 'dark';
  LIGHT: 'light';
  COLORED: 'colored';
} = {
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

interface SnackBarEvent {
  detail: {
    delay?: number;
    message: string;
    type?: SnackBarType;
    icon?: null | ReactNode;
    position?:
      | 'top-left'
      | 'top-right'
      | 'top-center'
      | 'bottom-right'
      | 'bottom-center'
      | 'bottom-left';
  };
}

export function SnackbarWrapper() {
  const createSnackBar = (event: SnackBarEvent) => {
    const {
      icon,
      message,
      delay = 3000,
      type = SNACKBAR_TYPES.MESSAGE,
      position = SNACKBAR_POSITIONS.BOTTOM_CENTER
    } = event.detail;
    const toastId = type + message;

    if (type === SNACKBAR_TYPES.MESSAGE) {
      return toast(message, {
        icon,
        toastId,
        position,
        autoClose: delay,
        theme: TOAST_COLOR_TYPES.DARK,
        transition: TOAST_TRANSITION_TYPES.SLIDE
      });
    }

    toast[type]?.(message, {
      icon,
      toastId,
      position,
      autoClose: delay,
      theme: TOAST_COLOR_TYPES.COLORED,
      transition: TOAST_TRANSITION_TYPES.SLIDE
    });
  };

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    window.addEventListener('GenerateSnackbar', createSnackBar);
    return () => {
      // @ts-ignore: Unreachable code error
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
}

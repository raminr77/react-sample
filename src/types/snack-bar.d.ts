import { ReactNode } from 'react';

export {};

declare global {
  type GSnackBar = 'info' | 'error' | 'warn' | 'success' | 'message';

  interface SnackBarEvent {
    delay?: number;
    message: string;
    type?: GSnackBar;
    icon?: null | ReactNode;
    position?:
      | 'top-left'
      | 'top-right'
      | 'top-center'
      | 'bottom-right'
      | 'bottom-center'
      | 'bottom-left';
  }
}

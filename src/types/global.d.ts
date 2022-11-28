import { ReactNode, PropsWithChildren } from 'react';

export {};

declare global {
  type GID = string | number;
  type GSnackBar = 'info' | 'error' | 'warn' | 'success' | 'message';

  interface GCommonCompnentProperties {
    className?: string;
    style?: CSSProperties;
  }

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

  type GCommonCompnentPropertiesWithChildren =
    PropsWithChildren<GCommonCompnentProperties>;

  type GVoidFunction = () => void;
}

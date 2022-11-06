import {
  ReactNode,
  MouseEvent,
  HTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren
} from 'react';

export {};

declare global {
  type ID = string | number;
  type SnackBarType = 'info' | 'error' | 'warn' | 'success' | 'message';

  interface CommonCompnentProperties {
    className?: string;
    style?: CSSProperties;
  }

  interface SnackBarEvent {
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
  }

  type CommonCompnentPropertiesWithChildren = PropsWithChildren<CommonCompnentProperties>;

  type HEX = `#${string}`;
  type RGB = `rgb(${number}, ${number}, ${number})`;
  type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
  type Color = RGB | RGBA | HEX;

  type MouseOnClickEvent = <Element extends HTMLElement>(
    event: MouseEvent<Element>
  ) => void;

  type HTMLElementAttributes<T extends HTMLElement> = DetailedHTMLProps<
    HTMLAttributes<T>,
    T
  >;

  type VoidFunction = () => void;
}

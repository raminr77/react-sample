import { MouseEvent, DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export {};

declare global {
  type ID = string | number;

  interface CommonCompnentProps {
    className?: string;
    style?: CSSProperties;
  }

  interface CommonCompnentPropsWithChildren
    extends PropsWithChildren<CommonCompnentProps> {}

  type HEX = `#${string}`;
  type RGB = `rgb(${number}, ${number}, ${number})`;
  type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
  type Color = RGB | RGBA | HEX;

  type MouseOnClickEvent = <Element extends HTMLElement>(
    event: MouseEvent<Element>
  ) => void;

  interface HTMLElementAttributes<T extends HTMLElement>
    extends DetailedHTMLProps<HTMLAttributes<T>, T> {}

  type VoidFunction = () => void;
}

import { PropsWithChildren } from 'react';

export {};

declare global {
  type GID = string | number;
  interface GCommonCompnentProperties {
    className?: string;
    style?: CSSProperties;
  }

  type GCommonCompnentPropertiesWithChildren =
    PropsWithChildren<GCommonCompnentProperties>;

  type GVoidFunction = () => void;
}

import type { CSSProperties, PropsWithChildren } from 'react';

export interface CommonComponentProperties {
  className?: string;
  style?: CSSProperties;
}

export type CommonComponentPropertiesWithChildren =
  PropsWithChildren<CommonComponentProperties>;

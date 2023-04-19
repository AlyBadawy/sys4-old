import React from 'react';
import { useFlipper } from '../../hooks/useWindow';

type WithFlipperProps = {
  children: React.ReactNode;
  flipper: string;
};

export const WithFlipper = ({ flipper, children }: WithFlipperProps) => {
  if (!useFlipper(flipper)) {
    return null;
  }

  return <>{children}</>;
};

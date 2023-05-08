import React, { Suspense } from 'react';
import { Loading } from './Loading';

type Props = {
  elm: React.ReactNode
}

export const ElmLoader = ({ elm }: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      {elm}
    </Suspense>
  );
};
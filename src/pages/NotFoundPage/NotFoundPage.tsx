import type { FC } from 'react';
import { ErrorPage } from '../../shared/ui/ErrorPage';

export const NotFoundPage: FC = () => {
  return <ErrorPage code={404} />;
};

export default NotFoundPage;

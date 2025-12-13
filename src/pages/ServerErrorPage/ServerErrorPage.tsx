import type { FC } from 'react';
import { ErrorPage } from '../../shared/ui/ErrorPage';

export const ServerErrorPage: FC = () => {
  return <ErrorPage code={500} />;
};

export default ServerErrorPage;

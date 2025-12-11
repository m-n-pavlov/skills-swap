import type { ReactNode } from 'react';

export type OfferPreviewCardProps = {
  title: string;
  categoryPath: string;
  description: string;
  actions: ReactNode;
  images: string[];
};

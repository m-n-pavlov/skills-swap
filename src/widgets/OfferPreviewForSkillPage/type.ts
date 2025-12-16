export type OfferPreviewData = {
  title: string;
  category: string;
  description: string;
  images: string[];
};

export type OfferPreviewForSkillPageProps = {
  data: OfferPreviewData;
  onExchangeClick: () => void;
  isExchangeDisabled?: boolean;
  isLoading?: boolean;
};

import type { OfferPreviewData } from '../OfferPreviewForSkillPage/type';

export type OfferPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: OfferPreviewData;

  onEdit: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
};

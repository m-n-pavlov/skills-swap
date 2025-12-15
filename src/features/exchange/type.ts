export type TUseExchangeSystem = {
  handleOfferExchange: () => Promise<void>;
  isModalOpen: boolean;
  closeModal: () => void;
  hasOffered: boolean;
  isLoading: boolean;
};

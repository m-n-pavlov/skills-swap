export type TCategory = {
  id: string;
  name: string;
  subCategories: TSubCategories[];
};

export type TSubCategories = {
  id: string;
  name: string;
};

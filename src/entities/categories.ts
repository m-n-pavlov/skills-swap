export type TCategory = {
  id: string;
  name: string;
  image: string;
  subCategory: TSubCategory[];
};

export type TSubCategory = {
  id: string;
  name: string;
};

import { Location } from 'history';

export type TEmptyFunc = () => void;

export type TBurgerItem = {
  _id: string;
  name: string;
  type: "main";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TLocataionState = {
  from?: Location;
  background?: Location;
};

export interface IModal {
  onClose: () => void;
  children: React.ReactNode;

  title?: string;
}

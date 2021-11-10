import { Location } from 'history';
import React from 'react';

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
  pathname?: string;
};

export interface IModal {
  onClose: () => void;
  children: React.ReactNode;

  title?: string;
}

export interface IModalOverlay {
  onClose: () => void;
  children: React.ReactNode;
}

export type THaveToken = string | undefined;
export type THaveUser = boolean | null;

export type TProtectedRoute = {
  exact?: boolean;
  path?: string;
  children?: React.ReactNode;
};

export type TIngridientDetail = {
  _id: string;
  name: string;
  image_large: string;
  carbohydrates: number;
  fat: number;
  proteins: number;
  calories: number;
};

export type TUserInfo = {
  email: string;
  name: string;
  password: string;
};

export type THandleE = (e: any) => void;

export type THandleInput = (e: any) => void;

export type TOrder = {
  orderNumber: number;
};

export type TItemOrder = {
  ingredients: string[];
  _id: string;
  status: 'created' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;

  name?: string;
};

export type TOrdersCount = {
  orders: TItemOrder[];
  total: number;
  totalToday: number;
};

export type TWSOrders = {
  orders: TItemOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};

export type TItemIngridient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  count: number;
};

export type TItemFeed = {
  number: number | null;
  name: string;
  list: string[];
  status: 'created' | 'pending' | 'done';
  data: string;
};

export type TIngridientCard = {
  item: TItemIngridient;
  openIngredient: (i: string) => void;
  key: string;

  children?: React.ReactNode | null;
};

export type TPropsBurgerIngridients = {
  openIngredient: (id: string) => void;
};

export type TBurgerState = {
  top: TItemIngridient;
  main: TItemIngridient[];
};

export type TUserForm = {
  email: string;

  name?: string;
  password?: string;
  token?: string;
};

export type TAuthResponse = {
  success: boolean;

  ok?: boolean;
  status?: number;
  user?: TUserForm;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
};

export type TOrderResponse = {
  success: boolean;

  ok?: boolean;
  status?: number;
  name?: string;
  order?: {
    number: number;
  };
};

export type THistory = {
  pathname?: string;
  state?: Array<THistoryState>;
};

export type THistoryState = {
  path: string;
  url: string;
  title: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

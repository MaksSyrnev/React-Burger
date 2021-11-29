import { TItemIngridient } from '../types/types';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_MAIN: 'ADD_MAIN' = 'ADD_MAIN';
export const DELETE_MAIN_ELEMENT: 'DELETE_MAIN_ELEMENT' = 'DELETE_MAIN_ELEMENT';
export const REORDER_MAIN_ELEMENTS: 'REORDER_MAIN_ELEMENTS' = 'REORDER_MAIN_ELEMENTS';

//Интерфейсы
export interface IAddBun {
  readonly type: typeof ADD_BUN;
  readonly item: TItemIngridient;
}
export interface IAddMain {
  readonly type: typeof ADD_MAIN;
  readonly item: TItemIngridient;
}
export interface IDeleteMainElement {
  readonly type: typeof DELETE_MAIN_ELEMENT;
  readonly payload: Array<TItemIngridient>;
}
export interface IReorderMainElements {
  readonly type: typeof REORDER_MAIN_ELEMENTS;
  readonly payload: Array<TItemIngridient>;
}

export type TBurgerConstructor =
  | IAddBun
  | IAddMain
  | IDeleteMainElement
  | IReorderMainElements;

import { TIngridientModal } from '../types/types';
export const OPEN_ITEM: 'OPEN_ITEM' = 'OPEN_ITEM';
export const CLOSE_ITEM: 'CLOSE_ITEM' = 'CLOSE_ITEM';

export interface IOpenItem {
  readonly type: typeof OPEN_ITEM;
  readonly item: TIngridientModal;
}

export interface ICloseItem {
  readonly type: typeof CLOSE_ITEM;
}

export type TIngridientDetail = IOpenItem | ICloseItem;

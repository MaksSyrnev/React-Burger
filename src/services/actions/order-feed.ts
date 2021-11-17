export const OPEN_ITEM_FEED: 'OPEN_ITEM_FEED' = 'OPEN_ITEM_FEED';
export const CLOSE_ITEM_FEED: 'CLOSE_ITEM_FEED' = 'CLOSE_ITEM_FEED';

export interface IOpenItemFeedAction {
  readonly type: typeof OPEN_ITEM_FEED;
  readonly id: number;
}

export interface ICloseItemFeedAction {
  readonly type: typeof CLOSE_ITEM_FEED;
  readonly id: number;
}

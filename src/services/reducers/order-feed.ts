import {
  OPEN_ITEM_FEED,
  CLOSE_ITEM_FEED,
  TOrderFeed
} from '../actions/order-feed';

export type TOrderStatus = 'created' | 'pending' | 'done' | '';

type TOrderFeedState = {
  number: number | null;
  name: string;
  list: string[] | undefined;
  status: TOrderStatus;
  data: string | null | undefined;
};

const initialState: TOrderFeedState = {
  number: null,
  name: '',
  list: [],
  status: '',
  data: null
};

export const orderFeedReducer = (state = initialState, action: TOrderFeed): TOrderFeedState => {
  switch (action.type) {
    case OPEN_ITEM_FEED: {
      return {
        number: action.item.number,
        name: action.item.name,
        list: action.item.ingredients,
        status: action.item.status,
        data: action.item.createdAt
      };
    }
    case CLOSE_ITEM_FEED: {
      return {
        number: null,
        name: '',
        list: [],
        status: '',
        data: null
      };
    }
    default: {
      return state;
    }
  }
};

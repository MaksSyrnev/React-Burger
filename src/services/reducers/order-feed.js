import {
  OPEN_ITEM_FEED,
  CLOSE_ITEM_FEED
} from '../actions/order-feed';

const initialState = {
  number: null,
  name: '',
  list: [],
  status: '',
  data: null
};

export const orderFeedReducer = (state = initialState, action) => {
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
        number: '',
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

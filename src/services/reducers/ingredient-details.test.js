import { OPEN_ITEM, CLOSE_ITEM } from '../actions/ingredient-details';
import { ingredientDetailsReducer } from './ingredient-details';

const startStateIngridientItem = {
  ingredientDetails: {
    "_id": '',
    "name": '',
    "type": '',
    "proteins": 0,
    "fat": 0,
    "carbohydrates": 0,
    "calories": 0,
    "price": 0,
    "image": '',
    "image_mobile": '',
    "image_large": ''
  }
};

const ingredientExample = {
  "_id": 'rfrf',
  "name": 'Какой то кусок мяса',
  "type": 'main',
  "proteins": 100,
  "fat": 10,
  "carbohydrates": 0,
  "calories": 0,
  "price": 10000,
  "image": 'нет',
  "image_mobile": 'нет',
  "image_large": 'нет'
};

describe('ingredientDetailsReducer', () => {
  it('возвращет начальное состояние детали ингридиента', () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual({
      ingredientDetails: {
        "_id": '',
        "name": '',
        "type": '',
        "proteins": 0,
        "fat": 0,
        "carbohydrates": 0,
        "calories": 0,
        "price": 0,
        "image": '',
        "image_mobile": '',
        "image_large": ''
      }
    });
  });

  it('открытие карточки ингридиента', () => {
    expect(ingredientDetailsReducer(startStateIngridientItem, { type: OPEN_ITEM, item: ingredientExample })).toEqual({
      ingredientDetails: {
        "_id": 'rfrf',
        "name": 'Какой то кусок мяса',
        "type": 'main',
        "proteins": 100,
        "fat": 10,
        "carbohydrates": 0,
        "calories": 0,
        "price": 10000,
        "image": 'нет',
        "image_mobile": 'нет',
        "image_large": 'нет'
      }
    });
  });

  it('закрытие карточки ингридиента', () => {
    expect(ingredientDetailsReducer(startStateIngridientItem, { type: CLOSE_ITEM })
    ).toEqual({
      ingredientDetails: {
        "_id": '',
        "name": '',
        "type": '',
        "proteins": 0,
        "fat": 0,
        "carbohydrates": 0,
        "calories": 0,
        "price": 0,
        "image": '',
        "image_mobile": '',
        "image_large": ''
      }
    });
  });

});

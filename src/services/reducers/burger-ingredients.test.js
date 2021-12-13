import { GET_ITEMS_SUCCESS, ADD_COUNT_INGRIDIENT, DELETE_COUNT_BUN } from '../actions/burger-ingredients';
import { burgerIngredientsReducer } from './burger-ingredients';

const initialStateBurgerIngredients = {
  items: []
};

const itemExample = {
  _id: 'rfrf',
  name: 'какой то ингридиент',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 1,
  price: 1000,
  image: 'none',
  image_mobile: 'none',
  image_large: 'none',
}

const exampleStateBurgerIngredients = {
  items: [
    {
      _id: 'rfrf',
      name: 'какой то ингридиент',
      type: 'bun',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 1,
      price: 1000,
      image: 'none',
      image_mobile: 'none',
      image_large: 'none',
      count: 2,
    }
  ]
};

describe('burgerIngredientsReducer', () => {
  it('возвращет начальное списка ингридиентов', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({ items: [] });
  });

  it('добавляет счетчики колличества полученному списку ингридиентов', () => {
    expect(burgerIngredientsReducer(initialStateBurgerIngredients, { type: GET_ITEMS_SUCCESS, items: [itemExample] })
    ).toEqual({
      items: [
        {
          _id: 'rfrf',
          name: 'какой то ингридиент',
          type: 'bun',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 1,
          price: 1000,
          image: 'none',
          image_mobile: 'none',
          image_large: 'none',
          count: 0,
        }
      ]
    });
  });

  it('обновляет счетчик у ингридиента', () => {
    expect(burgerIngredientsReducer(exampleStateBurgerIngredients, { type: ADD_COUNT_INGRIDIENT, id: 'rfrf', count: 3 })).toEqual({
      items: [
        {
          _id: 'rfrf',
          name: 'какой то ингридиент',
          type: 'bun',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 1,
          price: 1000,
          image: 'none',
          image_mobile: 'none',
          image_large: 'none',
          count: 3,
        }
      ]
    });
  });

  it('удаляет счетчик у булки', () => {
    expect(burgerIngredientsReducer(exampleStateBurgerIngredients, { type: DELETE_COUNT_BUN, id: 'rfrfe' })).toEqual(
      {
        items: [
          {
            _id: 'rfrf',
            name: 'какой то ингридиент',
            type: 'bun',
            proteins: 10,
            fat: 10,
            carbohydrates: 10,
            calories: 1,
            price: 1000,
            image: 'none',
            image_mobile: 'none',
            image_large: 'none',
            count: 0,
          }
        ]
      }
    );
  });

});

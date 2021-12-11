import { ADD_BUN, ADD_MAIN, DELETE_MAIN_ELEMENT, REORDER_MAIN_ELEMENTS } from '../actions/burger-constructor';
import { burgerConstructorReducer } from './burger-constructor';

const initialStateBurgerConstructor = {
  top: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    count: 0
  },
  main: []
};

const testBun = {
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
};

const testMain = {
  _id: 'rf',
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
  count: 1,
};

const testStateBurgerMain = {
  top: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    count: 0
  },
  main: [testBun]
};

const testInitStateBurgerMainReorder = {
  top: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    count: 0
  },
  main: [testBun, testMain]
};


describe('burgerConstructorReducer', () => {
  it('возвращет начальное состояние для конструктора бургера', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual({
      top: {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        count: 0
      },
      main: []
    });
  });

  it('обработчик добавления булки', () => {
    expect(burgerConstructorReducer(initialStateBurgerConstructor, { type: ADD_BUN, item: testBun })).toEqual({
      top: {
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
      },
      main: []
    });
  });

  it('обработчик добавления начинки', () => {
    expect(burgerConstructorReducer(initialStateBurgerConstructor, { type: ADD_MAIN, item: testBun })).toEqual({
      top: {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        count: 0
      },
      main: [
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
    });
  });

  it('обработчик удаления элемента начинки', () => {
    expect(burgerConstructorReducer(testStateBurgerMain, { type: DELETE_MAIN_ELEMENT, payload: [] })
    ).toEqual(initialStateBurgerConstructor);
  });

  it('обработчик изменения порядка элементов начинки', () => {
    expect(burgerConstructorReducer(testInitStateBurgerMainReorder, { type: REORDER_MAIN_ELEMENTS, payload: [testMain, testBun] })
    ).toEqual({
      top: {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        count: 0
      },
      main: [testMain, testBun]
    });
  });

});

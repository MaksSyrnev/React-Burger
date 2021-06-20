import React from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: {
        "_id": "60666c42cc7b410027a1a9b1",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
      },
      main: [
        {
          "_id": "60666c42cc7b410027a1a9b6",
          "name": "Биокотлета из марсианской Магнолии",
          "type": "main",
          "proteins": 420,
          "fat": 142,
          "carbohydrates": 242,
          "calories": 4242,
          "price": 424,
          "image": "https://code.s3.yandex.net/react/code/meat-01.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
          "__v": 0
        },
        {
          "_id": "60666c42cc7b410027a1a9bb",
          "name": "Хрустящие минеральные кольца",
          "type": "main",
          "proteins": 808,
          "fat": 689,
          "carbohydrates": 609,
          "calories": 986,
          "price": 300,
          "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
          "__v": 0
        },
        {
          "_id": "60666c42cc7b410027a1a9b9",
          "name": "Соус традиционный галактический",
          "type": "sauce",
          "proteins": 42,
          "fat": 24,
          "carbohydrates": 42,
          "calories": 99,
          "price": 15,
          "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
          "__v": 0
        },
        {
          "_id": "60666c42cc7b410027a1a9bb",
          "name": "Хрустящие минеральные кольца",
          "type": "main",
          "proteins": 808,
          "fat": 689,
          "carbohydrates": 609,
          "calories": 986,
          "price": 300,
          "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
          "__v": 0
        },
        {
          "_id": "60666c42cc7b410027a1a9bd",
          "name": "Кристаллы марсианских альфа-сахаридов",
          "type": "main",
          "proteins": 234,
          "fat": 432,
          "carbohydrates": 111,
          "calories": 189,
          "price": 762,
          "image": "https://code.s3.yandex.net/react/code/core.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
          "__v": 0
        },
        {
          "_id": "60666c42cc7b410027a1a9bf",
          "name": "Сыр с астероидной плесенью",
          "type": "main",
          "proteins": 84,
          "fat": 48,
          "carbohydrates": 420,
          "calories": 3377,
          "price": 4142,
          "image": "https://code.s3.yandex.net/react/code/cheese.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
          "__v": 0
        }

      ]

    };
  }

  render() {
    return (
      <div className={`${burgerConstructorStyle.box} pl-4 pt-25`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="ml-8 mr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={this.state.top.image}
            />
          </div>

          <ul className={burgerConstructorStyle.list} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {this.state.main.map((item) => (
              <li className={burgerConstructorStyle.list_item} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ))
            }

          </ul>

          <div className="ml-8 mr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={this.state.top.image}
            />
          </div>

        </div>

        <div className={`${burgerConstructorStyle.summary_box} mt-10 mb-10`}>
          <div className={`${burgerConstructorStyle.summary_price} mr-10`}>
            <p className="text text_type_digits-medium">
              610
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>

        </div>
      </div>
    )
  }
}

export default BurgerConstructor;

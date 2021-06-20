import React from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { data } from '../../utils/data';

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'one' };
  }

  render() {
    return (
      <section className={`${burgerIngredientsStyle.box} mr-10`}>
        <h2 className="pb-5 pt-10 text text_type_main-large">Соберите бургер</h2>
        <div style={{ display: 'flex' }} >
          <Tab value="one" active={this.state.current === 'one'} onClick={this.setState}>
            Булки
          </Tab>
          <Tab value="two" active={this.state.current === 'two'} onClick={this.setState}>
            Соусы
          </Tab>
          <Tab value="three" active={this.state.current === 'three'} onClick={this.setState}>
            Начинки
          </Tab>
        </div>

        <div className={burgerIngredientsStyle.ingredients_box}>

          <h3 className="text text_type_main-medium mt-10 pb-6">Булки</h3>
          <ul className={`${burgerIngredientsStyle.product_list}`}>
            {data.map(function (item) {
              if (item.type === "bun") {
                return (
                  <li className={`${burgerIngredientsStyle.product_item} ml-4 pr-2`} key={item._id}>
                    <div className={burgerIngredientsStyle.product_card} >
                      <img src={item.image} alt="изображение продукта" className="pl-4 pr-4" />
                      <div className={`${burgerIngredientsStyle.price} `}>
                        <p className={`pb-1 pt-1 text text_type_digits-default`} >
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className={`${burgerIngredientsStyle.description} text text_type_main-default`}>
                        {item.name}
                      </p>
                      <Counter count={1} size="default" />
                    </div>
                  </li>
                );

              }
            })

            }

          </ul>

          <h3 className="text text_type_main-medium mt-10 pb-6">Соусы</h3>
          <ul className={`${burgerIngredientsStyle.product_list}`}>
            {data.map(function (item) {
              if (item.type === "sauce") {
                return (
                  <li className={`${burgerIngredientsStyle.product_item} ml-4 pr-2`} key={item._id}>
                    <div className={burgerIngredientsStyle.product_card} >
                      <img src={item.image} alt="изображение продукта" className="pl-4 pr-4" />
                      <div className={`${burgerIngredientsStyle.price} `}>
                        <p className={`pb-1 pt-1 text text_type_digits-default`} >
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className={`${burgerIngredientsStyle.description} text text_type_main-default`}>
                        {item.name}
                      </p>
                      <Counter count={1} size="default" />
                    </div>
                  </li>
                );

              }
            })

            }
          </ul>

          <h3 className="text text_type_main-medium mt-10 pb-6">Начинка</h3>
          <ul className={`${burgerIngredientsStyle.product_list}`}>

            {data.map(function (item) {
              if (item.type === "main") {
                return (
                  <li className={`${burgerIngredientsStyle.product_item} ml-4 pr-2`} key={item._id}>
                    <div className={burgerIngredientsStyle.product_card} >
                      <img src={item.image} alt="изображение продукта" className="pl-4 pr-4" />
                      <div className={`${burgerIngredientsStyle.price} `}>
                        <p className={`pb-1 pt-1 text text_type_digits-default`} >
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className={`${burgerIngredientsStyle.description} text text_type_main-default`}>
                        {item.name}
                      </p>
                      <Counter count={1} size="default" />
                    </div>
                  </li>
                );

              }
            })

            }
          </ul>

        </div>

      </section>
    )

  }
}

export default BurgerIngredients;

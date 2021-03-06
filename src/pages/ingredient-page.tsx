import { useState, useCallback, useEffect } from 'react';
import { OPEN_ITEM } from '../services/actions/ingredient-details';
import { useParams } from 'react-router-dom';
import styles from './page.module.css';
import { useDispatch, useSelector } from '../services/types/hooks';
import IngredientDetails from '../components/ingredient-details/ingredient-details'
import { NotFound404 } from './not-found';
import { TItemIngridient } from '../services/types/types';

type TIngridientParam = {
  ingredientId: string;
};

export function IngredientPage() {
  const dispatch = useDispatch();
  const { ingredientId } = useParams<TIngridientParam>();
  const dataIngredients: Array<TItemIngridient> = useSelector(store => store.ingredients.items);
  const [isReal, setIsReal] = useState(false);

  const init = () => {
    const currentIngredients = dataIngredients.filter(
      (item) => item._id === ingredientId
    );

    if (currentIngredients.length > 0) {
      const current = currentIngredients[0];
      dispatch({
        type: OPEN_ITEM,
        item: current
      });
      setIsReal(true);
    }
  };

  useEffect(() => {
    init();
  },
    []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {isReal && <IngredientDetails />}
        {!isReal && <NotFound404 />}

      </div>
    </div>
  );
}

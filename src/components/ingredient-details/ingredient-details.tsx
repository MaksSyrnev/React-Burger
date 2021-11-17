import React from 'react';
import ingredientDetailsStyle from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { TIngridientDetail } from '../../services/types/types';

const IngredientDetails = () => {
  const item: TIngridientDetail = useSelector((store: any) => store.current.ingredientDetails);

  return (
    <div className={`${ingredientDetailsStyle.box}`}>
      <img src={item.image_large} alt={item.name} className="mb-4" />
      <p className={`${ingredientDetailsStyle.title} text text_type_main-medium mb-8`}>{item.name}</p>
      <div className={ingredientDetailsStyle.footer_card}>
        <div className={`${ingredientDetailsStyle.footer_text} mr-5`}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{item.calories}</p>
        </div>
        <div className={`${ingredientDetailsStyle.footer_text} mr-5`}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{item.proteins}</p>
        </div>
        <div className={`${ingredientDetailsStyle.footer_text} mr-5`}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{item.fat}</p>
        </div>
        <div className={ingredientDetailsStyle.footer_text}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </div>

      </div>
    </div>
  );

};

// IngredientDetails.propTypes = {
//   current: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     image_large: PropTypes.string.isRequired,
//     carbohydrates: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     proteins: PropTypes.number.isRequired,
//     calories: PropTypes.number.isRequired,
//   })
// }

export default IngredientDetails;

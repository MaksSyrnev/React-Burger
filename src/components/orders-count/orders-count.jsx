import style from './orders-count.module.css';

export function OrdersCount() {
  return (
    <div className={` ${style.box} pl-15`}>
      <div className={style.box_orders}>
        <div className={`${style.box_list} mr-9`} >
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={`${style.orders_list} ${style.status_ready}`}>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034532</li>
            <li className="text text_type_digits-default">034530</li>
            <li className="text text_type_digits-default">034527</li>
            <li className="text text_type_digits-default">034525</li>
          </ul>
        </div>
        <div className={style.box_list}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={style.orders_list}>
            <li className="text text_type_digits-default">034538</li>
            <li className="text text_type_digits-default">034541</li>
            <li className="text text_type_digits-default">034542</li>
          </ul>
        </div>
      </div>

      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">28752</p>
      </div>

      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">138</p>
      </div>
    </div>

  );
}
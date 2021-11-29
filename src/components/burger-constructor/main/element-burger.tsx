//import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import elementBurgerStyle from './element-burger.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TItemIngridient } from '../../../services/types/types';


type TElementBurger = {
  item: TItemIngridient;
  index: number;
  id: string;
  moveElementBurger: (dragIndex: number, hoverIndex: number) => void;
  deleteElementBurger: (index: number, id: string) => void;
};

function ElementBurger(props: TElementBurger) {
  const { item, index, id, moveElementBurger, deleteElementBurger } = props;
  const ref = useRef<HTMLLIElement>(null);

  const [, dropRef] = useDrop({
    accept: 'main',
    hover(item: { index: number }, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveElementBurger(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'main',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity: number = isDragging ? 0 : 1;

  dragRef(dropRef(ref));

  return (
    <li className={elementBurgerStyle.list_item} style={{ opacity }} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteElementBurger(index, id)}
      />
    </li>
  );
}

// ElementBurger.propTypes = {
//   item: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//   }),
//   index: PropTypes.number.isRequired,
//   id: PropTypes.string.isRequired,
//   moveElementBurger: PropTypes.func.isRequired,
//   deleteElementBurger: PropTypes.func.isRequired
// };

export default ElementBurger;

import React from 'react';
import './styles/card.scss';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { getDateTimeString } from '../utils/utilities';
import { ItemTypes } from '../constants/Itemtypes';

export const Card = ({ card, id, deleteCard }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { type: ItemTypes.CARD, ...card, id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
  );

  const deleteTask = () => {
    deleteCard(card.id);
  };

  return (
    <div
      className="card"
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <div className="heading">
        <p>{card.title}</p>
        <button type="button" onClick={deleteTask}>X</button>
      </div>
      <div>
        <div className="details">
          <p>{card.description}</p>
          <p>{getDateTimeString(card.date)}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

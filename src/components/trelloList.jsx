import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { Card } from "./card";
import { AddCardModal } from "../modals/addCardModal";
import "./styles/trelloList.scss";
import { TrelloConstants } from "../constants/trelloConstants";
import { ItemTypes } from "../constants/Itemtypes";

export const TrelloList = ({ list, id, updateTrelloList }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const deleteCard = (cardId) => {
    setIsOpenModal(false);
    updateTrelloList({
      type: TrelloConstants.DELETE_CARD,
      currListId: list.id,
      cardId,
    });
  };

  const addNewCard = (title, description) => {
    updateTrelloList({
      type: TrelloConstants.ADD_CARD,
      currListId: list.id,
      title,
      description,
    });
  };

  const deleteList = () => {
    updateTrelloList({
      type: TrelloConstants.DELETE_LIST,
      currListId: list.id,
    });
  };

  const moveItem = (draggedCard, targetListId) => {
    updateTrelloList({
      type: TrelloConstants.MOVE_CARD,
      draggedCard,
      targetListId,
    });
  };

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      const hoverId = id;
      moveItem(item, hoverId);
    },
  });

  return (
    <>
      <div className="list" ref={drop}>
        <div className="listHeading">
          <p>{list.title}</p>
          <button type="button" onClick={deleteList}>
            X
          </button>
        </div>
        <div className="cardContainer">
          {list.cards.map((card, index) => (
            <Card
              key={`card${index}`}
              card={card}
              id={card?.id}
              deleteCard={deleteCard}
            />
          ))}
        </div>
        <div
          className="addCard"
          onClick={() => setIsOpenModal(true)}
          aria-hidden="true"
        >
          +
        </div>
      </div>
      <div className="cardModalContainer">
        <AddCardModal
          addNewCard={addNewCard}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </div>
    </>
  );
};

TrelloList.propTypes = {
  list: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  updateTrelloList: PropTypes.func.isRequired,
};

import { useState } from "react";
import { Card } from "./card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddCardModal } from "../modals/addCardModal";
import "./styles/trelloList.scss";
import { TrelloConstants } from "../constants/trelloConstants";
export const TrelloList = ({ list, index, updateTrelloList }) => {
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

  return (
    <>
      <div className="list">
        <div className="listHeading">
          <p>{list.title}</p>
          <button onClick={deleteList}>X</button>
        </div>
        <div className="cardContainer">
          <DndProvider backend={HTML5Backend}>
            {list.cards.map((card, index) => {
              return (
                <Card
                  key={`card${index}`}
                  card={card}
                  deleteCard={deleteCard}
                />
              );
            })}
          </DndProvider>
        </div>
        <div className="addCard" onClick={() => setIsOpenModal(true)}>
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

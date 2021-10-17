import React, { useEffect, useState } from "react";
import { TrelloList } from "./trelloList";
import { fetchData, sortListOntime } from "../utils/utilities";
import { size } from "../data/dummyData";
import "./styles/trelloContainer.scss";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { AddListModal } from "../modals/addListModal";
import { TrelloConstants } from "../constants/trelloConstants";

const TrelloContainer = () => {
  const [trelloList, setTrelloList] = useLocalStorage("trelloList", []);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [nextCardId, setNextCardId] = useLocalStorage("cardId", size.cardId);
  const [nextListId, setNextListId] = useLocalStorage("listId", size.listId);

  const updateTrelloList = (params) => {
    const {
      type,
      currListId,
      title,
      description,
      cardId,
      targetListId,
      draggedCard,
    } = params;
    switch (type) {
      case TrelloConstants.ADD_LIST:
        setTrelloList([...trelloList, { id: nextListId, title, cards: [] }]);
        setNextListId(nextListId + 1);
        break;
      case TrelloConstants.DELETE_LIST:
        setTrelloList(trelloList.filter((item) => item.id !== currListId));
        break;
      case TrelloConstants.ADD_CARD:
        {
          const card = {
            id: nextCardId,
            title,
            description,
            date: `${new Date()}`,
          };
          const updatedList = [...trelloList];
          updatedList.some((list) => {
            if (list.id === currListId) {
              list.cards.push(card);
              return true;
            }
            return false;
          });
          setNextCardId(nextCardId + 1);
          setTrelloList(updatedList);
        }
        break;
      case TrelloConstants.DELETE_CARD:
        {
          let deletedList = [...trelloList];
          deletedList.some((list) => {
            if (list.id === currListId) {
              list.cards = list.cards.filter((card) => card.id !== cardId);
              return true;
            }
            return false;
          });
          deletedList = deletedList.filter((list) => list.cards.length > 0);
          setTrelloList(deletedList);
        }

        break;
      case TrelloConstants.MOVE_CARD:
        {
          let addedCardList = [...trelloList];
          addedCardList.forEach((list) => {
            list.cards.forEach((card) => {
              const newCards = [...list.cards];
              let filteredCards = [];
              if (card.id === draggedCard.id) {
                filteredCards = newCards.filter(
                  (newCard) => newCard.id !== draggedCard.id
                );
                list.cards = filteredCards;
              } else list.cards = newCards;
            });
          });
          addedCardList.forEach((list) => {
            if (list.id === targetListId) {
              list.cards.push(draggedCard);
            }
          });
          addedCardList = addedCardList.filter((list) => list.cards.length > 0);
          setTrelloList(
            sortListOntime(
              addedCardList,
              TrelloConstants.SORT_BY_REV_CREATION_TIME
            )
          );
        }
        break;
      default:
    }
  };

  const addNewList = (title) => {
    updateTrelloList({ type: TrelloConstants.ADD_LIST, title });
  };

  useEffect(() => {
    try {
      const getTrelloData = async () => {
        const data = await fetchData();
        setTrelloList(
          sortListOntime(data, TrelloConstants.SORT_BY_CREATION_TIME)
        );
      };
      if (!JSON.parse(window.localStorage.getItem("trelloList")).length) {
        getTrelloData();
      }
    } catch (e) {
      setTrelloList([]);
    }
  }, []);

  return (
    <div className="trelloContainer">
      <div className="boardHeading">
        <p className="heading">Trello Board</p>
        <div className="btnActions">
          <button
            type="button"
            className="addList"
            onClick={() => setIsOpenModal(true)}
          >
            + Add List
          </button>
        </div>
      </div>
      <div className="listContainer">
        {trelloList.length > 0 ? (
          trelloList?.map((item) => (
            <TrelloList
              key={`list${item.id}`}
              list={item}
              id={item.id}
              updateTrelloList={updateTrelloList}
            />
          ))
        ) : (
          <div className="error"> No Lists found. Click on Add List to continue</div>
        )}
      </div>
      <div className="listModalContainer">
        <AddListModal
          addNewList={addNewList}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </div>
    </div>
  );
};
export default TrelloContainer;

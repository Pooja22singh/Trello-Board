import React, { useEffect, useState } from "react";
import { TrelloList } from "./trelloList";
import { fetchData } from "../utils/utilities";
import "./styles/trelloContainer.scss";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { AddListModal } from "../modals/addListModal";
import { TrelloConstants } from "../constants/trelloConstants";

const TrelloContainer = () => {
  const [trelloList, setTrelloList] = useLocalStorage("trelloList", []);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const updateTrelloList = (params) => {
    const { type, currListId, title, description, cardId } = params;
    switch (type) {
      case TrelloConstants.ADD_LIST:
        setTrelloList([...trelloList, { id: "6", title, cards: [] }]);
        break;
      case TrelloConstants.DELETE_LIST:
        setTrelloList(
          trelloList.filter((item) => Number(item.id) !== Number(currListId))
        );
        break;
      case TrelloConstants.ADD_CARD:
        const card = {
          id: "20",
          title,
          description,
          date: new Date()+"",
        };
        const updatedList = [...trelloList];
        updatedList.some((list) => {
          if (Number(list.id) === Number(currListId)) {
            list.cards.push(card);
            return true;
          }
          return false;
        });
        console.log("hhh", updatedList);
        setTrelloList(updatedList);
        break;
      case TrelloConstants.DELETE_CARD:
        const deletedList = [...trelloList];
        deletedList.some((list) => {
          if (list.id === currListId) {
            list.cards = list.cards.filter((card) => Number(card.id) !== Number(cardId));
            return true;
          }
          return false;
        });
        setTrelloList(deletedList);
        break;
      default:
        return;
    }
  };

  const addNewList = (title) => {
    updateTrelloList({ type: TrelloConstants.ADD_LIST, title });
  };

  useEffect(() => {
    try {
      const getTrelloData = async () => {
        const data = await fetchData();
        setTrelloList(data);
      };
      if (!JSON.parse(window.localStorage.getItem("trelloList")).length)
        getTrelloData();
    } catch (e) {
      setTrelloList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="trelloContainer">
      <div className="boardHeading">
        <p className="heading">Trello Board</p>
        <div className="btnActions">
          <button className="addList" onClick={() => setIsOpenModal(true)}>
            + Add List
          </button>
        </div>
      </div>
      <div className="listContainer">
        {trelloList?.map((item, index) => {
          return (
            <TrelloList
              key={`list${index}`}
              list={item}
              index={index}
              updateTrelloList={updateTrelloList}
            />
          );
        })}
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

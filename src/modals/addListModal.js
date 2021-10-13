import Modal from "react-modal";
import { useEffect, useState } from "react";
import "./styles/listModal.scss";

export const AddListModal = ({ addNewList, isOpenModal, setIsOpenModal }) => {
  const [title, setTitle] = useState("");

  const addList = () => {
    setIsOpenModal(false);
    addNewList(title);
  };

  useEffect(() => {
    setTitle("");
  },[isOpenModal]);

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={setIsOpenModal}
      contentLabel="My dialog"
      className="listModal"
    >
      <div className="listModalContainer">
        <div className="modalHeader">
          <div>Add List</div>
          <button onClick={() => setIsOpenModal(false)}>X</button>
        </div>
        <div className="listModalForm">
          <form>
            <div className="listTitle">
              <p>Title: </p>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <button type="button" onClick={addList}>
              Add
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

import { useState } from "react";
import Modal from "react-modal";
import "./styles/cardModal.scss";
export const AddCardModal = ({ addNewCard, isOpenModal, setIsOpenModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    setIsOpenModal(false);
    addNewCard(title, description);
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={setIsOpenModal}
      contentLabel="My dialog"
      className="cardModal"
    >
      <div className="cardModalContainer">
        <div className="modalHeader">
          <div>Add Task</div>
          <button
            onClick={() => {
              setTitle("");
              setDescription("");
              setIsOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="cardModalForm">
          <form>
            <div>
              <p>Title: </p>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div>
              <p>Description: </p>
              <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <button type="button" onClick={addTask}>Add</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

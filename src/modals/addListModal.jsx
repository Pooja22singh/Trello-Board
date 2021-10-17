import Modal from "react-modal";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "./styles/listModal.scss";

export const AddListModal = ({ addNewList, isOpenModal, setIsOpenModal }) => {
  const [title, setTitle] = useState("");
  
  const addList = () => {
    if (title) {
      setIsOpenModal(false);
      addNewList(title);
    }
    else alert("Kindly add a title!");
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) addList();
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    setTitle("");
  }, [isOpenModal]);

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
          <button type="button" onClick={() => setIsOpenModal(false)}>
            X
          </button>
        </div>
        <div className="listModalForm">
          <form onSubmit={(event)=> event.preventDefault()}>
            <div className="listTitle">
              <p>Title: </p>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyUp={(e)=> handleEnter(e)}
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

AddListModal.propTypes = {
  addNewList: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};

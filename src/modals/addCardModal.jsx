import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './styles/cardModal.scss';

export const AddCardModal = ({ addNewCard, isOpenModal, setIsOpenModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = () => {
    if (title && description) {
      setIsOpenModal(false);
      addNewCard(title, description);
    }
    else alert("Kindly add a title and a description !");
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) addTask();
  };

  useEffect(() => {
    setTitle('');
    setDescription('');
    Modal.setAppElement('body');
  }, []);

  useEffect(() => {
    setTitle('');
    setDescription('');
  }, [isOpenModal]);

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
            type="button"
            onClick={() => {
              setTitle('');
              setDescription('');
              setIsOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="cardModalForm">
        <form onSubmit={(event)=> event.preventDefault()}>
            <div>
              <p>Title: </p>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyUp={(e)=> handleEnter(e)}
              />
            </div>
            <div>
              <p>Description: </p>
              <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                onKeyUp={(e)=> handleEnter(e)}
              />
            </div>
            <button type="button" onClick={addTask}>
              Add
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

AddCardModal.propTypes = {
  addNewCard: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};

import "./styles/card.scss";

export const Card = ({ card, deleteCard }) => {
  const deleteTask = () => {
    deleteCard(card.id);
  };

  return (
    <div className="card">
      <div className="heading">
        <p>{card.title}</p>
        <button onClick={deleteTask}>X</button>
      </div>
      <div>
        <div className="details">
          <p>{card.description}</p>
          <p>{card.date}</p>
        </div>
      </div>
    </div>
  );
};

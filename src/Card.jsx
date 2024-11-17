function Card({ card, listId, index }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("sourceListId", listId);
    e.dataTransfer.setData("sourceIndex", index);
  };

  return (
    <div
      className="card"
      draggable
      data-index={index}
      onDragStart={handleDragStart}
    >
      {card.content}
    </div>
  );
}

export default Card;

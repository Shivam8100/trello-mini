import Card from "./Card";

function List({ list, lists, setLists, moveCard }) {
  const addCard = () => {
    const content = prompt("Enter card content:");
    if (content) {
      const newCard = { id: `card-${Date.now()}`, content };
      setLists(
        lists.map((l) =>
          l.id === list.id ? { ...l, cards: [...l.cards, newCard] } : l
        )
      );
    }
  };

  const deleteList = () => {
    if (window.confirm(`Delete list "${list.title}"?`)) {
      setLists(lists.filter((l) => l.id !== list.id));
    }
  };

  return (
    <div
      className="list"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const cardId = e.dataTransfer.getData("cardId");
        const sourceListId = e.dataTransfer.getData("sourceListId");
        const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"), 10);
        const destIndex = e.target.closest(".card")?.getAttribute("data-index");
        moveCard(
          sourceListId,
          sourceIndex,
          list.id,
          destIndex ? parseInt(destIndex, 10) : list.cards.length
        );
      }}
    >
      <h3>
        {list.title} <button onClick={deleteList}>Delete List</button>
      </h3>
      <button onClick={addCard}>Add Card</button>
      <div className="card-list">
        {list.cards.map((card, index) => (
          <Card key={card.id} card={card} listId={list.id} index={index} />
        ))}
      </div>
    </div>
  );
}

export default List;

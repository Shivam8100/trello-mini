import { useState } from "react";
import List from "./List";
import "./App.css";

function App() {
  const [lists, setLists] = useState([
    {
      id: "list-1",
      title: "To Do",
      cards: [{ id: "card-1", content: "Sample task" }],
    },
  ]);

  const addList = () => {
    const title = prompt("Enter list name:");
    if (title) {
      setLists([...lists, { id: `list-${Date.now()}`, title, cards: [] }]);
    }
  };

  const moveCard = (sourceListId, sourceIndex, destListId, destIndex) => {
    if (sourceListId === destListId) {
      // Rearrange within the same list
      const list = lists.find((l) => l.id === sourceListId);
      const reorderedCards = Array.from(list.cards);
      const [movedCard] = reorderedCards.splice(sourceIndex, 1);
      reorderedCards.splice(destIndex, 0, movedCard);

      setLists(
        lists.map((l) =>
          l.id === list.id ? { ...l, cards: reorderedCards } : l
        )
      );
    } else {
      // Move between different lists
      const sourceList = lists.find((l) => l.id === sourceListId);
      const destList = lists.find((l) => l.id === destListId);
      const sourceCards = Array.from(sourceList.cards);
      const destCards = Array.from(destList.cards);
      const [movedCard] = sourceCards.splice(sourceIndex, 1);
      destCards.splice(destIndex, 0, movedCard);

      setLists(
        lists.map((l) =>
          l.id === sourceListId
            ? { ...l, cards: sourceCards }
            : l.id === destListId
            ? { ...l, cards: destCards }
            : l
        )
      );
    }
  };

  return (
    <div className="App">
      <button onClick={addList}>Add List</button>
      <div className="lists-container">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            setLists={setLists}
            lists={lists}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

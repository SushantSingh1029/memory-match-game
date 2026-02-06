import { useEffect, useState } from "react";
import "./MemoryMatchGame.css";
const EMOJIS = ["🎮", "🎨", "🎭", "🎪", "🎯", "🎲", "🎸", "🎺"];

export default function MemoryMatchGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
      }));

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  function handleClick(card) {
    if (
      flipped.length === 2 ||
      flipped.includes(card) ||
      matched.includes(card.emoji)
    ) {
      return;
    }

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      if (newFlipped[0].emoji === newFlipped[1].emoji) {
        setMatched([...matched, card.emoji]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }

  function isFlipped(card) {
    return flipped.includes(card) || matched.includes(card.emoji);
  }

  return (
    <div className="game">
      <h1>Memory Match</h1>
      <p>Find all the matching pairs!</p>

      <button onClick={startGame}>New Game</button>

      <p>Moves: {moves}</p>
      <p>Matched: {matched.length} / {EMOJIS.length}</p>

      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => handleClick(card)}
          >
            {isFlipped(card) ? card.emoji : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}

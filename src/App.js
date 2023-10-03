import WordsArea from "./components/WordsArea"
import WordHolder from "./components/WordHolder";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

const data = ["cat", "dog", "rat", "mouse", "blouse", "blood"]

function App() {
  return (
    <div className="App">
      <h1 className="heading">Word Alchemy</h1>
      <div className="gameArea">
        <div className="wordSum">
          <WordHolder />
          <p>+</p>
          <WordHolder />
          <p>=</p>
          <WordHolder />
        </div>
        <WordsArea
        words = {data.join(" ")} />

      </div>
    </div>
  );
}

export default App;

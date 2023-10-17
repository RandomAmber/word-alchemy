import { useState, useEffect } from "react"
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

const data = [
  [{
    id: "1",
    content: "cat",
    concats: ["catrat", "catblood"],
    translation: "кошка"
  },
  {
    id: "2",
    content: "dog",
    concats: ["dograt", "dogblood"],
    translation: "собака"
  },
  {
    id: "3",
    content: "rat",
    concats: ["ratblood"]
  },
  {
    id: "4",
    content: "mouse",
    concats: ["mouseblouse"]
  },
  {
    id: "5",
    content: "blouse",
    concats: []
  },
  {
    id: "6",
    content: "blood",
    concats: []
  }],
  [{
    id: "7",
    content: "mat",
    concats: ["matbed", "matled"]
  },
  {
    id: "8",
    content: "bed",
    concats: ["bedled", "bedlet"]
  },
  {
    id: "9",
    content: "let",
    concats: ["bedlet", "redlet"]
  },
  {
    id: "10",
    content: "led",
    concats: ["matbed"]
  },
  {
    id: "11",
    content: "red",
    concats: ["redlet"]
  },
  {
    id: "12",
    content: "ted",
    concats: ["tedred", "tedlet"]
  }]
  
]

//Select a random data list


const randomIndex = Math.floor(Math.random() * data.length);
const randomData = data[randomIndex];

const WordHolders = {
  WordHolder1: {
    name: "WordHolder1",
    style: "WordHolder1",
    items: []
  },
  WordHolder2: {
    name: "WordHolder2",
    style: "WordHolder2",
    items: []
  },
  WordArea: {
    name: "WordArea",
    style: "WordArea",
    items: randomData
  }
}





const onDragEnd = (result, areas, setAreas) => {
  if (!result.destination) return;
  const { source, destination } = result;

  const sourceArea = areas[source.droppableId];
  const destArea = areas[destination.droppableId];
  const sourceItems = [...sourceArea.items];
  const destItems = [...destArea.items];
  const [removed] = sourceItems.splice(source.index, 1);

  if (
    (destination.droppableId === "WordHolder1" ||
      destination.droppableId === "WordHolder2") &&
    destItems.length === 1
  ) {
    // If destination is a WordHolder and already contains an item, swap items
    sourceItems.splice(source.index, 0, destItems[0]);
    destItems[0] = removed;
  } else {
    // Otherwise, add item to the destination normally
    destItems.splice(destination.index, 0, removed);
  }

  setAreas({
    ...areas,
    [source.droppableId]: {
      ...sourceArea,
      items: sourceItems, // Update source items
    },
    [destination.droppableId]: {
      ...destArea,
      items: destItems, // Update destination items
    },
  });
};





const wordsPerRow = 4



function App() {
  const [areas, setAreas] = useState(WordHolders);

  const [combinedWord, setCombinedWord] = useState("");
  const [matchesConcats, setMatchesConcats] = useState(false);
  const [score, setScore] = useState(0);
  const [dictionary, setDictionary] = useState([]);

  

  //clearWordHolders button
  const clearWordHolders = () => {
    setAreas({
      ...areas,
      WordHolder1: {
        ...areas.WordHolder1,
        items: [], // Clear WordHolder1
      },
      WordHolder2: {
        ...areas.WordHolder2,
        items: [], // Clear WordHolder2
      },
    });
  };






  const concatenateWords = () => {
    if (areas.WordHolder1.items.length === 1 && areas.WordHolder2.items.length === 1) {
      const item1 = areas.WordHolder1.items.map((item) => item.content)
      const item2 = areas.WordHolder2.items.map((item) => item.content)
      const combined = item1.join("") + item2.join("")
      setCombinedWord(combined)

      const matches = randomData.some((word) => word.concats.includes(combined))
      setMatchesConcats(matches)

      if (matches) {
        if (!dictionary.includes(combined)) {
          setScore((prevScore) => prevScore + 1);
          setDictionary((prevDictionary) => [...prevDictionary, combined]);
        }



      }


      return combined
    }
    setCombinedWord("") //reset the combinedWord
    setMatchesConcats(false) //reset matchesConcats
    return ""
  }

  useEffect(() => {
    concatenateWords();
  }, [areas.WordHolder1.items, areas.WordHolder2.items])




  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Word Alchemy</h1>
      <div className="gameContainer"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>

        <div className="gameArea"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, areas, setAreas)}>
            <div className="gameText"
              style={{

                textAlign: "center"
              }}>
              {matchesConcats && <p>Such word exists! Press the button to make a new one:</p>
                && <button onClick={clearWordHolders}>Clear WordHolders</button>
              }
              {/* /* Check if WordArea is empty */}
              {areas.WordArea.items.length === 0 && (
                <button onClick={() => window.location.reload()}>Reload Page</button>
              )}


            </div>


            <div className="wordHolders"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {/* Render WordHolder1 */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>{areas.WordHolder1.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId="WordHolder1">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          minHeight: 100,
                          background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                          padding: 4,
                          width: 250,
                        }}
                      >
                        {areas.WordHolder1.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: 16,
                                  margin: "0 0 8px 0",
                                  minHeight: "50px",
                                  color: "white",
                                  backgroundColor: snapshot.isDragging
                                    ? "#263B4A"
                                    : "#456C86",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>

              <p>+</p>

              {/* Render WordHolder2 */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>{areas.WordHolder2.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId="WordHolder2">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          minHeight: 100,
                          background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                          padding: 4,
                          width: 250,
                        }}
                      >
                        {areas.WordHolder2.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: 16,
                                  margin: "0 0 8px 0",
                                  minHeight: "50px",
                                  color: "white",
                                  backgroundColor: snapshot.isDragging
                                    ? "#263B4A"
                                    : "#456C86",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>


                </div>


              </div>

              <p>=</p>
              {/* answerholder  */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 8,
              }}>
                <h2>AnswerHolder</h2>
                <div style={{
                  minHeight: 100,
                  background: "lightblue",
                  padding: 4,
                  width: 250,
                }}
                >
                  {combinedWord}
                </div>

              </div>


            </div>
            {/* Render WordArea */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2>{areas.WordArea.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId="WordArea">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                        padding: 4,
                        maxWidth: "500px", // Adjust the width as needed
                        // Set a maximum height for the WordArea to limit the number of rows
                        minHeight: "300px", // Adjust the height as needed
                        overflowY: "auto", // Enable vertical scrolling if needed
                        display: "flex",
                        flexWrap: "wrap", // Allow words to wrap to the next row
                        justifyContent: "flex-start", // Center the words horizontally
                      }}
                    >
                      {areas.WordArea.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: "16px",
                                margin: "0 8px 8px 0", // Add margin between words
                                minWidth: "100px", // Adjust the minimum width as needed
                                maxHeight: "20px",
                                color: "white",
                                backgroundColor: "pink",
                                backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                                ...provided.draggableProps.style,
                              }}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>

        </div>
        <div className="scoreDict"
          style={{
            margin: "8px",
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start"

          }}>
          <div className="score"
            style={{
              background: "lightpink",
              display: "flex",
              justifyContent: "center",
              padding: 10,

            }}>
            <p>Your score: </p>
            <p>{score}</p>


          </div>
          <div className="dict"
            style={{
              background: "lightpink",
              padding: 4,
              display: "flex",
              flexDirection: "column",
            }}><p>Words you coined:</p>
            <ul>
              {dictionary.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>





    </div>
  );
}

export default App;

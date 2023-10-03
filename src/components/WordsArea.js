import PropTypes from "prop-types"
import { Draggable, Droppable } from "react-beautiful-dnd"


const WordsArea = ({ words }) => {
    const wordArray = words.split(" ");

    return (
        <div className="wordsArea">
            {wordArray.map((word, index) => (
                <div key={index} className="word-box">
                    {word}
                    </div>

            ))}
                
        </div>
    )
}

WordsArea.propTypes = {
    words: PropTypes.array,
}

export default WordsArea

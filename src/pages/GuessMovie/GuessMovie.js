import { guessMessages } from "../../constants/defaultMessages";
import "./GuessMovie.css";

export const GuessMoviePage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [messages, setMessages] = useState(guessMessages);
  
  return (
    <div className="guess">
      <div className="guess-container">
        <div className="guess-header">
          <div className="guess-back"></div>
          <div className="guess-label">
            <p>Guess movie</p>
          </div>
          <div className="guess-empty"></div>
        </div>
        <div className="guess-main">
          <ul className="guess-main-list">
            <li className="guess-main-item">
              <p>Text</p>
            </li>
            <li className="guess-main-item">
              <p>Text</p>
            </li>
          </ul>
        </div>
        <div className="guess-actions">
          <div className="guess-action">
            <p>Yes</p>
          </div>
          <div className="guess-action">
            <p>No</p>
          </div>
          <div className="guess-action">
            <p>Maybe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

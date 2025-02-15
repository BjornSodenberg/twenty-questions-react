import "./GuessMovie.css";
import React, {useState} from "react";
import {guessMessages, suggestMessages} from "../../constants/defaultMessages";
import {useNavigate} from "react-router-dom";
import {postAnswer, postQuestion} from "../../services/api";

export const GuessMoviePage = () => {
  const [secret, setSecret] = useState('');
  const [messages, setMessages] = useState(guessMessages);
  const [wait , setWait] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const sendMessage = (text, isMine) => {
    const msg = {
      id: `${isMine ? "u-" : "x-"}${Date.now()}`,
      msg: text,
      isMine: isMine,
    };
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const handleSubmit = async (answer) => {
    try {
      // Отправляем вопрос в чат
      sendMessage(answer, true);

      // Устанавливаем состояние ожидания
      setWait(true);

      // Отправляем запрос на сервер
      const { question, sessionId: newSessionId, isFinalGuess } = await postAnswer(answer, secret || '');

      // Обрабатываем ответ сервера
      handleAnswerResponse(question, newSessionId, isFinalGuess);
    } catch (error) {
      // Логируем ошибку
      console.error("Error posting answer:", error);
    } finally {
      // Снимаем состояние ожидания
      setWait(false);
    }
  };

  const handleAnswerResponse = (question, newSessionId, isFinalGuess) => {
    if (isFinalGuess) {
      setShowModal(true);
    }

    if ((!secret && newSessionId) || newSessionId !== secret) {
      setSecret(newSessionId);
    }

    sendMessage(question, false);
  };

  const exitGame = () => {
    setShowModal(false);
    navigate(-2);
  };

  return (
      <div className="guess">
        <div className="guess-container">
          <div className="guess-header">
            <div className="guess-back" onClick={() => navigate(-2)}>
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.34347 12L10.4145 19.071L9.00047 20.485L1.22247 12.707C1.035 12.5195 0.929688 12.2652 0.929688 12C0.929687 11.7349 1.035 11.4805 1.22247 11.293L9.00047 3.51501L10.4145 4.92901L3.34347 12Z" fill="white"/>
              </svg>
            </div>
            <div className="guess-label">
              <p>Guess movie</p>
            </div>
            <div className="guess-empty">

            </div>
          </div>
          <div className="guess-main">
            <ul className="guess-main-list">
              {messages.map((message) => (
                  <li
                      key={message.id}
                      className={`guess-main-item ${
                          message.isMine ? "my-message" : "other-message"
                      }`}
                  >
                    <p>{message.msg}</p>
                  </li>
              ))}
            </ul>
          </div>
          <div className="guess-actions">
            <div className="guess-action" onClick={() => handleSubmit('yes')}>
              <p>Yes</p>
            </div>
            <div className="guess-action" onClick={() => handleSubmit('no')}>
              <p>No</p>
            </div>
            <div className="guess-action" onClick={() => handleSubmit('maybe')}>
              <p>Maybe</p>
            </div>
          </div>
        </div>

        {/* Модальное окно */}
        {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Game Over</h2>
                <p>Would you like to play again?</p>
                <div className="actions">
                  <button className="modal-close" onClick={exitGame}>
                    Yes
                  </button>
                  <button className="modal-exit" onClick={exitGame}>
                    No
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

import React, {useRef, useState} from "react";
import {postQuestion} from "../../services/api";
import { suggestMessages } from "../../constants/defaultMessages";
import "./SuggestMovie.css";
import {useNavigate} from "react-router-dom";

export const SuggestMoviePage = () => {
  const [question, setQuestion] = useState("");
  const [secret, setSecret] = useState('');
  const [messages, setMessages] = useState(suggestMessages);
  const [moves, setMoves] = useState(20);
  const [wait , setWait] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Создаем ref для доступа к ul
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  // Функция для прокрутки до конца списка
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const sendMessage = (text, isMine) => {
    const msg = {
      id: `${isMine ? "u-" : "x-"}${Date.now()}`,
      msg: text,
      isMine: isMine,
    };
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMoves((prevMoves) => prevMoves - 1);
    scrollToBottom();
  };

  const handleSubmit = async () => {
    try {
      // Отправляем вопрос в чат
      sendMessage(question, true);

      // Устанавливаем состояние ожидания
      setWait(true);

      // Отправляем запрос на сервер
      const { answer, secret: newSecret } = await postQuestion(question, secret || '');

      // Обрабатываем ответ сервера
      handleAnswerResponse(answer, newSecret);

      // Сбрасываем поле ввода
      setQuestion("");
    } catch (error) {
      // Логируем ошибку
      console.error("Error posting answer:", error);
    } finally {
      // Снимаем состояние ожидания
      setWait(false);
    }
  };

  // Вспомогательная функция для обработки ответа сервера
  const handleAnswerResponse = (answer, newSecret) => {
    if (answer === 'win' && moves > 0) {
      // Показываем модальное окно при победе
      setShowModal(true);
    } else if ((answer !== 'win' && moves < 0) || (answer === 'win' && moves < 0)) {
      // Показываем модальное окно при проигрыше или недостатке ходов
      setShowModal(true);
      setMoves(-1); // Устанавливаем флаг конца игры
    }

    // Обновляем секрет, если он пришел с сервера
    if ((!secret && newSecret) || newSecret !== secret) {
      setSecret(newSecret);
    }

    // Отправляем ответ в чат
    sendMessage(answer, false);
  };

  const exitGame = () => {
    setShowModal(false);
    navigate(-2);
  };

  return (
    <div className="suggest">
      <div className="suggest-container">
        <div className="suggest-header">
          <div className="suggest-back" onClick={() => navigate(-2)}>
            <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.34347 12L10.4145 19.071L9.00047 20.485L1.22247 12.707C1.035 12.5195 0.929688 12.2652 0.929688 12C0.929687 11.7349 1.035 11.4805 1.22247 11.293L9.00047 3.51501L10.4145 4.92901L3.34347 12Z" fill="white"/>
            </svg>
          </div>
          <div className="suggest-label">
            <p>Suggest movie</p>
          </div>
          <div className="suggest-empty">
            <span>moves: {moves}</span>
          </div>
        </div>
        <div className="suggest-main">
          <ul className="suggest-main-list" ref={messagesEndRef}>
            {messages.map((message) => (
              <li
                key={message.id}
                className={`suggest-main-item ${
                  message.isMine ? "my-message" : "other-message"
                }`}
              >
                <p>{message.msg}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="suggest-actions">
          <input
            className="suggest-input"
            placeholder="your question..."
            value={question}
            disabled={wait}
            onChange={handleInputChange}
          />
          <button className="suggest-send" onClick={handleSubmit} disabled={wait}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.0396 2.32295C21.0556 1.96795 22.0316 2.94395 21.6766 3.95995L15.7516 20.89C15.3666 21.988 13.8366 22.05 13.3646 20.987L10.5056 14.555L14.5296 10.53C14.6621 10.3878 14.7342 10.1997 14.7308 10.0054C14.7274 9.81113 14.6486 9.62574 14.5112 9.48833C14.3738 9.35092 14.1884 9.27221 13.9941 9.26878C13.7998 9.26535 13.6118 9.33747 13.4696 9.46995L9.44461 13.494L3.01261 10.635C1.94961 10.162 2.01261 8.63295 3.10961 8.24795L20.0396 2.32295Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Модальное окно */}
      {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              {
                moves > 0 ? (
                    <h2>You Won!</h2>
                ) : (
                    <h2>Game Over</h2>
                )
              }
              {moves > 0 ? (
                  <p>Congratulations! You won the game!</p>
              ) : (
                  <p>Sorry, you lost. Try again next time!</p>
              )}
              <div className="actions">
                <button className="modal-exit" onClick={exitGame}>
                  Exit
                </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

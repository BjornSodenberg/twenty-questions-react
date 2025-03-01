import "./GuessMovie.css";
import React, {useEffect, useRef, useState} from "react";
import {guessMessagesRu, guessMessagesEn} from "../../constants/defaultMessages";
import {useNavigate} from "react-router-dom";
import {postAnswer} from "../../services/api";
import {useTranslation} from "react-i18next";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const GuessMoviePage = () => {
  const { t, i18n } = useTranslation();
  const [secret, setSecret] = useState('');
  const [messages, setMessages] = useState(i18n.language === 'ru' ? guessMessagesRu : guessMessagesEn);
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
              <p>{t('guessMovie')}</p>
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
              <AlwaysScrollToBottom />
            </ul>
          </div>
          <div className="guess-actions">
            <button className="guess-action" onClick={() => handleSubmit('yes')} disabled={wait}>
              <p>{t('yes')}</p>
            </button>
            <button className="guess-action" onClick={() => handleSubmit('no')} disabled={wait}>
              <p>{t('no')}</p>
            </button>
            <button className="guess-action" onClick={() => handleSubmit('maybe')} disabled={wait}>
              <p>{t('maybe')}</p>
            </button>
          </div>
        </div>

        {/* Модальное окно */}
        {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>{t('gameOver')}</h2>
                <p>{t('playAgain')}</p>
                <div className="actions">
                  <button className="modal-close" onClick={exitGame}>
                    {t('yes')}
                  </button>
                  <button className="modal-exit" onClick={exitGame}>
                    {t('no')}
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default GuessMoviePage;
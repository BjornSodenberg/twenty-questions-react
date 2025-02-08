import React, { useState } from "react";
import { postAnswer } from "../../services/api";
import { suggestMessages } from "../../constants/defaultMessages";
import "./SuggestMovie.css";

export const SuggestMoviePage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [messages, setMessages] = useState(suggestMessages);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const sendMessage = (text, isMine) => {
    const msg = {
      id: `${isMine ? "u-" : "x-"}${Date.now()}`,
      msg: text,
      isMine: isMine,
    };
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const handleSubmit = async () => {
    sendMessage(question, true);
    try {
      const result = await postAnswer(question);
      sendMessage(result.answer, false);
      setResponse(result);
    } catch (error) {
      console.error("Error posting answer:", error);
    }
    setQuestion("");
  };

  return (
    <div className="suggest">
      <div className="suggest-container">
        <div className="suggest-header">
          <div className="suggest-back"></div>
          <div className="suggest-label">
            <p>Suggest movie</p>
          </div>
          <div className="suggest-empty"></div>
        </div>
        <div className="suggest-main">
          <ul className="suggest-main-list">
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
            onChange={handleInputChange}
          />
          <div className="suggest-send" onClick={handleSubmit}></div>
        </div>
        {response && (
          <div className="suggest-response">
            <p>{JSON.stringify(response)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

import "./SuggestMovie.css";

export const SuggestMoviePage = () => {
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
            <li className="suggest-main-item">
              <p>Text</p>
            </li>
            <li className="suggest-main-item">
              <p>Text</p>
            </li>
          </ul>
        </div>
        <div className="suggest-actions">
          <input className="suggest-input" placeholder="your question..."/>
          <div className="suggest-send"></div>
        </div>
      </div>
    </div>
  );
};

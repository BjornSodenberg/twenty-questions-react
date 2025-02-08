import "./MainPage.css";
import logoImage from "../../assets/logo.png";
import playButton from "../../assets/play_button.png";
import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div className="App">
      <div className="main">
        <div>
          <img src={logoImage} width={300} />
        </div>
        <div>
          <Link to="/game-mode">
            <img src={playButton} width={200} />
          </Link>
        </div>
      </div>
    </div>
  );
};

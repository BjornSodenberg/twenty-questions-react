import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameModePage } from './pages/GameMode/GameMode';
import { MainPage } from './pages/MainPage/MainPage';
import "./App.css";
import { SuggestMoviePage } from "./pages/SuggestMovie/SuggestMovie";
import { GuessMoviePage } from "./pages/GuessMovie/GuessMovie";

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game-mode" element={<GameModePage />} />
        <Route path="/suggest" element={<SuggestMoviePage />} />
        <Route path="/guess" element={<GuessMoviePage />} />
      </Routes>
    </Router>
  );
}

export default App;
import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameModePage } from './pages/GameMode/GameMode';
import { MainPage } from './pages/MainPage/MainPage';
import "./App.css";

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
      </Routes>
    </Router>
  );
}

export default App;
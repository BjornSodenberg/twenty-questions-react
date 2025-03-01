import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameModePage from './pages/GameMode/GameMode';
import { MainPage } from './pages/MainPage/MainPage';
import "./App.css";
import SuggestMoviePage from "./pages/SuggestMovie/SuggestMovie";
import GuessMoviePage from "./pages/GuessMovie/GuessMovie";
import {I18nextProvider} from "react-i18next";
import i18n from './i18n';

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();

      // Определение языка пользователя из Telegram Web App
      if (window.Telegram.WebApp) {
          const userLanguage = window.Telegram.WebApp.language;
          console.log('lang',userLanguage);
          i18n.changeLanguage(userLanguage); // Установка языка пользователя
      } else {
          console.log('Telegram Web App не доступен');
      }
  }, []);

  return (
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/game-mode" element={<GameModePage />} />
            <Route path="/suggest" element={<SuggestMoviePage />} />
            <Route path="/guess" element={<GuessMoviePage />} />
          </Routes>
        </Router>
      </I18nextProvider>
  );
}

export default App;
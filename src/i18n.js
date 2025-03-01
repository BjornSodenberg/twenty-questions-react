import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
    en: {
        translation: {
            "guess": "Guess",
            "suggest": "Suggest",
            "movie": "Movie",
            "yes": "Yes",
            "no": "No",
            "maybe": "Maybe",
            "gameOver": "Game Over",
            "playAgain": "Would you like to play again?",
            "guessMovie": "Guess Movie",
            "suggestMovie": "Suggest Movie",
            "moves": "moves",
            "won": "You Won!",
            "wonMessage": "Congratulations! You won the game!",
            "lostMessage": "Sorry, you lost. Try again next time!",
            "exit": "Exit"
        }
    },
    ru: {
        translation: {
            "guess": "Угадать",
            "suggest": "Загадать",
            "movie": "Фильм",
            "yes": "Да",
            "no": "Нет",
            "maybe": "Не важно",
            "gameOver": "Игра окончена",
            "playAgain": "Хотите сыграть ещё раз?",
            "guessMovie": "Угадать фильм",
            "suggestMovie": "Загадать фильм",
            "moves": "ходов",
            "won": "Победа!",
            "wonMessage": "Поздравляю! Вы выиграли игру!",
            "lostMessage": "К сожалению, вы проиграли. Попробуйте снова в следующий раз!",
            "exit": "Выход"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
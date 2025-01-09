import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { useCallback, useEffect, useState } from 'react';
import { wordList } from './data/words';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
];

const maxGuesses = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(maxGuesses);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    const { word, category } = pickWordAndCategory();

    let wordToLowercase = word.toLowerCase();
    let wordLetters = wordToLowercase.split('');

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGuessedLetters([]);
    setWrongLetters([]);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifyLetters = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  useEffect(() => {
    if (guesses === 0) {
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore + (10 * uniqueLetters.length));
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  const retry = () => {
    setPickedWord('');
    setPickedCategory('');
    setLetters([]);
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(maxGuesses);
    setScore(0);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <GameScreen
        verifyLetters={verifyLetters}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === 'end' && <EndScreen retry={retry} score={score} />}
    </div>
  );
}

export default App;

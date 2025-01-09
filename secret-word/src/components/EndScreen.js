import React from 'react';
import './EndScreen.css'

const EndScreen = ({ retry, score }) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h3>Sua pontuação foi de:</h3><h2 className='score'>{score}</h2>
      <button onClick={retry}>Tentar Novamente</button>
    </div>
  );
}

export default EndScreen;
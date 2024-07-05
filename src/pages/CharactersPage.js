import React, { useState, useEffect } from 'react';

import { getCharacters, saveCharacters } from '../services/character';
import Character from '../components/Character';

const Characters = () => {
  // Characters config
  const [characters, setCharacters] = useState([]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  // Fetch characters from API
  useEffect(() => {
    getCharacters().then((data) => {
      setCharacters(data);
      setCurrentCharacterIndex(data.length);
    });
  }, []);

  // Save character to API
  const handleSaveCharacter = async (character) => {
     const index = characters.findIndex( (ctr) => ctr.id === character.id)
    characters[index] = character
    setCharacters(characters);
    await saveCharacters(characters);
  };

  return (
    <>
      {!!characters &&
        characters.map((character, index) => (
          <Character
            key={index}
            index={currentCharacterIndex}
            character={character}
            onSave={handleSaveCharacter}
          />
        ))}
    </>
  );
};

export default Characters;

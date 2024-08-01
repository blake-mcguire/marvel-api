import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetails from './CharacterDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelect = (characterId) => {
    setSelectedCharacter(characterId);
  };
  const handleCloseModal = () => {
    setSelectedCharacter(null);
  }

  return (
    <>
      {selectedCharacter ? (
        <CharacterDetails characterID={selectedCharacter} onClose={handleCloseModal} />
      ) : (
        <CharacterList onCharacterSelect={handleCharacterSelect} />
      )}
    </>
  );
}

export default App;

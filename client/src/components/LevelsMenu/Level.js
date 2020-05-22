import React, { useContext } from 'react';
import { LevelContext } from '../../levelContext/LevelContext'

const Level = props => {
  const levelContext = useContext(LevelContext);
  const { loadLevel, deleteLevel } = levelContext
  const { info: { name, id } } = props
  return (
    <div className="level">
      <div className="info">{name}</div>
      <div className="level__buttons">
        <button onClick={() => loadLevel(id)}>Załaduj</button>
        <button onClick={() => deleteLevel(id)}>Usuń</button>
      </div>
    </div>
  );
}

export default Level;
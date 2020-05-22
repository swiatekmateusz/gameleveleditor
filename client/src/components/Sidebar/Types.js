import React, { useContext } from 'react';
import { LevelContext } from '../../levelContext/LevelContext'

const types = ["WALLS", "ENEMY", "TREASURE", "LIGHT"]

const Types = () => {
  const levelContext = useContext(LevelContext);
  const { level, changeType } = levelContext

  const buttons = types.map(type =>
    <button
      key={type}
      className={level.actualType === type ? 'active' : null}
      onClick={() => changeType(type)}
    >
      {type}
    </button>
  )

  return (
    <>
      {buttons}
    </>
  );
}

export default Types;
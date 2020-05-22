import React, { useContext } from 'react';
import { LevelContext } from '../../levelContext/LevelContext'

const TextObject = () => {
  const levelContext = useContext(LevelContext)
  const { returnObject } = levelContext
  const object = returnObject()
  return (
    <div className="textArea">
      <pre>
        {JSON.stringify(
          object, null, 2)}
      </pre>
    </div>
  );
}

export default TextObject;
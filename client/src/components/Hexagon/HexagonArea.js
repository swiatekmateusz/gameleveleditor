import React, { useContext } from 'react';
import { LevelContext } from '../../levelContext/LevelContext'
import Hexagon from './Hexagon'

const HexagonArea = () => {
  const levelContext = useContext(LevelContext);
  const { level } = levelContext

  return (
    <div className="hexagonArea" >
      {level.levelObject.map(item =>
        <Hexagon
          key={item.id}
          info={item}
        >
        </Hexagon>)}
    </div>
  );
}

export default HexagonArea;
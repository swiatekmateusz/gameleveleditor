import React, { useContext } from 'react';
import { LevelContext } from '../../levelContext/LevelContext'

const hexWidth = 120
const hexHeight = 100

const Hexagon = props => {
  const levelContext = useContext(LevelContext)
  const { changeHexDir } = levelContext

  const { x, y, dirIn, id, hexId, type } = props.info

  let top = y * hexWidth
  if (x % 2 === 1) top += hexWidth / 2

  let left = x * hexHeight + hexHeight * 0.2

  return (
    <div
      className="hexagon"
      style={{ top: top + "px", left: left + "px" }}
      onClick={() => changeHexDir(id)}
    >
      <div className="idText">{hexId}</div>
      <div className="hexText">
        {dirIn !== null ? <div className={"arrow arrow-" + dirIn}>{dirIn}</div> : null}
      </div>
      <div className="typeText">{type}</div>
    </div>
  );
}

export default Hexagon;
import React, { useEffect, useContext } from 'react';
import { LevelContext } from '../../levelContext/LevelContext'
import Level from './Level'

const Levels = props => {
  const levelContext = useContext(LevelContext)
  const { level: { levels }, getLevels } = levelContext
  useEffect(() => {
    getLevels()

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="wrapper" onClick={() => props.setOverlay(false)}>
      </div>
      <div className="levels">
        {levels.length ?
          levels.map(level => <Level key={level.id} info={level} />)
          : null}
      </div>
    </>
  );
}

export default Levels;
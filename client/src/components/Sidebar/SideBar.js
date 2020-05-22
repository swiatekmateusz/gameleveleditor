import React, { useContext, useState } from 'react';
import { LevelContext } from '../../levelContext/LevelContext'
import Types from './Types'
import Levels from '../LevelsMenu/Levels'
import { Link } from 'react-router-dom'

const maxDeep = 14

const SideBar = () => {
  const levelContext = useContext(LevelContext);
  const { level, changeDeep, sendLevel, clearLevel, updateLevel } = levelContext

  const [name, setName] = useState('');

  const [overlay, setOverlay] = useState(false)

  const options = []
  for (let i = 2; i <= maxDeep; i++) {
    options.push(<option value={i} key={i}>{i}</option>)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (level.isFromAxios) {
      updateLevel()
      setName('')
    }
    if (name) {
      sendLevel(name)
      setName('')
    }
  }

  const onChange = e => changeDeep(parseInt(e.target.value))

  const handleChange = e => setName(e.target.value)

  return (
    <>
      <div className="sideBar">
        <form onSubmit={onSubmit}>
          <div className="box">
            <select onChange={onChange} value={level.deep}>
              {options}
            </select>
          </div>{level.isFromAxios ?
            <h2>{level.name}</h2> :
            <input onChange={handleChange} type="text" placeholder="Podaj nazwe..." value={name} />}
          <button>{level.isFromAxios ? "Zedytuj level na serwerze" : "Zapisz Level na serwerze"}</button>
          {level.isFromAxios ? <button onClick={() => clearLevel()}>Przestań edytować</button> : null}
        </form>
        <button onClick={clearLevel}>Wyczyść plansze</button>
        <button onClick={() => setOverlay(!overlay)}>Zobacz Levele</button>
        <Link to="/map" className="button link">Zobacz Mapę</Link>
        <Link to="/hex" className="button link">Zobacz Hex</Link>
        <Link to="/movement" className="button link">Zobacz Movement</Link>
        <Types />
        <h3>{level.message}</h3>
      </div >
      {overlay ? <Levels setOverlay={setOverlay} /> : null}
    </>
  );
}

export default SideBar;
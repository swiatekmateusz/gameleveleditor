import React, { useContext, useEffect } from 'react';
import './App.css';
import SideBar from './components/Sidebar/SideBar'
import HexagonArea from './components/Hexagon/HexagonArea'
import Movement from './components/Map/Movement'
import TextObject from './components/Sidebar/TextObject'
import { LevelContext } from './levelContext/LevelContext'
import HexThree from './components/Map/HexThree'
import Map from './components/Map/Map'
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'


const App = () => {
  const levelContext = useContext(LevelContext);
  const { level, changeLevelObject } = levelContext

  useEffect(() => {
    const levelArray = []
    for (let y = 0; y < level.deep; y++) {
      for (let x = 0; x < level.deep; x++) {
        const id = y * level.deep + x
        levelArray.push({ id, x, y, dirIn: null, dirOut: null })
      }
    }
    if (!level.isFromAxios) {
      changeLevelObject(levelArray)
    } else {
      changeLevelObject(null, true)
    }
    // eslint-disable-next-line
  }, [level.deep]);

  return (
    <Router>

      <Switch>
        <Route path="/" exact>
          <SideBar></SideBar>
          <TextObject></TextObject>
          <HexagonArea></HexagonArea>
        </Route>
        <Route path="/hex" exact>
          <HexThree></HexThree>
        </Route>
        <Route path="/map" exact>
          <Map></Map>
        </Route>
        <Route path="/movement" exact>
          <Movement></Movement>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

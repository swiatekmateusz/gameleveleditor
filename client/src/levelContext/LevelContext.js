import React, { createContext, useReducer } from 'react';
import levelReducer from './levelReducer'
import axios from 'axios';

export const LevelContext = createContext()


export const LevelState = props => {
  const initialState = {
    count: 0,
    deep: 3,
    levelObject: [{ "id": 0, "x": 0, "y": 0, "dirIn": null, "dirOut": null }, { "id": 1, "x": 1, "y": 0, "dirIn": null, "dirOut": null }, { "id": 2, "x": 2, "y": 0, "dirIn": null, "dirOut": null }, { "id": 3, "x": 0, "y": 1, "dirIn": null, "dirOut": null }, { "id": 4, "x": 1, "y": 1, "dirIn": null, "dirOut": null }, { "id": 5, "x": 2, "y": 1, "dirIn": null, "dirOut": null }, { "id": 6, "x": 0, "y": 2, "dirIn": null, "dirOut": null }, { "id": 7, "x": 1, "y": 2, "dirIn": null, "dirOut": null }, { "id": 8, "x": 2, "y": 2, "dirIn": null, "dirOut": null }],
    message: null,
    actualType: "WALLS",
    isFromAxios: false,
    name: null,
    levels: [],
    editId: null,
  }
  const [state, dispatch] = useReducer(levelReducer, initialState)

  const changeDeep = async int => dispatch({ type: "SET_DEEP", payload: int })

  const changeLevelObject = (object, flag) => {
    if (flag) {
      // dispatch({ type: "END_AXIOS" })
    } else {
      dispatch({ type: "SET_LEVEL_OBJECT", payload: object })
    }
  }

  const changeHexDir = id => dispatch({ type: "INCREMENT_HEX_DIR", payload: id })

  const clearLevel = () => dispatch({ type: "CLEAR_LEVEL" })

  const changeType = type => dispatch({ type: "CHANGE_TYPE", payload: type })

  const returnObject = () => (
    {
      size: state.deep,
      level: state.levelObject.filter(item => item.dirIn !== null)
    }
  )

  const getLevels = async () => {
    try {
      const response = await axios.get('/api/levels')
      console.log(response.data)
      dispatch({ type: "SET_LEVELS", payload: response.data })
    } catch (error) {
      dispatch({ type: "ERROR_SAVE_LEVEL", payload: "Wystąpił błąd" })
      setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 2000)
    }
  }


  const loadLevel = async id => {
    console.log(`/api/level/${id}`)
    dispatch({ type: "START_AXIOS" })
    try {
      const response = await axios.get(`/api/level/${id}`)
      const { size, level, name } = response.data
      const count = level.length
      dispatch({ type: "SET_DEEP_AXIOS", payload: size })
      const levelArray = []
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const id = y * size + x
          const info = level.filter(item => item.x === x && item.y === y)
          console.log(info)
          if (info.length) {
            const { dirIn, dirOut, type, hexId } = info[0]
            levelArray.push({ id, x, y, dirIn, dirOut, type, hexId })
          } else levelArray.push({ id, x, y, dirIn: null, dirOut: null })
        }
        changeLevelObject(levelArray)
        dispatch({ type: "CHANGE_NAME_ID", payload: { name, id, count } })
        dispatch({ type: "SUCCESS_SAVE_LEVEL", payload: "Wczytano level" })
      }
    } catch (error) {
      dispatch({ type: "ERROR_SAVE_LEVEL", payload: "Wystąpił błąd" })
    }
    setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 2000)
  }

  const sendLevel = async name => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    try {
      const object = returnObject()
      console.log(object)
      object.name = name
      const response = await axios.post('/api/addlevel', object, config)
      dispatch({ type: "SUCCESS_SAVE_LEVEL", payload: response.data })
    } catch (error) {
      dispatch({ type: "ERROR_SAVE_LEVEL", payload: "Wystąpił błąd" })
    }
    setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 2000)
  }

  const deleteLevel = async id => {
    console.log(`/api/level/${id}`)
    try {
      await axios.delete(`/api/level/${id}`)
      dispatch({ type: "SUCCESS_DELETE_LEVEL", payload: id })
    } catch (error) {
      dispatch({ type: "ERROR_SAVE_LEVEL", payload: "Wystąpił błąd" })
      setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 2000)
    }
  }

  const updateLevel = async () => {
    console.log("UPDATE " + state.editId)
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    try {
      const object = returnObject()
      await axios.put(`/api/level/${state.editId}`, object, config)
      dispatch({ type: "SUCCESS_EDIT_LEVEL" })
    } catch (error) {
      dispatch({ type: "ERROR_SAVE_LEVEL", payload: "Wystąpił błąd" })
    }
    setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 2000)
  }

  return (
    <LevelContext.Provider value={{ level: state, changeDeep, changeLevelObject, changeHexDir, sendLevel, clearLevel, changeType, returnObject, loadLevel, getLevels, deleteLevel, updateLevel }}>
      {props.children}
    </LevelContext.Provider>
  )
}
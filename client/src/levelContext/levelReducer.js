export default (state, action) => {
  console.log(action.type)
  switch (action.type) {
    case "SET_DEEP_AXIOS":
      return {
        ...state,
        deep: action.payload,
      }
    case "SET_DEEP":
      return {
        ...state,
        deep: action.payload,
        isFromAxios: false,
        name: null,
        editId: null,
        count: 0,
      }
    case "SET_LEVEL_OBJECT":
      return { ...state, levelObject: action.payload, count: 0 }
    case "INCREMENT_HEX_DIR":
      const levelObject = state.levelObject.map(item => {
        if (item.id === action.payload) {
          if (item.dirIn === null) {
            item.dirIn = 0
            item.hexId = state.count
            state.count++;
          }
          else item.dirIn = (item.dirIn + 1) % 6
          item.dirOut = (item.dirIn + 3) % 6
          item.type = state.actualType
        }
        return item
      })
      return {
        ...state,
        levelObject,
      }
    case "SUCCESS_EDIT_LEVEL":
      return {
        ...state,
        isFromAxios: false,
        name: null,
        editId: null,
      }
    case "SUCCESS_DELETE_LEVEL":
      return {
        ...state,
        levels: state.levels.filter(item => item.id !== action.payload)
      }
    case "SUCCESS_SAVE_LEVEL":
    case "ERROR_SAVE_LEVEL":
      return { ...state, message: action.payload }
    case "CLEAR_MESSAGE":
      return { ...state, message: null }
    case "CLEAR_LEVEL":
      const newlevelObject = state.levelObject.map(item => {
        item.dirIn = null
        item.type = null
        item.hexId = null
        return item
      })
      return {
        ...state,
        levelObject: newlevelObject,
        count: 0,
      }
    case "CHANGE_TYPE":
      return {
        ...state,
        actualType: action.payload
      }
    case "SET_LEVEL_DEEP":
      return {
        ...state,
        deep: action.payload.size,
        levelObject: action.payload.level
      }
    case "START_AXIOS":
      return {
        ...state,
        isFromAxios: true,
        editId: null
      }
    case "END_AXIOS":
      return {
        ...state,
        isFromAxios: false,
        name: null,
      }
    case "SET_LEVELS":
      return {
        ...state,
        levels: action.payload
      }
    case "CHANGE_NAME_ID":
      return {
        ...state,
        name: action.payload.name,
        editId: action.payload.id,
        count: action.payload.count
      }
    default:
      return { ...state }
  }
}
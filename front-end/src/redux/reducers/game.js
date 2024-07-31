const initialState = {
  gameStarted: false,
  letters: [],
  totalWordsFound: 0,
  foundWords: [],
  totalScore: 0,
  words: new Set(),
  username: "",
  userGameDatas: [],
  scoreBoardDatas: [],
  isDoublePointsActive: false,
  extraTimeUsed: false,
  extraWordUsed: false,
  doublePointsUsed: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        gameStarted: true,
      };
    case "SET_LETTERS":
      return {
        ...state,
        letters: action.payload,
      };
    case "UPDATE_GAME_STATS":
      return {
        ...state,
        totalWordsFound: state.totalWordsFound + 1,
        foundWords: [...state.foundWords, action.payload.newWord],
        totalScore:
          state.totalScore +
          (state.isDoublePointsActive
            ? action.payload.wordPoint * 2
            : action.payload.wordPoint),
      };
    case "LOAD_WORDS":
      return {
        ...state,
        words: new Set(action.payload),
      };
    case "LOAD_GAME_DATAS":
      return {
        ...state,
        scoreBoardDatas: action.payload,
      };
    case "LOAD_USER_GAME_DATAS":
      return {
        ...state,
        userGameDatas: action.payload,
      };
    case "ADD_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "FINISH_GAME":
      return {
        ...state,
        gameStarted: false,
        letters: [],
        totalWordsFound: 0,
        foundWords: [],
        totalScore: 0,
        isDoublePointsActive: false,
        extraTimeUsed: false,
        extraWordUsed: false,
        doublePointsUsed: false,
      };
    case "ACTIVATE_EXTRA_TIME":
      return {
        ...state,
        extraTimeUsed: true,
      };
    case "ADD_RANDOM_WORD":
      return {
        ...state,
        totalWordsFound:state.totalWordsFound + 1,
        foundWords: [...state.foundWords, action.payload.word],
        totalScore: state.totalScore + action.payload.wordPoint,
        extraWordUsed: true,
      };
    case "ACTIVATE_DOUBLE_POINTS":
      return {
        ...state,
        isDoublePointsActive: true,
        doublePointsUsed: true,
      };
    default:
      return state;
  }
};
export default gameReducer;

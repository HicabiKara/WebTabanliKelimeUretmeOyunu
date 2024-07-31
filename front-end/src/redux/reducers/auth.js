const initialState={
  auth:null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGIN":
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        auth: null,
      };
    case "UPDATE_ACCOUNT":
      return {
        auth: [
          state?.auth?.map((acc) =>
            acc._id === action.payload._id ? action.payload : acc
          ),
        ],
      };
    case "DELETE_ACCOUNT":
      localStorage.clear();
      return {
        auth: [state?.auth?.filter((acc) => acc._id !== action.payload)],
      };
    default:
      return state;
  }
};
export default authReducer;

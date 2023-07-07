const sessionReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_SESSION":
      return (state = action.payload);
    case "UNSET_SESSION":
      return (state = false);
    default:
      return state;
  }
};

export default sessionReducer;

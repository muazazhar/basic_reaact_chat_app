const Initial_state = {
  users: [],
  current_user: {},
};

export default (state = Initial_state, action) => {
  switch (action.type) {
    case "SETUSER":
      return {
        ...state,
        current_user: action.payload,
      };
    case "SETALLUSERS":
      return {
        ...state,
        users: action.payload,
      };
  }
  return state;
};

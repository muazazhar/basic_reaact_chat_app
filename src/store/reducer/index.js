const Initial_state = {
  users: [
    {
      name: "mu",
      email: "m@mail.com",
    },
  ],
};

export default (state = Initial_state, action) => {
  console.log(action);
  switch (action.type) {
    case "SETDATA":
      return {
        ...state,
        users: [...state.users, action.user],
      };
  }
  return state;
};

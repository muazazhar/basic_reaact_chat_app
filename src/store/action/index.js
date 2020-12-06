const set_d = () => {
  return (dispatch) => {
    dispatch({
      type: "SETDATA",
      user: { name: "maja", email: "maja@mail.com" },
    });
    console.log("working kr rya eeeee");
  };
};

export { set_d };

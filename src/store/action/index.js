import firebase from "../../config/firebase";

const fb_login = (history) => {
  return (dispatch) => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        let create_user = {
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
          uid: user.uid,
        };
        firebase
          .database()
          .ref("/")
          .child(`users/${user.uid}`)
          .set(create_user)
          .then(() => {
            dispatch({ type: "SETUSER", payload: create_user });
            alert("login succesfull");
            history.push("/chat");
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage);
      });
  };
};

const get_Users = () => {
  return (dispatch) => {
    let users = [];

    firebase
      .database()
      .ref("/")
      .child("users")
      .on("child_added", (data) => {
        users.push(data.val());
      });
    dispatch({ type: "SETALLUSERS", payload: users });
  };
};

export { fb_login, get_Users };

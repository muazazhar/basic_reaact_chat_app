import React from "react";
import { connect } from "react-redux";
import { get_Users } from "../../store/action";
import firebase from "../../config/firebase";

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      chat_user: {},
      chat: [],
      message: "",
    };
  }
  componentDidMount() {
    this.props.get_Users();
  }
  chat = (user) => {
    this.setState({
      chat_user: user,
    });
    let current_user = this.props.current_user;
    let merged_uid = this.uid_merger(current_user.uid, user.uid);
    this.get_messages(merged_uid);
  };

  send_message = () => {
    let user = this.props.current_user;
    let chat_user = this.state.chat_user;
    let merged_uid = this.uid_merger(user.uid, chat_user.uid);
    firebase.database().ref("/").child(`chats/${merged_uid}`).push({
      message: this.state.message,
      name: user.name,
      uid: user.uid,
    });
    this.setState({
      message: "",
    });
  };
  uid_merger = (uid1, uid2) => {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  };

  get_messages = (uid) => {
    firebase
      .database()
      .ref("/")
      .child(`chats/${uid}`)
      .on("child_added", (messages) => {
        this.state.chat.push(messages.val());
        this.setState({
          chat: this.state.chat,
        });
      });
  };

  render() {
    let user = this.props.current_user;
    return (
      <div>
        <h1>welcome to chat {user.name} </h1>
        <img alt="" src={user.profilePic} />
        <h3>email:{user.email}</h3>
        <div style={{ display: "flex" }}>
          <div style={{ backgroundColor: "#b5b5b5" }}>
            <h4>Chat Users:</h4>
            <ul>
              {this.props.users.map((v, i) => {
                return (
                  v.uid !== user.uid && (
                    <li key={i}>
                      <img alt="" src={v.profilePic} width="30px" />
                      {v.name}
                      <button onClick={() => this.chat(v)}>Chat</button>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          <div style={{ backgroundColor: "#cacaca", width: "400px" }}>
            <h3>Chat</h3>
            {Object.keys(this.state.chat_user).length ? (
              <div>
                <img
                  alt=""
                  src={this.state.chat_user.profilePic}
                  width="30px"
                />
                {this.state.chat_user.name}
                <ul>
                  {this.state.chat.map((v, i) => {
                    return (
                      <li
                        key={i}
                        style={
                          v.uid === user.uid
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {v.message}
                      </li>
                    );
                  })}
                </ul>
                <input
                  value={this.state.message}
                  onChange={(e) => this.setState({ message: e.target.value })}
                  type="text"
                  placeholder="enter text"
                />
                <button onClick={() => this.send_message()}>Send</button>
              </div>
            ) : (
              <h3>Select User</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  get_Users: () => dispatch(get_Users()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);

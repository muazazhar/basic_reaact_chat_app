import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { fb_login } from "../../store/action";

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <button onClick={() => this.props.fb_login(this.props.history)}>
          FB login
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  fb_login: (history) => dispatch(fb_login(history)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

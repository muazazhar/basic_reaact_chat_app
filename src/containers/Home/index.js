import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { set_d } from "../../store/action";

class Home extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <h1>Home</h1>
        <button onClick={() => this.props.set_d()}>set data</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  set_d: () => dispatch(set_d()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

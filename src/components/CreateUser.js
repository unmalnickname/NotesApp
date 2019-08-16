import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    users: [],
    username: ""
  };
  async componentDidMount() {
    this.getUser();
    console.log(this.state.users);
  }
  getUser = async () => {
    const res = await axios.get("http://localhost:4000/api/user");
    this.setState({ users: res.data });
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/api/user", {
      username: this.state.username
    });
    this.setState({ username: "" });
    this.getUser();
  };

  deleteUser = async (id) => {
    await axios.delete("http://localhost:4000/api/user/" + id);
    console.log(id);
    this.getUser();
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={this.state.username}
                  className="form-control"
                  onChange={this.onChangeUsername}
                />
              </div>
              <button className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <div className="list-group">
            {this.state.users.map((user) => (
              <li
                onDoubleClick={() => {
                  this.deleteUser(user._id);
                }}
                className="list-group-item list-group-item-action"
                key={user._id}
              >
                {user.username}
              </li>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

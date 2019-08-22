import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNotes extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date()
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/user");
    this.setState({ users: res.data.map((user) => user.username) });
    console.log(this.state.users);
  }

  onSubmit = (e) => {
    console.log(this.state);

    e.preventDefault();
  };

  onInputChange = (e) => {
    // console.log(e.target.name, e.target.value);

    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDate = (date) => {
    this.setState({ date: date });
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>

          {/** Select User */}

          <div className="form-group">
            <select
              name="userSelected"
              className="form-control"
              onChange={this.onInputChange}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              id=""
              required
              onChange={this.onInputChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="Content"
              className="form-control"
              placeholder="Content"
              required
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

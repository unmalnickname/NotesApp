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
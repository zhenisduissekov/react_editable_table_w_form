// НУЖНЫЙ ТУТОРИАЛ
// https://www.youtube.com/watch?v=wi_vD0Yvc0g&list=RDCMUC-8QAzbLcRglXeN_MY9blyw&start_radio=1&t=202
import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import "./App.css";
import Form from "./Form";
import Table from "./Table";
import localdata from "./localdata.json";

injectTapEventPlugin();

class App extends Component {
  state = {
    data: [],
    editIdx: -1,
  };

  handleRemove = (i) => {
    this.setState((state) => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  };

  startEditing = (i) => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState((state) => ({
      data: state.data.map((row, j) =>
        j === i ? { ...row, [name]: value } : row
      ),
    }));
  };

  getDataAPI = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const persons = res.data;
      this.setState({ data: persons });
      console.log(this.state.data);
    });
  };

  getDataFile = () => {
    var alist = [];
    localdata.map((item) => {
      alist = [
        ...alist,
        {
          target: item["targets"][0],
          job: item["labels"]["job"],
          name: item["labels"]["name"],
          type: item["labels"]["type"],
        },
      ];
    });
    this.setState({ data: alist });
  };

  sendDataFile = () => {};

  sendDataAPI = () => {};

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <RaisedButton onClick={this.getDataFile}>Get Data</RaisedButton>
          <Form
            onSubmit={(submission) =>
              this.setState({
                data: [...this.state.data, submission],
              })
            }
          />
          <Table
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleChange={this.handleChange}
            data={this.state.data}
            header={[
              {
                name: "target",
                prop: "target",
              },
              {
                name: "job",
                prop: "job",
              },
              {
                name: "name",
                prop: "name",
              },
              {
                name: "type",
                prop: "type",
              },
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

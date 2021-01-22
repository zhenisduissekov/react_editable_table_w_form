import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import "./App.css";
import Form from "./Form";
import Table from "./Table";
import localdata from "./localdata.json";
import Header from "./Header";
// import MyButton from "react-bootstrap/Button";

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editIdx: -1,
      headers: [],
      openInputForm: false,
      file: null,
    };
  }

  togglePopup = (state) => {
    this.setState({ openInputForm: !this.state.openInputForm });
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
    var headers = this.getHeaders(localdata[0]);
    localdata.map((item) => {
      alist = [
        ...alist,
        {
          [headers[0].name]: item[[headers[0].name]],
          [headers[1].name]: item.labels.job,
          [headers[2].name]: item.labels.name,
          [headers[3].name]: item.labels.type,
        },
      ];
    });
    this.setState({ data: alist });
  };

  getHeaders = (source) => {
    const keyify = (obj, prefix = "") =>
      Object.keys(obj).reduce((res, el) => {
        if (typeof obj[el] === "object" && obj[el] !== null) {
          return [...res, ...keyify(obj[el], prefix + el)];
        }
        if (el === "0") return [...res, prefix];
        else return [...res, prefix + "." + el];
      }, []);

    var headers = keyify(source).map(function (currentValue) {
      return { name: currentValue, prop: currentValue };
    });
    this.setState({ headers: headers });
    return headers;
  };

  sendDataFile = () => {};

  sendDataAPI = () => {
    this.setState({ data: [], headers: [] });
    alert("File Saved");
  };

  clearData = () => {
    this.setState({ data: [], headers: [] });
  };

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.setState({ file: file }); /// if you want to upload latter
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div>
            {!this.state.openInputForm && (
              <div>
                <RaisedButton onClick={this.getDataFile}>
                  Open File
                </RaisedButton>
                <RaisedButton onClick={this.sendDataAPI}>
                  Save File
                </RaisedButton>
                <RaisedButton onClick={this.clearData}>
                  Clear Table
                </RaisedButton>
                {this.state.headers && this.state.headers.length > 0 && (
                  <RaisedButton onClick={this.togglePopup}>
                    Input Form
                  </RaisedButton>
                )}
              </div>
            )}
          </div>
          <Table
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleChange={this.handleChange}
            data={this.state.data}
            header={this.state.headers}
          />

          {this.state.openInputForm && (
            <Form
              onSubmit={(submission) =>
                this.setState({
                  data: [...this.state.data, submission],
                })
              }
              handleClose={this.togglePopup}
              headers={this.state.headers}
            />
          )}
          <div>
            <i className="plus icon"></i>
            <input
              directory="/"
              webkitdirectory="/"
              type="file"
              onChange={this.onChangeFile.bind(this)}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

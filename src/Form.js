import React from "react";
import TextField from "material-ui/TextField";
//import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
import RaisedButton from "material-ui/RaisedButton";
import "./Form.css";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.headers);
  }

  state = {
    target: "",
    targetError: "",
    job: "",
    jobError: "",
    name: "",
    nameError: "",
    type: "",
    typeError: "",
  };

  change = (e) => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      targetError: "",
      jobError: "",
      nameError: "",
      typeError: "",
    };

    if (this.state.target.length < 5) {
      isError = true;
      errors.targetError = "Target needs to be atleast 5 characters long";
    }

    // if (this.state.email.indexOf("@") === -1) {
    //   isError = true;
    //   errors.emailError = "Requires valid email";
    // }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        target: "",
        targetError: "",
        job: "",
        jobError: "",
        name: "",
        nameError: "",
        type: "",
        typeError: "",
      });
    }
  };

  render() {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={this.props.handleClose}>
            x
          </span>
          <form>
            <TextField
              name={this.props.headers[0].name}
              hintText={this.props.headers[0].name}
              floatingLabelText={this.props.headers[0].name}
              value={this.state.target}
              onChange={(e) => this.change(e)}
              errorText={this.state.targetError}
              floatingLabelFixed
            />
            <br />
            <TextField
              name={this.props.headers[1].name}
              hintText={this.props.headers[1].name}
              floatingLabelText={this.props.headers[1].name}
              value={this.state.job}
              onChange={(e) => this.change(e)}
              errorText={this.state.jobError}
              floatingLabelFixed
            />
            <br />
            <TextField
              name={this.props.headers[2].name}
              hintText={this.props.headers[2].name}
              floatingLabelText={this.props.headers[2].name}
              value={this.state.name}
              onChange={(e) => this.change(e)}
              errorText={this.state.nameError}
              floatingLabelFixed
            />
            <br />
            <TextField
              name={this.props.headers[3].name}
              hintText={this.props.headers[3].name}
              floatingLabelText={this.props.headers[3].name}
              value={this.state.type}
              onChange={(e) => this.change(e)}
              errorText={this.state.typeError}
              floatingLabelFixed
            />
            <br />
            <RaisedButton
              label="Submit"
              onClick={(e) => this.onSubmit(e)}
              primary
            />
          </form>
        </div>
      </div>
    );
  }
}

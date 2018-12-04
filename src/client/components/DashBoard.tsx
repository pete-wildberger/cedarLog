import * as React from "react";
// import axios from "axios";
import { dug } from '../dug';
import { Link, withRouter } from "react-router-dom";

interface state_type {
  auth: boolean;
}
export class DashBoard extends React.Component {
  state: state_type;
  constructor(props: any) {
    super(props);
    this.state = {
      auth: props
    };
  }

  componentDidMount() {
    console.log("HELOOOO", this.props);
    dug
      .get("/api/scrap")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <img
          className="center-img"
          src="https://media.giphy.com/media/26BRA7WJEcn7yJy3C/giphy.gif"
          alt="Loading"
        />
      </div>
    );
  }
}

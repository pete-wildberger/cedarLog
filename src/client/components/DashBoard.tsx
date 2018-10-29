import * as React from "react";
import axios from "axios";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Footer } from "./Footer";
import Ticket from "./Ticket";

interface state_type {
  auth: boolean;
}
export class DashBoard extends React.Component {
  state: state_type;
  constructor(props: any) {
    super(props);
    this.state = {
      auth: props.auth
    };
  }

  componentDidMount() {
    console.log("HELOOOO", this.state);
    axios
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

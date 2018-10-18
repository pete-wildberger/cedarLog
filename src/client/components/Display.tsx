import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Ticket from './Ticket';

interface state_type {
  isFetching: boolean;
  tickets: any;
}
class Display extends React.Component {
  state: state_type;
  constructor(props: any) {
    super(props);
    this.state = {
      isFetching: true,
      tickets: []
    };
    this.getTickets = this.getTickets.bind(this);
    this.makeTickets = this.makeTickets.bind(this);
  }

  getTickets() {
    axios.get('/api/tickets/').then(data => {
      this.setState({ tickets: data.data, isFetching: false });
      console.log(this.state);
    });
  }
  makeTickets(tickets: any) {
    console.log(tickets);
    return tickets.map((ticket: any) => {
      return (
        <div className="row border ticket-margin" key={ticket.num}>
          <div className="col-3">
            <img src={ticket.code} />
          </div>
          <div className="col-9">
            <p>TICKET # {ticket.num}</p>
            <p>ROW: {ticket.row}</p>
            <p>SEAT: {ticket.seat}</p>
          </div>
        </div>
      );
    });
  }
  componentDidMount() {
    this.getTickets();
  }
  render() {
    if (this.state.isFetching == true) {
      return (
        <div>
          <img className="center-img" src="https://media.giphy.com/media/26BRA7WJEcn7yJy3C/giphy.gif" alt="Loading" />
        </div>
      );
    } else if (this.state.tickets.length > 0) {
      return (
        <div className="app">
          <Header />
          {this.makeTickets(this.state.tickets)}
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <img className="center-img" src="https://media.giphy.com/media/26BRA7WJEcn7yJy3C/giphy.gif" alt="Loading" />
        </div>
      );
    }
  }
}
export default Display;

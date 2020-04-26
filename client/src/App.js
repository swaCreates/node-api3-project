import React, {Component} from 'react';
import axios from 'axios';
import './App.scss';

import Users from './Users';

class App extends Component {
  constructor(){
    super();
    this.state= {
      authorizedUsers: [],
    }
  }

  componentDidMount(){
    axios
    .get('/api/users')
    .then(res => {
      console.log(res);
      this.setState({
        authorizedUsers: res.data
      })
    })
    .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Catalog of Users</h1>
        </header>
        <section>
          <Users users={this.state.authorizedUsers} />
        </section>
      </div>
    );
  }
}

export default App;

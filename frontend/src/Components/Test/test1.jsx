import React, { Component } from 'react';
import Login from '../Login-Logout/login';
import { gapi } from 'gapi-script';
import Test from './test';

const clientId = '407240196859-30rjkune4eqd19mgv8rnok2eqh16ug16.apps.googleusercontent.com';

class Test1 extends Component {
  componentDidMount() {
    console.log("here");

    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    };

    gapi.load('client:auth2', start);
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <p>This is a dummy JSX component.</p>
         <Login/>

        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li></li>
        </ul>
      </div>
    );
  }
}

export default Test1;

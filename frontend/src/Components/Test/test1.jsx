import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script'; // Ensure gapi-script is imported correctly
import Login from '../Login-Logout/login';

const clientId = '407240196859-30rjkune4eqd19mgv8rnok2eqh16ug16.apps.googleusercontent.com';

class Test1 extends Component {
  componentDidMount() {
    // Load gapi client and initialize
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: clientId,
        scope: "profile email" // Adjust scope as needed
      });
    });
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

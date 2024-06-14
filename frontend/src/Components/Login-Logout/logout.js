import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '407240196859-30rjkune4eqd19mgv8rnok2eqh16ug16.apps.googleusercontent.com';

function Logout() {
  const logout = () => {
    console.log('Logging out...');
    // Implement logout logic here (e.g., clear user session, redirect to login page, etc.)
  };

  return (
    <div className="Logout">
      <h1>Logout from Google</h1>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={logout}
      />
    </div>
  );
}

export default Logout;

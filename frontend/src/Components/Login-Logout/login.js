import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = '407240196859-30rjkune4eqd19mgv8rnok2eqh16ug16.apps.googleusercontent.com';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const onSuccess = (response) => {
    console.log('Login Success: currentUser:', response.profileObj);
    setIsLoggedIn(true);
    setUserData(response.profileObj);
  };

  const onFailure = (response) => {
    console.log('Login failed: res:', response);
    setIsLoggedIn(false);
    setUserData({});
  };

  const onLogoutSuccess = () => {
    console.log('Logout made successfully');
    setIsLoggedIn(false);
    setUserData({});
  };

  return (
    <div>
      <h2>Google OAuth with React</h2>
      {isLoggedIn ? (
        <div>
          <h3>Welcome, {userData.name}</h3>
          <img src={userData.imageUrl} alt={userData.name} />
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}
    </div>
  );
}

export default Login;

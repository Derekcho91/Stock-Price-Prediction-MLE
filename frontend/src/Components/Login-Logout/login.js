import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = '407240196859-30rjkune4eqd19mgv8rnok2eqh16ug16.apps.googleusercontent.com'; // replace with your actual client ID

function Login() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    setIsLoggedIn(true);
    // Mock user data for simplicity
    setUserData({
      name: 'John Doe',
      imageUrl: 'https://via.placeholder.com/150'
    }); 
  };

  const onFailure = (response) => {
    console.log('Login failed:', response);
    setIsLoggedIn(false);
    setUserData({});
  };

  const onLogoutSuccess = () => {
    console.log('Logout made successfully');
    setIsLoggedIn(false);
    setUserData({});
  };

  return (

    <div style={{margin:"5rem auto",width:"30%"}}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div>
          <h2>Google OAuth with React</h2>
          {isLoggedIn ? (
            <div>
              <h3>Welcome, {userData.name}</h3>
              <img src={userData.imageUrl} alt={userData.name} />
              <button onClick={onLogoutSuccess}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
            clientId="407240196859-30rjkune4eqd19mgv8rnok2eqh16ug16.apps.googleusercontent.com"
              onSuccess={onSuccess}
              onError={onFailure}
              cookiePolicy={'single_host_origin'} // Change as needed
        responseType='code,token'
        accessType='offline'
            />
          )}
        </div>
      </GoogleOAuthProvider>

    </div>
  );
}

export default Login;

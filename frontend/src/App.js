import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import './App.css';
import Dashboard from './Components/Dashboard/dashboard';
import Login from './Components/Login-Logout/login';
import Test from './Components/Test/test';
import Test1 from './Components/Test/test1';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>

          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/login"  Component={Test1} />

          </Routes>

        
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

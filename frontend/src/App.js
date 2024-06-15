import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './Components/Dashboard/dashboard';
import Login from './Components/Login-Logout/login';
import Test1 from './Components/Test/test1';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test1" element={<Test1 />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

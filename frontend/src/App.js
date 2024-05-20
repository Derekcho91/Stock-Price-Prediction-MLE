import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import './App.css';
import Dashboard from './Components/Dashboard/dashboard';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>

          <Route path="/dashboard" Component={Dashboard} />

          </Routes>

        
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

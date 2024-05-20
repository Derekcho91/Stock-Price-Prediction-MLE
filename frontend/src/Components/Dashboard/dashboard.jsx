import React from "react"
import UserForm from "../UserInput/userinput"
import Navbar from "../Navbar/navbar"
import "./dashboard.css"
import Graph from "../Graph/graph"




class Dashboard extends React.Component{

    render(){

        return (

            <div>
                <Navbar/>
                <UserForm/> 
                <Graph/>

            </div>
        )
    }

}

export default Dashboard;
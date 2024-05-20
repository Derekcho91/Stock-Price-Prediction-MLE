import React from "react"
import "./navbar.css"

class Navbar extends React.Component{

    render(){

        return (


            <div>
                <nav
                className="navbar navbar-expand-lg navbar-dark fixed-top p-1 mynav"
                style={{ backgroundColor: "#000000" }}
                >
                <div >
                    <h2>
                    Stock Price Prediction
                    </h2>
                
                </div>    
                

                </nav>
                

            </div>
        )
    }

}

export default Navbar;
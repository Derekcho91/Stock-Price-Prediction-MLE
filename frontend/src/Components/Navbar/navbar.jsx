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
                <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                    <h2>
                    StockSentinel
                    </h2>

                    <button>Logout</button>
                
                </div>    
                

                </nav>
                

            </div>
        )
    }

}

export default Navbar;
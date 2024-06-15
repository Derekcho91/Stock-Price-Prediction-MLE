import React from "react"
import "./navbar.css"

class Navbar extends React.Component{

    render(){

        return (


            <div>
                <nav
                className="navbar navbar-expand-lg navbar-dark p-1 mynav"
                style={{ backgroundColor: "black", borderColor:"red" }}
                >
                <div style={{ paddingLeft:"2rem",paddingRight:"2rem",width:"100%",display:"flex",justifyContent:"space-between"}}>
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
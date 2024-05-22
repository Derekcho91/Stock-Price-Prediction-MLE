import React from "react"
import UserForm from "../UserInput/userinput"
import Navbar from "../Navbar/navbar"
import NewsTracker from "../NewsTicker/newsticker"
import "./dashboard.css"
import Graph from "../Graph/graph"



class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
           stockName:'AMD'
        }
        this.handleStockNameChange = this.handleStockNameChange.bind(this);
    }

    handleStockNameChange =  (stockName) => {
        this.setState({ stockName });
        console.log(this.state.stockName)
    };
    

    render() {

        return (

            <div>
                <Navbar />
                <div style={{ display: 'flex', width: '100%',height:'30rem'}}>
                    <div style={{ flex: 1 }}>
                        <UserForm onStockNameChange={this.handleStockNameChange} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Graph stockName={this.state.stockName}/>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{width: '100%',backgroundColor:"lightgrey"}}>
                    <div style={{marginLeft:'3rem',marginRight:'3rem'}}>
                       <NewsTracker />
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div>
                    
                </div>
            </div>

        
        )
    }

}

export default Dashboard;
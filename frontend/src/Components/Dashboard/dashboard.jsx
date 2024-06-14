import React from "react";
import UserForm from "../UserInput/userinput";
import Navbar from "../Navbar/navbar";
import NewsTracker from "../NewsTicker/newsticker";
import "./dashboard.css";
import Graph from "../Graph/graph";
import Papa from 'papaparse';
import Cards from "../Cards/card";

class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            stockName: 'AMD',
            stockData: []
        }
        this.handleStockNameChange = this.handleStockNameChange.bind(this);
    }

    handleStockNameChange = (stockName) => {
        this.setState({ stockName }, () => {
            this.fetchStockData(stockName);
        });
    };

    componentDidMount() {
        this.fetchStockData(this.state.stockName);
    }

    fetchStockData = async (stockName) => {
        try {
            const response = await fetch('/Stock_Price_Hist.csv');
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csvData = decoder.decode(result.value);

            const parsedData = Papa.parse(csvData, { header: true }).data;
            const stockData = parsedData.filter(row => row.STOCK === stockName);

            this.setState({ stockData });
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    render() {
        return (
            <div>
                <Navbar />
                
                <div style={{ backgroundColor:"red", marginTop: "5rem", marginLeft: "5rem"}}>
                    <h4><b>Stock Dashboard for {this.state.stockName}</b></h4>
                    <UserForm onStockNameChange={this.handleStockNameChange} />
                </div>

                <div style={{backgroundColor:"blue"}}>
                    <Cards />
                </div>

                <div >
                    <div style={{width: '100%'}}>
                        <Graph stockData={this.state.stockData} stockName={this.state.stockName} />
                    </div>
                </div>

                <div style={{ width: '100%', backgroundColor: "lightgrey"}}>
                    <div style={{ marginLeft: '3rem', marginRight: '3rem' }}>
                        <NewsTracker />
                    </div>
                </div>
                
                <div>
                </div>
            </div>
        );
    }
}

export default Dashboard;

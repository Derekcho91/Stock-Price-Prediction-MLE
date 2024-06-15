import React from "react";
import UserForm from "../UserInput/userinput";
import Navbar from "../Navbar/navbar";
import NewsTracker from "../NewsTicker/newsticker";
import "./dashboard.css";
import Graph from "../Graph/graph";
import Cards from "../Cards/card";
import axios from "axios";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        const today = new Date();
        const eightMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 8, today.getDate());

        this.state = {
            stockName: "AMD",
            startDate: eightMonthsAgo.toISOString().substr(0, 10),
            endDate: today.toISOString().substr(0, 10),
            stockData: [],
            currentOpenPrice: '',
            currentClosePrice: '',
            currentLowPrice: '',
            currentHighPrice: '',

        };

        this.handleStockNameChange = this.handleStockNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleStockNameChange = (stockName) => {
        this.setState({ stockName }, () => {
            this.fetchStockData(stockName, this.state.startDate, this.state.endDate);
        });
    };

    handleStartDateChange = (startDate) => {
        this.setState({ startDate }, () => {
            this.fetchStockData(this.state.stockName, startDate, this.state.endDate);
        });
    };

    handleEndDateChange = (endDate) => {
        this.setState({ endDate }, () => {
            this.fetchStockData(this.state.stockName, this.state.startDate, endDate);
        });
    };

    componentDidMount() {
        this.fetchStockData(this.state.stockName, this.state.startDate, this.state.endDate);
    }

    fetchStockData = async (stockName, startDate, endDate) => {
        const formattedStartDate = new Date(startDate).toLocaleDateString('en-GB'); // Assuming 'en-GB' locale for 'DD/MM/YYYY'
        const formattedEndDate = new Date(endDate).toLocaleDateString('en-GB');
        try {
            const response = await axios.post('https://kkpa7x2an0.execute-api.ap-southeast-1.amazonaws.com/Dev/Yahoo-Finance-Data', {
                headers: {
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                stock: stockName,
                s3_bucket_name: "webscrape-bucket-mle611",
                source_file: "stock_price_consolidated.csv",
                date_range: [
                    formattedStartDate,
                    formattedEndDate
                ]
            });

            console.log('Stock data:', response.data);

            const stockData = JSON.parse(response.data.body); // Parse the string to JSON
            console.log(stockData)

            console.log(stockData[stockData.length - 1]);

            this.setState({ currentClosePrice: stockData[stockData.length - 1].Close });
            this.setState({ currentOpenPrice: stockData[stockData.length - 1].Open });
            this.setState({ currentHighPrice: stockData[stockData.length - 1].High });
            this.setState({ currentLowPrice: stockData[stockData.length - 1].Low });


            this.setState({ stockData });
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "black" }}>
                <div>
                    <Navbar />
                </div>
                <div style={{ color: "white", marginTop: "1rem", marginLeft: "5rem" }}>
                    <h4><b>Stock Dashboard for {this.state.stockName}</b></h4>
                    <UserForm
                        stockName={this.state.stockName}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onStockNameChange={this.handleStockNameChange}
                        onStartDateChange={this.handleStartDateChange}
                        onEndDateChange={this.handleEndDateChange}
                    />
                </div>
                <div>
                    <Cards open={this.state.currentOpenPrice} close={this.state.currentClosePrice} low={this.state.currentLowPrice} high={this.state.currentHighPrice} />
                </div>
                <div style={{ width: '100%' }}>
                    <Graph stockData={this.state.stockData} stockName={this.state.stockName} />
                </div>
                <div style={{ width: '100%', backgroundColor: "black" }}>
                    <div style={{ marginLeft: '3rem', marginRight: '3rem' }}>
                        <NewsTracker stockName={this.state.stockName} startDate={this.state.startDate} endDate={this.state.endDate} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;

import React from "react";
import "./graph.css";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: [
                    {
                        label: '',
                        data: [],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            }
        };

        this.options = {
            scales: {
                x: {
                    type: 'category',
                    ticks: {
                        color: 'white', // Set x-axis label color to white
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Set y-axis label color to white
                    },
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Stock Price', // Title text
                    color: 'white', // Title color
                    font: {
                        size: 20, // Title font size
                    }
                },
                tooltip: {
                    titleColor: 'white', // Tooltip title color
                    bodyColor: 'white', // Tooltip body text color
                },
                legend: {
                    labels: {
                        color: 'white', // Legend label color
                    }
                }
            }
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stockData !== this.props.stockData || prevProps.stockName !== this.props.stockName) {
            this.updateChartData(this.props.stockData, this.props.stockName);
        }
    }

    updateChartData = (stockData, stockName) => {

        console.log(stockData);

        if (!stockData || stockData.length === 0) {
            return;
        }

        const newLabels = stockData.map(item => item.Date);
        const newClose = stockData.map(item => item.Close);

        this.setState({
            data: {
                labels: newLabels,
                datasets: [
                    {
                        label: stockName,
                        data: newClose,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            }
        });
    };

    render() {
        return (
            <div className="graph"> 
                <Line data={this.state.data} options={this.options} />
            </div>
        );
    }
}

export default Graph;

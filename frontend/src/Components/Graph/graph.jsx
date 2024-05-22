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
        this.data = {
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
        };
        this.options = {
            scales: {
                x: {
                    type: 'category',
                },
                y: {
                    beginAtZero: true
                }
            }
        };
    }

    componentDidUpdate(prevProps) {
        this.updateChartData(this.props.stockData);
    }

    updateChartData = (stockData) => {
        const newLabels = stockData.map(item => item.Date);
        const newClose = stockData.map(item => item.Close);
        const stockName = this.props.stockName;

        this.data = {
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
        };
    };

    render() {
        return (
            <div className="graph"> 
                <Line data={this.data} options={this.options} />
            </div>
        );
    }
}

export default Graph;

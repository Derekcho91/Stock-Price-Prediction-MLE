import React from "react";
import "./graph.css";
import Papa from 'papaparse';
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
            data:[],
            stockName:props.stockName
        }
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
        console.log(prevProps.stockName)
        console.log(this.state.stockName)
        //this.setState({ stockName: prevProps.stockName });
        //this.fetchStockData();

        // if (prevProps.stockName !== this.props.stockName) {
        //     this.setState({ stockName: this.props.stockName }, () => {
        //         
        //     });
        // }
    }

    componentDidMount() {
        this.fetchStockData();
      }

    fetchStockData = async () => {
        try {
          const response = await fetch('/Stock_Price_Hist.csv');
          const reader = response.body.getReader();
          const result = await reader.read();
          const decoder = new TextDecoder('utf-8');
          const csvData = decoder.decode(result.value);
    
          const parsedData = Papa.parse(csvData, { header: true }).data;

          const AMDStockData = parsedData.filter(row => row.STOCK === this.state.stockName);

          this.setState({ data: AMDStockData });
        
          const newLabels=[]
          const newClose=[]
          let stockName = ''

          this.state.data.map((item) => {
            //console.log(item.Date)
            newLabels.push(item.Date)
            newClose.push(item.Close)
            stockName=item.STOCK
          }
          );

          this.updateChartData(newLabels, stockName, newClose);
          
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      };

      updateChartData = (newLabels, stockName, newClose) => {
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

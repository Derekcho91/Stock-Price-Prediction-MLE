import React from "react"
import "./graph.css"
import { Line } from 'react-chartjs-2';


class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        }
    }


    render() {

        return (

            <div classname="graph">
                {/* <Line data={this.data} /> */}


            </div>
        )
    }

};

export default Graph;

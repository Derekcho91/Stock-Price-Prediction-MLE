import React from "react";
import "./cards.css";

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: [
                { title: "Open Price", value: 1500 },
                { title: "Close Price", value: 3200 },
                { title: "Low Price", value: 850 },
                { title: "High Price", value: 1240 },
            ],
        };
    }

    render() {
        return (
            <div className="container mt-1">
                <div className="row">
                    {this.state.cardData.map((card, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card text-center mb custom-card">
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text display-4"><b>${card.value}</b></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Cards;

import React from "react";
import "./cards.css";

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: [
                { title: "Open Price", value: props.open },
                { title: "Close Price", value: props.close },
                { title: "Low Price", value: props.low },
                { title: "High Price", value: props.high },
            ],
        };
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.open !== prevProps.open ||
            this.props.close !== prevProps.close ||
            this.props.low !== prevProps.low ||
            this.props.high !== prevProps.high) {
            this.setState({
                cardData: [
                    { title: "Open Price", value: this.props.open },
                    { title: "Close Price", value: this.props.close },
                    { title: "Low Price", value: this.props.low },
                    { title: "High Price", value: this.props.high },
                ]
            });
        }
    }

    render() {
        const formattedCardData = this.state.cardData.map((card, index) => ({
            ...card,
            value: parseFloat(card.value).toFixed(2) // Format value to 2 decimal places
        }));

        return (
            <div className="container mt-1">
                <div className="row">
                    {formattedCardData.map((card, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card text-center mb custom-card" style={{ backgroundColor: "black" }}>
                                <div className="card-body" style={{ color: "white" }}>
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

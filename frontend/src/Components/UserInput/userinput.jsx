import React from "react"
import "./userinput.css"
import Axios from "axios";



class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stockName: "",
            defaultStockName:"AMD"
            // stockPrice: "",
            // confidence: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleSubmit(e) {
        e.preventDefault();

        const stockName = e.target.elements.stockName.value;
        console.log(stockName)
        this.props.onStockNameChange(stockName)
        //this.props.onStockNameChange(stockName, () => {
        //console.log(this.props.stockName);
    //});

        // Axios.post("")
        // .then()
        // .catch((err) => {console.log(err)});
    }   

    handleChange(e) {
        this.state.stockName = e.target.value;
        console.log("here")
        console.log(this.state.stockName)
        if(this.state.stockName == '')
            {
                this.state.stockName=this.state.defaultStockName    
            }
        this.props.onStockNameChange(this.state.stockName)
        //this.handleSubmit(e);
        // this.setState({ stockName }, () => {
        //     this.handleSubmit(e);
        // });
    }

    render() {

        return (

            <div className="userform" style={{width:"15%"}}>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        {/* <legend>Stock Details</legend> */}
                        <div className="mb-3">
                            {/* <label htmlFor="stockName" className="form-label">Stock Name</label> */}
                            <select name="stockName" className="form-control" id="stockName" required onChange={this.handleChange}
                                value={this.state.stockName}>
                                <option value="">Select Stock</option>
                                <option value="AAPL">AAPL</option>
                                <option value="AMD">AMD</option>
                                <option value="AMZN">AMZN</option>
                                <option value="GOOGL">GOOGL</option>
                                <option value="META">META</option>
                                <option value="MSFT">MSFT</option>
                                <option value="NVDA">NVDA</option>
                            </select>
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="disabledTextInput" className="form-label">Stock Price</label>
                            <input type="text" name="stockPrice" className="form-control" placeholder="stock price" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="disabledTextInput" className="form-label">Confidence</label>
                            <input type="text" name="confidence" className="form-control" placeholder="confidence" required />
                        </div> */}

                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                    </fieldset>
                </form>

            </div>
        )
    }

}

export default UserForm;
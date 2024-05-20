import React from "react"
import "./userinput.css"
import Axios from "axios";



class UserForm extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            stockName:"",
            stockPrice:"",
            confidence:"",
        }

        this.handleSubmit=this.handleSubmit.bind(this);

    }


    handleSubmit(e)
    {
        e.preventDefault();

        console.log(e.target.elements.stockName.value)

        // Axios.post("")
        // .then()
        // .catch((err) => {console.log(err)});
    }

    render() {

        return (

            <div className="userform">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Stock Details</legend>
                        <div className="mb-3">
                            <label htmlFor ="disabledTextInput" className="form-label">Stock Name</label>
                            <input type="text" name="stockName" className="form-control" placeholder="stock name" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor ="disabledTextInput" className="form-label">Stock Price</label>
                            <input type="text" name="stockPrice" className="form-control" placeholder="stock price" required/>   
                        </div>
                        <div className="mb-3">
                            <label htmlFor ="disabledTextInput" className="form-label">Confidence</label>
                            <input type="text" name="confidence" className="form-control" placeholder="confidence" required/> 
                            
                           
                            
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>

            </div>
        )
    }

}

export default UserForm;
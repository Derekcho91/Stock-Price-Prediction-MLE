import React, { Component } from 'react';
import Papa from 'papaparse';
import './newsticker.css'; // Import the CSS file

class NewsTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      const response = await fetch('/news_data_2024-05-21.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result.value);

      // Parse CSV data using papaparse
      const parsedData = Papa.parse(csvData, { header: true }).data;
      this.setState({ news: parsedData });
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  render() {
    const { news } = this.state;

    return (
      
      <div style={{width:"100%"}}>

      

      <div className="row py-2">
        <div className="col-2 col-sm-1 col-md-3 col-lg-2 py-1 pe-md-0 mb-md-1">
          <div className="d-inline-block d-md-block bg-primary text-white text-center breaking-caret py-1 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-lightning-fill" viewBox="0 0 16 16">
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
            </svg>
            <span className="d-none d-md-inline-block">Stock news</span>
          </div>
        </div>

        <div className="col-10 col-sm-11 col-md-9 col-lg-10 ps-1 ps-md-2">
          <div className="breaking-box pt-2 pb-1">

            <marquee behavior="scroll" direction="left">

              {news.map((item, index) => (

                <a className="h6 fw-normal" href={item.URL}><span className="position-relative mx-2 badge bg-primary rounded-0">{item.Stock}</span>{item.Title}</a>

              ))}

              Hi

            </marquee>
          </div>
        </div>
      </div>

    </div>

    );
  }
}

export default NewsTicker;

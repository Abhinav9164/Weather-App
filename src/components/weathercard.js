import React from 'react'


export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        if(!this.props.default)
        return (
            <div className="weather-card row">
                <div className="col">
                    <div>
                        <span className="cityName">{this.props.city}</span>
                        <span className="countryCode">{ this.props.country}</span>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span style={{fontStyle: "italic", fontSize: "13px", margin: "0 0 5px 30px"}}>min temp</span>
                            <span className="min-max-temp">{this.props.minTemp + " "}<sup>&deg;</sup>C </span>
                        </div>
                        <div className="col">
                        <span style={{fontStyle: "italic", fontSize: "13px", margin: "0 0 5px 30px"}}>max temp</span>
                            <span className="min-max-temp">{this.props.maxTemp + " "}<sup>&deg;</sup>C </span>
                        </div>
                    </div>
                </div>
                <div className="col">
                        <div className="wheather-details-badge row">
                            <div className="title">Temperature</div>
                            <div className="data">{this.props.temp + " "}<span className="unit"><sup>&deg;</sup>C</span></div>
                        </div>
                        <div className="wheather-details-badge row">
                            <div className="title">Humidity </div>
                            <div className="data">{this.props.humidity + " "} <span className="unit">%</span></div>
                        </div>
                        <div className="wheather-details-badge row">
                            <div className="title">Weather </div>
                            <div className="data">{this.props.description}</div>
                        </div>
                </div>
            </div>
        )
        else 
        return <h1 style={{color: "#fff", textAlign: "center"}}>Search weather for you city</h1>
    }
}
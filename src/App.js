import React from 'react';
import './App.css';
import cities from './cities.json'
import { fetchWeather } from './components/fetchWeather'
import WeatherCard from './components/weathercard'

class App extends React.Component {
  constructor() {
    super()
    this.data = cities.map((val) => val.name.toLowerCase())
    this.state = {
      suggestions: [],
      cityName: "",
      search: "",
      inputCheck: this.search ? true : false,
      data: []
    }
  }

  handleChange = e => {
    e.persist();
    const value = e.target.value;
    let suggestions = [];
    if(value.length > 0) {
        const regex = new RegExp(`^${value}`, 'i')
        suggestions = this.data.sort().filter(v => regex.test(v))
    }
    this.setState(() => ({suggestions: suggestions, cityName: value}))
  }

  clearSearch = () => {
    this.setState(prev => {
      return {
      suggestions: [],
      cityName: "",
      search: "",
      inputCheck: false,
      data: []
    }})
    console.log(this.state)
  }

  setSearch = () => {
    this.setState(prev => {
      return {
      search: prev.cityName
    }})
    if(this.state.search.length > 0)
      this.search();
  }

  setCity = e => {
    const cityName = e.target.innerHTML;
    this.setState({
      cityName: cityName, 
      suggestions: [],
      search: cityName,
      inputCheck: true
    })
  }

  search = async (e) => {
      const data = await fetchWeather(this.state.search);
      // console.log(data);
      this.setState({ data: [data] });
      console.log(this.state.data.length)
  }

  renderSuggestions = () => {
    const { suggestions } = this.state
    if(suggestions.length === 0) {
        return null
    }
    return (
      <div className="suggestion-list">
        <ul type="none">
          {suggestions.map((val, index) => {
                return( 
                  <li key={index}>
                      <button className="list-item" onClick={e => this.setCity(e)}>{val}</button>
                  </li>) }
          )}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="search-bar">
          <div className="search-header">
            <i className="fas fa-search-location" />
            <input type="type" onKeyPress={(e) => {if(e.key === 'Enter' && this.state.inputCheck === true) this.search()}} placeholder="Type city name here" value={this.state.cityName} onChange={e => this.handleChange(e)} />
            <button onClick={this.clearSearch} disabled={this.state.cityName.length>0 ? false : true} ><i style={{color: this.state.cityName.length > 0 ? "#ff5959" : "grey" }} className="fas fa-times" /></button>
            <button onClick={this.setSearch} disabled={this.state.inputCheck ? false : true} ><i style={{color: this.state.inputCheck ? "#7f81d6" : "grey" }} className="fas fa-angle-double-right" /></button>
          </div>
          {this.state.suggestions[0] === this.state.cityName ? this.setState(prev => {return {search: prev.cityName, suggestions: [], inputCheck: true}}) : this.renderSuggestions() }
        </div>
        {this.state.data.length > 0
          ? 
          <WeatherCard 
            default = {false}
            city = {this.state.data[0].name}
            minTemp = {this.state.data[0].main.temp_min}
            maxTemp = {this.state.data[0].main.temp_max}
            temp = {this.state.data[0].main.temp}
            humidity = {this.state.data[0].main.humidity}
            description = {this.state.data[0].weather[0].description}
            country = {this.state.data[0].sys.country}
          />
          :
          <WeatherCard 
            default = {true}
          />
        }
        
      </div>
    );
    }
}

export default App;

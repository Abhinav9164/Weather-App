import React from 'react';
import cities from '../cities.json';

const list = cities.map((val, i) => {
    return (
        <li key={i}>
            <button className="list-item">{val.name.toLowerCase()}</button>
        </li> 
    )
})

export default class App extends React.Component {
    render() {
        return (
            <div className="suggestion-list">
                <ul type="none">
                    {list}
                </ul>
            </div>
        )
    }
}
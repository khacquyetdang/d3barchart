import React, { Component } from 'react';
import BarChart from './BarChart.jsx';
import SimpleBarChart from './SimpleBarChart.jsx';
import './styles/App.css';

class App extends Component {
    render() {
        var dataJson = require('../data/GDP-data.json');

        return (
            <div className="App">
                { /*<SimpleBarChart />*/}
                <div className="AppContainer">
                    <div><h1>Gross Domestic Product</h1></div>
                    <BarChart dataSource={dataJson}/>
                    <div><p className="description">{ dataJson.description }</p></div>
                </div>
            </div>
        );
    }
}

export default App;

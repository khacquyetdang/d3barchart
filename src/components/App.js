import React, { Component } from 'react';
import { connect } from 'react-redux';
import BarChart from './BarChart.jsx';
import SimpleBarChart from './SimpleBarChart.jsx';
import Controls from './Controls.jsx';
import './styles/App.css';
import { fetchCountries } from '../actions'
class App extends Component {


    componentDidMount(){
        this.props.fetchCountries();
    }

    render() {
        var dataJson = require('../data/GDP-data.json');

        return (
            <div className="App">
                { /*<SimpleBarChart />*/}
                <div className="AppContainer">
                    <Controls></Controls>
                    <div></div>
                    <BarChart />
                </div>
            </div>
        );
    }
}

export default connect(null, {fetchCountries }) (App);

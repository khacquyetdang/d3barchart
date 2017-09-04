import React, { Component } from 'react';
import BarChart from './BarChart.jsx';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <BarChart size={[1000,450]} />
      </div>
    );
  }
}

export default App;

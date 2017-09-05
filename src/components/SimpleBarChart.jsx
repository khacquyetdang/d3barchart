import React, { Component } from 'react';
import './styles/SimpleBarChart.css';
import { scaleLinear, scaleOrdinal, scaleBand} from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import d3tip from 'd3-tip';
import moment from 'moment';

class SimpleBarChart extends Component {
    constructor(props){
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount() {
        this.createBarChart()

        //this.createBarChartSimple();
    }

    componentDidUpdate() {
        this.createBarChart()
        //this.createBarChartSimple();
    }


    createBarChart = () => {
        var width = 420,
        height = 420;

        var margin = {top: 20, right: 30, bottom: 30, left: 40};
        var data = [
            {name: "Locke",    value:  4},
            {name: "Reyes",    value:  8},
            {name: "Ford",     value: 15},
            {name: "Jarrah",   value: 16},
            {name: "Shephard", value: 23},
            {name: "Kwon",     value: 42}
        ];

        const node = this.node;

        var chart = select(node).attr("width", width + margin.left + margin.right)
        .attr("height", height  + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dataNames = data.map(item => item.name);

        var x = scaleBand().rangeRound([0, width]);
        x.padding(0.2);
        x.domain([0, dataNames.length]);

        const y = scaleLinear().domain([0, max(data, function(d) { return d.value; })]).rangeRound([height, 0]);

        var barWidth = width / data.length;

        //chart.attr("height", height);


        var yAxis = axisLeft(y);
        var xAxis = axisBottom(x);


        chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        chart.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis.ticks(10, "%"));


        var bar = chart.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")
        .attr("class", ".bar")
        .attr("transform", function(d, i) {
             return "translate(" + x(i) + ",0)";
          });

        //.attr("transform", function(d, i) { return "translate(0," + i * barWidth + ")"; });



        bar.append("rect")
        //.attr("x", function(d, i) { return i * barWidth; })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return (height - y(d.value));})
        .attr("width", x.bandwidth())
        .attr("class", "chartRect");

        bar.append("text")
        .attr("x", function(d, i) { return (barWidth - 1) / 2; })
        //.attr("x", function(d, i) { return i * barWidth; })
        .attr("y", function(d) { return y(d.value) + 15; })
        .attr("dy", ".75em")
        .text(function(d) { return ( d.value + "-" + Math.floor(y(d.value))); })
        .attr("class", "chartText");

    }

    render() {
        return (
            <div className="SimpleBarChart">
                <svg className="chart" ref={node => this.node = node}>
                </svg>
            </div>)
    }
}
export default SimpleBarChart

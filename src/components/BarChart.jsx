import React, { Component } from 'react';
import './styles/BarChart.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import d3tip from 'd3-tip';
import moment from 'moment';

class BarChart extends Component {
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

    createBarChartSimple = () => {
        const node = this.node;

        select(node)
        .selectAll("p")
        .data([4, 8, 15, 16, 23, 42])
        .style('color', 'red')
        .style("font-size", function(d) { return d + "px"; });

        select(node)
        .selectAll("p")
        .data([4, 8, 15, 16, 23, 42])
        .text(function(d) { return d; });

        select(node)
        .selectAll("p")
        .data([4, 8, 15, 16, 23, 42])
        .enter().append("p")
        .text(function(d) { return "I’m number " + d + "!"; });
    }

    createBarChart = () => {
        var dataJson = require('../data/GDP-data.json');
        var maxGDPOverYear = max(dataJson.data, function(gdpYearValueArr) {
            return gdpYearValueArr[1];
        });
        var gdpValues = dataJson.data.map(function(gdpYearValueArr) {
            return gdpYearValueArr[1];
        });

        const node = this.node;
        const dataMax = maxGDPOverYear;
        const yScale = scaleLinear().domain([0, dataMax]).range([0, this.props.size[1]]);
        const xScale = scaleLinear().domain([0, dataJson.data.length]).range([0, this.props.size[0]]);

        /* Initialize tooltip */
        var tip = d3tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            var dateD = new Date(d[0]);
            var monthYear = moment(dateD).format('Y - MMMM');
            var money = '$' + d[1] + " Billion";
            return  "<div class=\"tooltip\"> <div class=\"tooltipMoney\"> " + money +
            "  </div><div class=\"tooltipMonthYear\"> " + monthYear + " </div> </div>";
        });


        var enterNode = select(node)
        .selectAll('rect')
        .data(dataJson.data)
        .enter()
        .append('rect')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

        enterNode.call(tip);


        select(node)
        .selectAll('rect')
        .data(dataJson.data)
        .exit()
        .remove();


        select(node)
        .selectAll('rect')
        .data(dataJson.data)        
        .attr('x',  (d,i) => {
            return (xScale(i));
        })
        .attr('y', (d) => {
            return this.props.size[1] - yScale(d[1]);
        })
        .attr('height',
        function(d){
            return yScale(d[1]);
        })
        .attr('width', 5)
        .attr('class','rectgdp');

    }

    render() {
        return (
            <div className="BarChart">
                <svg ref={node => this.node = node}
                    width={this.props.size[0]} height={this.props.size[1]}>
                </svg>
            </div>)
    }
}
export default BarChart

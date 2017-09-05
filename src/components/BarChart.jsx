import React, { Component } from 'react';
import './styles/BarChart.css';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max, min } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import d3tip from 'd3-tip';
import moment from 'moment';
import { timeDay, timeYear, timeMonth  } from 'd3-time';

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

    createBarChart = () => {
        var dataSource = this.props.dataSource;

        var maxGDPOverYear = max(dataSource.data, function(gdpYearValueArr) {
            return gdpYearValueArr[1];
        });

        var maxDate = max(dataSource.data, function(gdpYearValueArr) {
            return new Date(gdpYearValueArr[0]);
        });
        var minDate = min(dataSource.data, function(gdpYearValueArr) {
            return new Date(gdpYearValueArr[0]);
        });

        var gdpValues = dataSource.data.map(function(gdpYearValueArr) {
            return gdpYearValueArr[1];
        });

        const node = this.node;

        const dataMax = maxGDPOverYear;
        var width = 1000;
        var height = 400;
        var margin = {top: 20, right: 30, bottom: 30, left: 50};

        var yScale = scaleLinear().rangeRound([height, 0]);
        yScale.domain([0, dataMax]);



        // var xScale = scaleBand().rangeRound([0, width]);//.padding(0.1);
        // xScale.domain(dataJson.data.map(
        //     function(datum) {
        //         var dateD = new Date(datum[0]);
        //         //return dateD;
        //         return moment(dateD).format('Y-M');
        //     } ));
        //

        var xScale = scaleBand().range([0, width]).paddingOuter(0.5);
        xScale.domain(dataSource.data.map(
             function(datum) {
                 return datum[0];
                 var dateD = new Date(datum[0]);
                 //return dateD;
                 return moment(dateD).format('Y-M');
             } ));

        var barWidth = Math.ceil(width  / dataSource.data.length);
        //var barWidth = 1;
        var tip = d3tip()
        .attr('class', 'd3-tip')
        .offset([5, 0])
        .html(function(d) {
            var dateD = new Date(d[0]);
            var monthYear = moment(dateD).format('Y - MMMM');
            var money = '$' + d[1] + " Billion";
            return  "<div class=\"tooltip\"> <div class=\"tooltipMoney\"> " + money +
            "  </div><div class=\"tooltipMonthYear\"> " + monthYear + " </div> </div>";
        });


        var yAxis = axisLeft(yScale);
        var xAxis = axisBottom(xScale);


        var mainNode = select(node);

        var enterNode = mainNode.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //
        enterNode.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis.ticks(timeMonth.every(12)));

        enterNode.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis.ticks(10, ",f"));

        enterNode.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 25)
        .attr("x", -215)
        .attr("class", "yAxisLabel")
        .text(dataSource.name);


        enterNode.selectAll('.rectgdp')
        .data(dataSource.data)
        .enter().append("rect")
        .attr('class','rectgdp')
        .attr("x", function(d) {
            //var dd = new Date(d[0]);
            //return xScale(moment(dd).format('Y-M'));
            return xScale(d[0]);
        })
        .attr("y", function(d) { return yScale(d[1]); })
        //.attr('width', barWidth)
        .attr('width', xScale.bandwidth())
        .attr('height',
        function(d){
            return height - yScale(d[1]);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

        enterNode.call(tip);

        var xAxis = enterNode.select(".axis--x");
        var ticks = xAxis.selectAll(".tick text");

        var lines = xAxis.selectAll(".tick line");

        lines.attr("class", function(d,i){
            if(i%4 != 0) {
                select(this).remove();
            }
        });

        ticks.attr("class", function(d,i){
            if(i%20 != 0) {
                select(this).remove();
            }
            else {
                var dd = new Date(d);
                select(this).text(moment(dd).format('Y'));
            }
        });
    }

    render() {
        return (
            <div className="BarChart">
                <svg ref={node => this.node = node}>
                </svg>
            </div>)
    }
}
export default BarChart

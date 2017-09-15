import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max, min } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import d3tip from 'd3-tip';
import moment from 'moment';
import { timeDay, timeYear, timeMonth } from 'd3-time';
import './styles/BarChart.css';

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCountriesFetching: this.props.isCountriesFetching,
        };
    }

    componentWillReceiveProps(nextProps)
    {
        this.props = nextProps;
        this.setState(
            {
                isCountriesFetching: this.props.isCountriesFetching,
            }
        );
        this.createBarChart();
        //this.props.fetchCountryGdp(this.state.selectValue, this.state.intervalDate);
    }

    componentDidMount() {
        this.createBarChart();
        //this.createBarChartSimple();
    }

    componentDidUpdate() {
        this.createBarChart();
        //this.createBarChartSimple();
    }

    createBarChart = () => {

        var dataSource = this.props.countryGdp;

        dataSource = dataSource.map(function(gdpByYear) {
            return Object.assign({},
                gdpByYear, {
                    value: parseInt(gdpByYear.value) / 1000000000,
                    date: parseInt(gdpByYear.date)
                }
            );
        });

        dataSource = dataSource.sort(
            function(a, b) {
                return a.date-b.date;
            }
        );

        if (dataSource === undefined || dataSource === null || dataSource.length === 0)
        {
            return ;
        }

        var maxGDPOverYear = max(dataSource, function(gdpByYear) {
            return gdpByYear.value;
        });

        var maxDate = max(dataSource, function(gdpByYear) {
            return gdpByYear.date;
        });

        var minDate = min(dataSource, function(gdpByYear) {
            return gdpByYear.date;
        });

        var gdpValues = dataSource.map(function(gdpByYear) {
            return gdpByYear.value;
        });

        const node = this.node;

        const dataMax = maxGDPOverYear;
        var width = 960;
        var height = 500;

        var margin = {top: 40, right: 10, bottom: 30, left: 10};

        var yScale = scaleLinear().rangeRound([height, 0]);
        yScale.domain([0, dataMax]);


        var xScale = scaleBand().range([0, width]).paddingOuter(0.6).paddingInner(0.1);

        xScale.domain(dataSource.map(
            function(datum) {
                return datum.date;
            })
        );

        var barWidth = Math.ceil(width  / dataSource.length);
        //var barWidth = 1;
        var tip = d3tip()
        .attr('class', 'd3-tip')
        .offset([5, 0])
        .html(function(d) {
            var money = '$' + Math.ceil(d.value) + " Billion";
            //return '<div className="tooltip">' + money + " date "+ d.date + "</div>";
            return  "<div class=\"tooltip2\"> <div class=\"tooltipMoney\"> " + money +
            "  </div><div class=\"tooltipMonthYear\"> " + d.date + " </div> </div>";
        });


        var yAxis = axisLeft(yScale);
        var xAxis = axisBottom(xScale);


        var mainNode = select(node);

        mainNode.selectAll("*").remove();

        var widthWithMargin = width + margin.left + margin.right;
        var heightWithMargin = height + margin.top + margin.bottom;


        mainNode.append("text")
        .attr("y", 30)
        .attr("x", widthWithMargin / 3)
        .attr("class", "labelTitle")
        .text("Gross Domestic Product");

        var enterNode = mainNode.attr("width", widthWithMargin)
        .attr("height", heightWithMargin)
        .attr("viewBox", "0 0 " + widthWithMargin + " " + heightWithMargin)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //
        enterNode.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        enterNode.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis.ticks(10, ",f"));

        enterNode.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 25)
        .attr("x", -225)
        .attr("class", "yAxisLabel")
        .attr("font-size", 20)
        .text("GDP in Billions, " + dataSource[0].country.value);



        enterNode.selectAll('.rectgdp')
        .data(dataSource)
        .enter().append("rect")
        .attr('class','rectgdp')
        .attr("x", function(d) {
            //var dd = new Date(d[0]);
            //return xScale(moment(dd).format('Y-M'));
            return xScale(d.date);
        })
        .attr("y", function(d) { return yScale(d.value); })
        //.attr('width', barWidth)
        .attr('width', xScale.bandwidth())
        .attr('height',
        function(d){
            return height - yScale(d.value);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

        enterNode.call(tip);

        var xAxis = enterNode.select(".axis--x");
        var ticks = xAxis.selectAll(".tick text");

        var lines = xAxis.selectAll(".tick line");

        var steps = Math.ceil(dataSource.length / 16);

        lines.attr("class", function(d,i) {
            if((i%steps) !== 0) {
                select(this).remove();
            }
        });

        ticks.attr("class", function(d,i) {
            if((i%steps) !== 0) {
                select(this).remove();
            }
        });
    }

    render() {
        return (
            <div className="BarChart">
                <svg id="chart" ref={node => this.node = node}>
                </svg>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    console.log("BarChart mapStateToProps: ");
    console.log(state.countryGdp);
    const {
        isCountryGDPFetching,
        countryGdp
    } = state;

    return {
        isCountryGDPFetching,
        countryGdp
    }
}
export default connect(mapStateToProps) (BarChart);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
//import { form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './styles/Controls.css';
import Select  from 'react-select';

const autraliaState =  [
    { value: 'australian-capital-territory', label: 'Australian Capital Territory', },
    { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSWttt' },
    { value: 'victoria', label: 'Victoria', className: 'State-Vic' },
    { value: 'queensland', label: 'Queensland', className: 'State-Qld' },
    { value: 'western-australia', label: 'Western Australia', className: 'State-WA' },
    { value: 'south-australia', label: 'South Australia', className: 'State-SA' },
    { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' },
    { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' },
];

class Controls extends Component {

    constructor(props){
        super(props);
        this.state = {
            disabled: false,
            searchable: this.props.searchable,
            clearable: true,
            selectValue: 'FR',
            isCountriesFetching : true,
            countriesOptions : []
        };
    }

    componentWillReceiveProps(nextProps)
    {
        this.props = nextProps;
        var countriesOptions = this.props.countries.map((country) => {
            return { value : country.iso2Code,
            label : country.name };
        });
        this.setState({isCountriesFetching: this.props.isCountriesFetching,
        countriesOptions,
        selectValue: 'FR'});

    }


    getValidationState = () => {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    logChange = (val) => {
        console.log("Selected: " + JSON.stringify(val));
    }


    render() {
        const { value, suggestions } = this.state;

        return (
            <div className="Controls">
                <Select ref="stateSelect"
                    autofocus options={this.state.countriesOptions}
                    simpleValue clearable={this.state.clearable}
                    name="selected-state"
                    disabled={this.state.disabled}
                    value={this.state.selectValue}
                    onChange={this.updateValue}
                    searchable={this.state.searchable}
                    isLoading={this.state.isCountriesFetching}/>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    const { countries, isCountriesFetching } = state;
    return {
        countries,
        isCountriesFetching
    }
}
export default connect(mapStateToProps, null) (Controls);;

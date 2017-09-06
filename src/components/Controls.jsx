import React, { Component } from 'react';
import { form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './styles/Controls.css';

class Controls extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
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

    render() {

        return (
            <div className="Controls">
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                        >
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Enter a country name"
                            onChange={this.handleChange}
                            />
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default Controls;

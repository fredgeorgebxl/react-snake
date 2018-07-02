
import React, { Component } from "react";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
        skin: state.skin,
        speed: state.startSpeed };
};

class ConnectedOptions extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={`options options--${this.props.visible ? 'visible' : 'hidden'}`}>
                
            </div>
        );
    }
}

const Options = connect(mapStateToProps) (ConnectedOptions);

export default Options;

import React, { Component } from "react";
import { connect } from 'react-redux';
import Select from 'react-select';
import Slider from 'rc-slider/lib/Slider';

import { SKINS } from '../constants';
import { setInitSpeed, setSkin } from '../actions/index';

import 'rc-slider/assets/index.css';

const mapDispatchToProps = dispatch => {
    return {
        setInitSpeed: speed => dispatch(setInitSpeed(speed)),
        setSkin: skin => dispatch(setSkin(skin)),
        resetScore: () => dispatch(resetScore()),
        setSpeed: speed => dispatch(setSpeed(speed)),
    };
};

const mapStateToProps = state => {
    return { 
        skin: state.skin,
        speed: state.startSpeed };
};

class ConnectedOptions extends Component {
    constructor(props){
        super(props);
    }

    changeSkin = (skin) => {
        this.props.setSkin(skin.value);
    }

    render() {
        return (
            <div className={`options options--${this.props.visible ? 'visible' : 'hidden'}`}>
                <div className="options__close-btn" onClick={this.props.closePannel}><span className="genericons-neue genericons-neue-close"></span></div>
                <div className="o-container">
                    <label>Initial speed</label>
                    <Slider defaultValue={this.props.speed} min={1} max={5} />
                    <label>Skin</label>
                    <Select 
                        value={this.props.skin} 
                        onChange={this.changeSkin}
                        options={SKINS.map( val => { return {value: val, label: val.charAt(0).toUpperCase() + val.slice(1)}})} />
                </div>
            </div>
        );
    }
}

const Options = connect(mapStateToProps, mapDispatchToProps) (ConnectedOptions);

export default Options;
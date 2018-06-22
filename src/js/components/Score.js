import React, { Component } from "react";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
        score: state.score,
        speed: state.speed
    };
};

const ConnectedScore = ({score, speed}) => (
    <div className="score">
        <div className="score__score-pannel"><p className="label">Score: </p>{score}</div>
        <div className="score__speed-pannel"><p className="label">Speed: </p>{speed}</div>
    </div>
);

const Score = connect(mapStateToProps) (ConnectedScore);

export default Score;
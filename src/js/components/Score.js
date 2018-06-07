import React, { Component } from "react";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { score: state.score };
};

const ConnectedScore = ({score}) => (
    <div className="score-pannel">{score}</div>
);

const Score = connect(mapStateToProps) (ConnectedScore);

export default Score;
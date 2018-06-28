import React, { Component } from "react";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { grid: state.grid };
};

class ConnectedCanvas extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="canvas o-container" style={{width: this.props.width * 10 + 'px', height: this.props.height * 10 + 'px' }} >
                {
                    this.props.grid.map((x,i) => <div key={i} className={`canvas__cell-` + x}>&nbsp;</div>)
                }
            </div>
        );
    }
}

const Canvas = connect(mapStateToProps) (ConnectedCanvas);

export default Canvas;
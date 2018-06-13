import React, { Component } from "react";
import Canvas from './components/Canvas';
import Score from './components/Score';
import { CANVAS_SIZE, DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, INITIAL_SIZE } from './constants';
import { connect } from 'react-redux';
import { updateGrid, increaseScore, resetScore, setSpeed } from './actions/index';
import { initPos, initTrail, initCells, addSnake, addApple, moveSnake, updateTrail, getFreeIndex, checkAppleCollision, checkTrailCollision } from './actions/game-actions';

const mapDispatchToProps = dispatch => {
    return {
        updateGrid: grid => dispatch(updateGrid(grid)),
        increaseScore: score => dispatch(increaseScore(score)),
        resetScore: () => dispatch(resetScore()),
        setSpeed: speed => dispatch(setSpeed(speed)),
    };
};

const mapStateToProps = state => {
    return {
        skin: state.skin,
        speed: state.speed
    };
};


class ConnectedApp extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(){
        var startPos = initPos(CANVAS_SIZE.width, CANVAS_SIZE.height);
        return {
            position: startPos,
            dir: DIRECTION_UP,
            prevDir: null,
            dirChange: false,
            size: INITIAL_SIZE,
            trail: initTrail(startPos),
            allowDirChange: true,
            appleIndex: -1,
            apples: 0,
            lost: false,
            pause: true,
            speed: this.props.speed,
            prevStage: 0
        }
    }

    processScore(speed) {
        return 7 + Math.round(Math.pow(speed / 3, 2));
    }

    getNextStage(speed){
        return this.state.prevStage + 6 + Math.round(Math.pow((speed)/2, 1.5));
    }

    getInterval(speed){
        return 1000/speed;
    }

    handleKey = (e) => {
        var direction = e.key;
        
        if(direction == ''){
            console.log(direction);
            this.setState({pause: !this.state.pause});
        }
        if (this.state.allowDirChange || direction == ' '){
            switch (direction) {
                case 'ArrowUp':
                    if(this.state.dir != DIRECTION_DOWN){
                        this.setState({dir: DIRECTION_UP});
                        this.setState({allowDirChange: false});
                    }
                    break;
                case 'ArrowDown':
                    if(this.state.dir != DIRECTION_UP){
                        this.setState({dir: DIRECTION_DOWN});
                        this.setState({allowDirChange: false});
                    }
                    break;
                case 'ArrowLeft':
                    if(this.state.dir != DIRECTION_RIGHT){
                        this.setState({dir: DIRECTION_LEFT});
                        this.setState({allowDirChange: false});
                    }
                    break;
                case 'ArrowRight':
                    if(this.state.dir != DIRECTION_LEFT){
                        this.setState({dir: DIRECTION_RIGHT});
                        this.setState({allowDirChange: false});
                    }
                    break;
                case ' ': 
                    if(this.state.lost){
                        this.setState(this.getInitialState());
                        this.setState({pause: false});
                        this.props.resetScore();
                    } else {
                        this.setState({pause: !this.state.pause});
                    }
                    break;
            }
        }
    }

    gameLoop = () => {
        if (! this.state.lost && ! this.state.pause){
            // init the canvas
            var grid = initCells(CANVAS_SIZE.width, CANVAS_SIZE.height);

            // check collision with apple
            var eatApple = checkAppleCollision(this.state.position, this.state.appleIndex);

            
            // Add the snake to the canvas
            grid = addSnake(grid, this.state.position, this.state.trail);

            // if there's no apple
            if(this.state.appleIndex == -1){
                // get a free space to place apple
                this.setState({appleIndex: getFreeIndex(grid)});
            } else if (eatApple){
                //if apple is eaten
                this.props.increaseScore(this.processScore(this.state.speed)); // increase score
                this.setState({appleIndex: -1, apples: this.state.apples + 1}); // make the apple disappear and increase counter
                // Check if a next stage is reached
                var nextStage = this.getNextStage(this.state.speed)
                if (this.state.apples >= nextStage){
                    this.setState({speed: this.state.speed + 1, prevStage: nextStage});
                }
            }
            // Add the apple to the canvas
            grid = addApple(grid, this.state.appleIndex);

            // Update the canvas to be rendered
            this.props.updateGrid(grid);

            // Update game state
            this.setState({
                lost: checkTrailCollision(this.state.position, this.state.trail), // set lost if the trail is touched
                position: moveSnake(this.state.position, this.state.dir), // update the position
                trail: updateTrail(this.state.trail, this.state.position, eatApple), // update the trail
                allowDirChange: true, // allow a new direction change
            });
        }
        this.timerID = setTimeout(
            () => {
                this.gameLoop();
            },
            1000/this.state.speed
        );
    }

    componentDidMount = () => {       
        this.gameLoop();
    }

    componentWillUnmount(){
         clearTimeout(this.timerID);
    }

    render() {
      return (
        <div className={`main-canvas ` + this.props.skin} onKeyDown={this.handleKey} tabIndex="0">
            <div className="o-container">
                <header className="u-text-center">
                    <h1>React Snake</h1>
                    <div className="intro">A snake game in HTML and javascript made with React</div>
                </header>
                <div className="o-grid">
                    <div className="o-grid__col u-2/3 u-text-center u-p">
                        <Canvas width={CANVAS_SIZE.width} height={CANVAS_SIZE.height} handleKey={this.handleKey} />
                    </div>
                    <div className="o-grid__col u-1/3 u-text-center u-p">
                        <Score />
                    </div>
                </div>
            </div>
        </div>
      );
    }
}
const App = connect(mapStateToProps, mapDispatchToProps) (ConnectedApp);

export default App;
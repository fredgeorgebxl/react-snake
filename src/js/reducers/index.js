import { UPDATE_GRID, RESET_SCORE, INCREASE_SCORE, INITIAL_SPEED, INCREASE_SPEED, SET_SPEED } from '../constants';

const initialState = {
    grid: [],
    score: 0,
    skin: 'default',
    startSpeed: INITIAL_SPEED,
    speed: INITIAL_SPEED
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_GRID:
            return {
                ...state,
                grid: action.payload
            }
        case RESET_SCORE:
            return {
                ...state,
                score: 0
            }
        case INCREASE_SCORE:
            return {
                ...state,
                score: state.score + action.payload
            }
        case INCREASE_SPEED:
            return {
                ...state,
                speed : state.speed + action.payload
            }
        case SET_SPEED:
            return {
                ...state,
                speed : action.payload
            }
        default:
            return state;
    }
};

export default rootReducer;
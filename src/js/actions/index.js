import { UPDATE_GRID, RESET_SCORE, INCREASE_SCORE, SET_SPEED } from '../constants';

export const updateGrid = grid => ({type: UPDATE_GRID, payload: grid});
export const resetScore = () => ({type: RESET_SCORE, payload: null});
export const increaseScore = score => ({type: INCREASE_SCORE, payload: score});
export const setSpeed = speed => ({type: SET_SPEED, payload: speed});
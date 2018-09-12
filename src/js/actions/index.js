import { UPDATE_GRID, RESET_SCORE, INCREASE_SCORE, SET_SPEED, SET_INIT_SPEED, SET_SKIN } from '../constants';

export const updateGrid = grid => ({type: UPDATE_GRID, payload: grid});
export const resetScore = () => ({type: RESET_SCORE, payload: null});
export const increaseScore = score => ({type: INCREASE_SCORE, payload: score});
export const setSpeed = speed => ({type: SET_SPEED, payload: speed});
export const setInitSpeed = speed => ({type: SET_INIT_SPEED, payload: speed});
export const setSkin = skin => ({type: SET_SKIN, payload: skin});
// General constants
export const CANVAS_SIZE = {width: 15, height: 15};
export const INITIAL_SIZE = 3;
export const INITIAL_SPEED = 4;

export const SKINS = ['default', 'bluemood'];

// Grid cells states
export const STATE_EMPTY = 0;
export const STATE_SNAKE_HEAD = 1;
export const STATE_SNAKE_TAIL = 2;
export const STATE_APPLE = 3;

// Directions
export const DIRECTION_UP = 0;
export const DIRECTION_RIGHT = 1;
export const DIRECTION_DOWN = 2;
export const DIRECTION_LEFT = 3;

// Actions types
export const UPDATE_GRID = 'UPDATE_GRID';
export const RESET_SCORE = 'RESET_SCORE';
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const SET_SPEED = 'SET_SPEED';

// Segments types
export const TYPE_UP_DOWN = 'ud';
export const TYPE_LEFT_RIGHT = 'lr';
export const TYPE_UP_LEFT = 'ul';
export const TYPE_UP_RIGHT = 'ur';
export const TYPE_LEFT_DOWN = 'ld';
export const TYPE_RIGHT_DOWN = 'rd';
export const TYPE_UP = 'up';
export const TYPE_DOWN = 'down';
export const TYPE_LEFT = 'left';
export const TYPE_RIGHT = 'right';
import { INITIAL_SIZE, STATE_EMPTY, CANVAS_SIZE, STATE_SNAKE_HEAD, STATE_SNAKE_TAIL, STATE_APPLE, DIRECTION_UP, DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_DOWN, TYPE_UP_DOWN, TYPE_UP_LEFT, TYPE_UP_RIGHT, TYPE_LEFT_DOWN, TYPE_LEFT_RIGHT, TYPE_RIGHT_DOWN, TYPE_UP, TYPE_RIGHT, TYPE_DOWN, TYPE_LEFT } from '../constants';

const convertPos = (pos) => {
    return CANVAS_SIZE.width * pos.y + pos.x;
};

const contains = (a, obj) => {
    for (var i = 0; i < a.length; i++) {
        console.log('trail' + a[i], obj);
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
};

const getExtType = (first, second) => {
    var type = TYPE_UP;
    if (first.x < second.x){
        type = TYPE_LEFT;
    } else if (first.x > second.x){
        type = TYPE_RIGHT;
    } else if (first.y > second.y){
        type = TYPE_DOWN;
    }
    return type;
};

const getSegmentType = (posBefore, posAfter, pos) => {
    var type = TYPE_UP_DOWN;
    if (posBefore.y != posAfter.y && posBefore.x == posAfter.x){
        type = TYPE_UP_DOWN;
    } else if (posBefore.x != posAfter.x && posBefore.y == posAfter.y){
        type = TYPE_LEFT_RIGHT;
    } else if (posBefore.x < pos.x){
        if (pos.y > posAfter.y){
            type = TYPE_UP_LEFT;
        } else {
            type = TYPE_LEFT_DOWN;
        }
    } else if (posBefore.y < pos.y){
        if (pos.x > posAfter.x){
            type = TYPE_UP_LEFT;
        } else {
            type = TYPE_UP_RIGHT;
        }
    } else if (posBefore.x > pos.x){
        if (pos.y > posAfter.y){
            type = TYPE_UP_RIGHT;
        } else {
            type = TYPE_RIGHT_DOWN;
        }
    } else if (posBefore.y > pos.y){
        if (pos.x > posAfter.x){
            type = TYPE_LEFT_DOWN;
        } else {
            type = TYPE_RIGHT_DOWN;
        }
    }
    return type;
}

export const getFreeIndex = (grid) => {
    var indexes = [];
    var idx = grid.indexOf(STATE_EMPTY);
    while (idx != -1) {
        indexes.push(idx);
        idx = grid.indexOf(STATE_EMPTY, idx + 1);
    }
    return indexes[Math.floor((Math.random() * indexes.length) + 1)];
};

export const initCells = (x, y) => {
    var cells = Array(x*y).fill(STATE_EMPTY);
    return cells;
};

export const initPos = (width, height) => {
    return { x: Math.floor(width/2), y: Math.floor(height/2)};
};

export const addSnake = (grid, pos, trail) => {
    var index = convertPos(pos);
    grid[index] = STATE_SNAKE_HEAD + ' ' + getExtType(pos, trail[0]);
    for(var i = 0; i < trail.length; i++){
        var segPos = trail[i];
        if (i == 0) {
           var segType = getSegmentType(pos, trail[1], trail[0]);
        } else if (i > 0 && i < (trail.length - 1)){
            var segType = getSegmentType(trail[i-1], trail[i+1], trail[i]);
        } else {
            segType = getExtType(trail[i-1], trail[i]);
        }
        var segIndex = convertPos(segPos);
        grid[segIndex] = STATE_SNAKE_TAIL + ' ' + segType;
    }
    return grid;
};

export const addApple = (grid, appleIndex) => {
    grid[appleIndex] = STATE_APPLE;
    return grid;
}

export const initTrail = (pos) => {
    var trail = [];
    for(var i = 1; i <= INITIAL_SIZE; i++){
        trail.push({x: pos.x, y: pos.y + i});
    }
    return trail;
}

export const moveSnake = (pos, dir) => {
    switch (dir){
        case DIRECTION_UP:
            if(pos.y == 0){
                return {x: pos.x, y: CANVAS_SIZE.height - 1};
            } else {
                return {x: pos.x, y: pos.y - 1};
            }
        case DIRECTION_DOWN:
            if(pos.y == CANVAS_SIZE.height - 1){
                return {x: pos.x, y: 0};
            } else {
                return {x: pos.x, y: pos.y + 1};
            }
        case DIRECTION_RIGHT:
            if(pos.x == CANVAS_SIZE.width - 1){
                return {x: 0, y: pos.y};
            } else {
                return {x: pos.x + 1, y: pos.y};
            }
        case DIRECTION_LEFT:
            if(pos.x == 0){
                return {x: CANVAS_SIZE.width - 1, y: pos.y};
            } else {
                return {x: pos.x - 1, y: pos.y};
            }
    }
};

export const updateTrail = (trail, newSegment, grow) => {
    trail.unshift(newSegment);
    if (! grow) {
        trail.pop();
    }
    return trail;
};

export const checkAppleCollision = (pos, appleIndex) => {
    var index = convertPos(pos);
    return index == appleIndex;
}

export const checkTrailCollision = (pos, trail) => {
    for (var i = 0; i < trail.length; i++) {
        if (trail[i].y === pos.y && trail[i].x === pos.x) {
            return true;
        }
    }
    return false;
}
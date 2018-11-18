export type State = 'black' | 'white';

export class Stone {
  constructor(public rowIdx, public colIdx, public state: State = null){ 
  }
  toString() {
    return `state: ${this.state}, rowIdx: ${this.rowIdx}, colIdx: ${this.colIdx}`;
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export type Result = -1 | 0 | 1;

export class Step {
  constructor(
    public rowIdx: number, public colIdx: number,
    public state: State, public done = false) {
  }
}

export class Board {
  board: Stone[][];
  number_of_stones = 0;
  number_of_white = 0;
  number_of_black = 0;

  constructor() {
    const board = [];
    function createRow(rowIdx) {
      const row = [];
      for (let colIdx = 0; colIdx < 8; colIdx++) {
        row.push(null);
      }
      return row;
    }
    for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
      const row = createRow(rowIdx);
      board.push(row);
    }
    this.board = board;
    this.init();
  }

  init() {
    this.initStone(3, 3, 'black');
    this.initStone(4, 4, 'black');
    this.initStone(3, 4, 'white');
    this.initStone(4, 3, 'white');
  }

  initStone(rowIdx, colIdx, state: State) {
    this.board[rowIdx][colIdx] = new Stone(rowIdx, colIdx, state);
  }

  //
  put(stone: Stone): Result {
    return this._put(stone.rowIdx, stone.colIdx, stone.state);
  }

  _put(rowIdx: number, colIdx: number, state: State): Result {
    if (this.number_of_stones === 8*8) {
      throw new Error('already game over');
    }
    let stone = this._find(rowIdx, colIdx);
    console.log(`>>> ${rowIdx}, ${colIdx}, ${JSON.stringify(stone)}`);
    if (stone) {
      throw new Error('already exist!');
    }
    if (!this.checkAdjacentStones(rowIdx, colIdx, state)) {
      throw new Error('invalid location no adjacentStones');
    }

    // the position is correct.
    stone = new Stone(rowIdx, colIdx, state);
    this.set(rowIdx, colIdx, stone);
    this.number_of_stones += 1;
    if (state === 'white') {
      this.number_of_white += 1;
    } else {
      this.number_of_black += 1;
    }
    // turn neibouring stones.
    this.flip(rowIdx, colIdx, state);
    if (this.number_of_stones >= 8*8) {
      return (this.number_of_white > this.number_of_black) ? 1 
      : ((this.number_of_white === this.number_of_black)?0:(-1));
    }
    return null;
  }

  isValidLocation(rowIdx: number, colIdx: number, state: State): boolean {
    if (this.number_of_stones == 8 * 8) {
      return false;
    }
    let stone = this._find(rowIdx, colIdx);
    if (stone) {
      return false;
    }
    if (!this.checkAdjacentStones(rowIdx, colIdx, state)) {
      return false;
    }
    return true;
  }

  flip(rowIdx: number, colIdx: number, state: State) {
    for (let ri of [-1, 1]) {
      for (let ci of [-1, 1]) {
        this.single_direction_flip(rowIdx, colIdx, ri, ci, state);
      }
    }
    return false;
  }

  single_direction_flip(rowIdx: number, colIdx: number, ri: number, ci: number, state: State) {
    let nri = rowIdx;
    let nci = colIdx;
    let flip_count = 0;
    while (true) {
      nri += ri;
      nci += ci;
      if (nri < 0 || nci < 0 || nri > 7 || nci > 7) {
        return;
      }
      const stone = this.get(nri, nci);
      if (!stone) {
        return;
      }
      if (stone.state === state) {
        return;
      }
      stone.state = (state === 'black') ? 'white' :'black';
      flip_count += 1;
    }
    if (flip_count > 0) {
      if (state === 'white') {
        this.number_of_white += flip_count;
      } else {
        this.number_of_black += flip_count;
      }
    }
  }

  get(rowIdx: number, colIdx: number): Stone | null {
    return this.board[rowIdx][colIdx];
  }

  set(rowIdx: number, colIdx: number, stone: Stone) {
    this._find(rowIdx, colIdx); // check if it is already there.. 
    this.board[rowIdx][colIdx] = stone;
  }

  _find(rowIdx: number, colIdx: number) {
    let stone = this.get(rowIdx, colIdx);
    if (stone) {
      throw new Error('already stone exist');
    }
    return stone;
  }

  checkAdjacentStones(rowIdx: number, colIdx: number, state: State) {
    for (let ri of [-1, 1]) {
      for (let ci of [-1, 1]) {
        if (this.existOppositeState(rowIdx, colIdx, ri, ci, state)) {
          return true;
        }
      }
    }
    return false;
  }

  existOppositeState(rowIdx: number, colIdx: number, ri, ci, state: State) {
    let nri = rowIdx;
    let nci = colIdx;
    let foundOpposite = false;
    while (true) {
      nri += ri;
      nci += ci;
      if (nri < 0 || nci < 0 || nri > 7 || nci > 7) {
        return false;
      }
      const stone = this.get(nri, nci);
      if (!stone) {
        return false;
      }

      if (!foundOpposite) {
        if (stone.state !== state) {
          foundOpposite = true;
        }
      } else {
        if (stone.state === state) {
          return true;
        }
      }
    }
    return false;
  }

}

export class OthelloSimulator {
  board: Board;
  history: Stone[] = [];
  steps: Step[];

  constructor() {
    this.board = new Board();
  }

  start() {
    this.steps = this.getRandomSteps();
    let state: State = 'white';
    while (true) {
      const stone: Stone = this.getStone(state);
      if (!stone) {
        // game over
        break;
      }
      const result = this.board.put(stone);
      this.history.push(stone);
      state = this.nextState(state); 
      if (result !== null) {
        console.log('game over: result: '+result);
        break;
      }
    }
    this.showHistory();
  }

  nextState(state: State) {
    return (state === 'white') ? 'black' : 'white';
  }

  getStone(state: State) {
    for (const step of this.steps) {
      if (step.done) {
        continue;
      }
      if (!this.board.isValidLocation(step.rowIdx, step.colIdx, step.state)) {
        continue;
      }
      step.done = true;
      return new Stone(step.rowIdx, step.colIdx, step.state);
    }
    return null;
  }

  getRandomSteps() {
    const steps: Step[] = [];
    let counter = 4;
    let state: State = 'white';
    while (true) {
      if (counter >= 64) {
        break;
      }
      const ridx = getRandomInt(8);
      const cidx = getRandomInt(8);
      if ((ridx === 3 || ridx === 4) && ((cidx === 3 || cidx === 4))) {
        continue;
      }

      // if already used?
      for (const step of steps) {
        if (step.rowIdx === ridx && step.colIdx === cidx) {
          continue;
        } else {
          steps.push(new Step(ridx, cidx, state));
          state = this.nextState(state);
          counter += 1;
        }
      }
    }
    return steps;
  }

  showHistory() {
    console.log('history:');
    let n = 0;
    for (const stone of this.history) {
      console.log(`[${n}] ${stone.toString()}`);
      n ++;
    }
  }
}

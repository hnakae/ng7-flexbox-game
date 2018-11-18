//
// othello.component.ts
//
export type State = 'black' | 'white';

export class Stone {
  constructor(public rowIdx, public colIdx, public state: State = null){ 
  }
  clone() {
    return new Stone(this.rowIdx, this.colIdx, this.state);
  }
  toString() {
    return `state: ${this.state}, rowIdx: ${this.rowIdx}, colIdx: ${this.colIdx}`;
  }
}

export type Result = -1 | 0 | 1;

export class Board {

  private static _loopIndexes = [
    { ri: 0, ci: 1 },
    { ri: 0, ci: -1 },
    { ri: 1, ci: 0 },
    { ri: -1, ci: 0 },

    { ri: 1, ci: 1 },
    { ri: 1, ci: -1 },
    { ri: -1, ci: 1 },
    { ri: -1, ci: -1 },
  ];

  board: Stone[][];
  number_of_stones = 0;
  number_of_white = 0;
  number_of_black = 0;
  isGameOver: boolean = false;

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

  isFirstStone() {
    return this.number_of_stones === 5;
  }

  init() {
    this.isGameOver = false;
    this.number_of_stones = 4;
    this.number_of_white = 2;
    this.number_of_black = 2;
    for (let ridx = 0; ridx < 8; ridx++) {
      for (let cidx = 0; cidx < 8; cidx++) {
        this.board[ridx][cidx] = null;
      }
    }
    this.initStone(3, 3, 'black');
    this.initStone(4, 4, 'black');
    this.initStone(3, 4, 'white');
    this.initStone(4, 3, 'white');
  }

  gameInfo() {
    const winner = (this.number_of_white > this.number_of_black) ? 'white' 
    : (this.number_of_white < this.number_of_black)?'black': 'draw';
    return `${this.isGameOver}, winner: ${winner}, white: ${this.number_of_white}, black: ${this.number_of_black}`;
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
    if (stone) {
      throw new Error('already exist!');
    }
    const flipMap = this.checkAdjacentStones(rowIdx, colIdx, state);
    if (flipMap === null) {
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
    this.number_of_stones +1;
    // turn neibouring stones.
    this.flip(rowIdx, colIdx, state, flipMap);
    if (this.number_of_stones >= 8*8) {
      this.isGameOver = true;
      return (this.number_of_white > this.number_of_black) ? 1 
      : ((this.number_of_white === this.number_of_black)?0:(-1));
    }
    return null;
  }

  isValidLocation(rowIdx: number, colIdx: number, state: State) {
    if (this.number_of_stones == 8 * 8) {
      return null;
    }
    let stone = this.get(rowIdx, colIdx);
    if (stone) {
      return null;
    }
    return this.checkAdjacentStones(rowIdx, colIdx, state);
  }

  flip(rowIdx: number, colIdx: number, state: State, flipMap) {
    for (const p of Board._loopIndexes) {
      const name = p.ri + ":" + p.ci;
      if (flipMap[name]) {
        this.single_direction_flip(rowIdx, colIdx, p.ri, p.ci, state);
      }
    }
  }

  single_direction_flip(rowIdx: number, colIdx: number, ri: number, ci: number, state: State) {
    let nri = rowIdx;
    let nci = colIdx;
    let flip_count = 0;
    let foundOpposite = false;
    console.log(`... ${rowIdx}, ${colIdx}`);
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
      if (!foundOpposite) {
        if (stone.state == state) {
          return;
        }
        foundOpposite = true;
      } else {
        if (stone.state == state) {
          break;
        }
      }
      // flip!
      stone.state = state;
      flip_count += 1;
      // console.log('flip_count: ' + flip_count);
    }
    if (flip_count > 0) {
      // console.log(`1 ... W: ${this.number_of_white}, B: ${this.number_of_black}`);
      if (state === 'white') {
        this.number_of_white += flip_count;
        this.number_of_black -= flip_count;
      } else {
        this.number_of_black += flip_count;
        this.number_of_white -= flip_count;
      }
      // console.log(`2 ...  W: ${this.number_of_white},B:  ${this.number_of_black}`);
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
    const flipMap = {};
    let ok = false;
    for (const p of Board._loopIndexes) {
      const b = this.existOppositeState(rowIdx, colIdx, p.ri, p.ci, state);
      if (b) {
        ok = true;
      }
      const name = p.ri + ":" + p.ci;
      flipMap[name] = b;
    }
    if (ok) {
      return flipMap;
    }
    return null;
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
        if (stone.state != state) {
          foundOpposite = true;
        } else {
          return false;
        }
      } else {
        if (stone.state == state) {
          return true;
        }
      }
    }
    return false;
  }
}
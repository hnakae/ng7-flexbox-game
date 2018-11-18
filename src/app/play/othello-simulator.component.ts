//
// othello-simulator.component.ts
//
import { Board, Stone, State } from './othello.component';
import * as Random from 'random-js';

const r = new Random(Random.engines.mt19937().seedWithArray([0x12345678, 0x90abcdef]));

function getRandomInt(max) {
  return r.integer(0, max-1);
}

export class Step {
  constructor(
    public rowIdx: number, public colIdx: number,
    public done = false) {
  }
}
export class OthelloSimulator {
  history: Stone[] = [];
  steps: Step[];
  replay_index = 0;

  constructor(public board: Board) {
  }

  start() {
    this.steps = this.getRandomSteps();
    let state: State = 'black';

    while (true) {
      const stone: Stone = this.getStone(state);
      if (!stone) {
        // game over
        break;
      }
      try {
        const result = this.board.put(stone);
        this.history.push(stone.clone());
        state = this.nextState(state);
        if (result !== null) {
          break;
        }
      } catch(err) {
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
      if (this.board.isValidLocation(step.rowIdx, step.colIdx, state) === null) {
        continue;
      }
      step.done = true;
      return new Stone(step.rowIdx, step.colIdx, state);
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
      let found = false;
      for (const step of steps) {
        if (step.rowIdx === ridx && step.colIdx === cidx) {
          found = true;
          break; // next try.
        }
      }
      if (!found) {
        steps.push(new Step(ridx, cidx));
        state = this.nextState(state);
        counter += 1;
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

  replay() {
    this.board.init();
    this.replay_index = 0;
    return this.next();
  }

  next() {
    if (this.history.length <= this.replay_index) {
      alert('no more steps..');
      return null;
    }
    const stone = this.history[this.replay_index];
    try {
      const r = this.board.put(stone);
      if (r !== null) {
        console.log(`game over: ${this.board.gameInfo()}`);
        return null;
      }
      this.replay_index += 1;
      return stone.state;
    } catch (err) {
      console.log('err: ' + err);
      return null;
    }
  }
}

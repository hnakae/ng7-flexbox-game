import { Component, OnInit } from '@angular/core';

import { Board, State, Stone } from './othello.component';
import { OthelloSimulator } from './othello-simulator.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  board: Board;
  state: State;
  simulator: OthelloSimulator = null;
  audio = null;

  constructor() {
    this.board = new Board();
    this.audio = new Audio('../../assets/sound/POL-air-ducts-short.wav');
    if (typeof this.audio.loop == 'boolean') {
      this.audio.loop = true;
    }
    else {
      this.audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
    }
  }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.board.init();
    this.state = 'black';
    this.simulator = null;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  isWhite(rowIdx, colIdx) {
    const state = this.getState(rowIdx, colIdx);
    return state === 'white';
  }
  isBlack(rowIdx, colIdx) {
    const state = this.getState(rowIdx, colIdx);
    return state === 'black';
  }
  isEmpty(rowIdx, colIdx) {
    const state = this.getState(rowIdx, colIdx);
    return state === null;
  }
  getState(rowIdx, colIdx): State {
    const stone = this.board.get(rowIdx, colIdx);
    if (stone === null) {
      return null;
    }
    return stone.state;
  }

  userPutStone(rowIdx, colIdx) {
    const stone = new Stone(rowIdx, colIdx, this.state);
    try {
      const r = this.board.put(stone);
      if (this.board.isFirstStone()) {
        this.audio.play();
      }
      if (r === null) {
        this.nextState();
      } else {
        alert('Game Over! ' + this.board.gameInfo());
        this.audio.stop();
      }
    } catch (err) {
      alert('invalid location! '+err);
    }
  }

  private nextState() {
    this.state = (this.state === 'white') ? 'black' : 'white';
  }

  //
  simulate() {
    this.reset();
    this.simulator = new OthelloSimulator(this.board);
    this.simulator.start();
  }

  replay() {
    if (!this.simulator) {
      return;
    }
    this.state = this.simulator.replay();
  }
  next() {
    if (!this.simulator) {
      return;
    }
    this.state = this.simulator.next();
  }
}
import { Component, OnInit } from '@angular/core';

import { Board, OthelloSimulator, State, Stone } from './othello.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  board: Board;
  state: State;

  constructor() {
    this.board = new Board();
    this.state = 'black';
  }

  ngOnInit() {
  }

  isWhite(rowIdx, colIdx) {
    const state = this.getState(rowIdx, colIdx);
    // console.log('isWhite: ' + state + ', b: ' + (state === 'white'));
    return state === 'white';
  }
  isBlack(rowIdx, colIdx) {
    const state = this.getState(rowIdx, colIdx);
    // console.log('isBlack: ' + state + ', b: ' + (state === 'black'));
    return state === 'black';
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
    const r = this.board.put(stone);
    if (r === null) {
      this.nextState();
    }
  }

  private nextState() {
    this.state = (this.state === 'white') ? 'black' : 'white';
  }

  simulate() {
    const simulator = new OthelloSimulator();
    simulator.start();
  }
}
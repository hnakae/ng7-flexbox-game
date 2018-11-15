import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

class Cell {
  constructor(public rowIdx, public colIdx) {  }
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  board: Cell[][];
  
  constructor() {
    this.board = this.createBoard();
  }

  createBoard() {
    const board = [];
    function createRow(rowIdx) {
      var row = [];
      for (let colIdx = 0; colIdx < 8; colIdx++) {
        const cell = new Cell(rowIdx, colIdx);
        row.push(cell);
      }
      return row;
    }
    for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
      var row = createRow(rowIdx);
      board.push(row);
    }
    return board; 
  }
  ngOnInit() {
    //Redo this in Typescript
    $(document).ready(function () {

      var move = 1;
      var play = true;

      $("div.inner").click(function () {
        if ($(this).text() == "" && play) {
          if ((move % 2) == 1) {
            $(this).toggleClass("black");
          }
          else {
            $(this).toggleClass("white");
          }
          move++;
          //GAME LOGIC PSEUDOCODE
          //tile object
          //tile id
          //tile color status black/white/other
          //tile click status 
          //

          //
        }
      });

      $(".reset").click(function () {
        location.reload();
      });

      $(".changeColors").click(function () {
        var myColorsArray = ["turquoise", "pink", "lightgray"];
        var tileColorsArray = ["cyan", "darkcyan", "bluegreen"];
        var arrayLength = myColorsArray.length;

        var rand = myColorsArray[Math.floor(Math.random() * arrayLength)];
        var tilerand = tileColorsArray[Math.floor(Math.random() * arrayLength)];

        $("body").css("background", rand);
        $(".box").css("background", tilerand);
      });

    });

    $(function () {
      $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
      })
    })
  }
  
}
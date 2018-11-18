import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

class Cell {
  constructor(public rowIdx, public colIdx){  }
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  board: Cell[][];
  clickStatus: boolean = false;

  constructor() {
    this.board = this.createBoard();
  }

    
  clicked() {
    if (this.clickStatus = false) {
      console.log("as simple as possible");
    }
  }

  createBoard() {
    const board = [];
    function createRow(rowIdx) {
      var row = [];
      for (let colIdx = 0; colIdx < 8; colIdx++) {
        const cell = new Cell(rowIdx, colIdx);
        // cell.setId(rowIdx, colIdx);
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

      let move = 1;
      let play = true;

      

      $("div.inner").click(function () {
        if ($(this).text() == "" && play) {
          //Ternary Operator USE TOGGLECLASS FOR THE TOGGLE FUNCTION
          (((move % 2) == 1) ? $(this).toggleClass("black") : $(this).toggleClass("white"));
          move++;
          
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
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height()/2);
      })
    })
  }

}
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

class Cell {
  rowIdx;
  colIdx;
  id;
  defaultColor = "tomato";
  colorStatus;
  clickStatus : boolean;

  constructor(rowIdx, colIdx) { 
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
  }
  //current color black, white, or other
  // setId(rowIdx, colIdx){
  //   let list = [rowIdx];
  //   let list2 = [colIdx];
  //   for (let i in list) {
  //     let count = 0;
  //     for (let j in list2) {
  //       count++;
  //     }
  //     console.log(count);
  //   }
    
  // }
  // getId(){
  //   console.log()
  // }
  // resetAll() {
    
  // }
  initialClick(){
    let clickStatus = true;
  }
  // switchColor(){

  // }


}
//tile object
//     //tile id
//     //tile color status black/white/other
//     //tile click status 

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

  // resetBoard() {

  //   for (let colIdx = 0; colIdx < 8; colIdx++) {
      
  //   }
     
  //   for(let rowIdx = 0; rowIdx < 8; rowIdx++) {
  //     var row = createRow(rowIdx);
  //     board.push(row);
  //   }

  // }

  ngOnInit() {
    //Redo this in Typescript
    $(document).ready(function () {

      let move = 1;
      let play = true;

      $("div.inner").click(function () {
        if ($(this).text() == "" && play) {
          //Ternary Operator
          (((move % 2) == 1) ? $(this).toggleClass("black") : $(this).toggleClass("white"));
         
          //Replaced by ternary operator
          // if ((move % 2) == 1) {
          //   $(this).toggleClass("black");
          // }
          // else {
          //   $(this).toggleClass("white");
          // }
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
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height()/2);
      })
    })
  }

}
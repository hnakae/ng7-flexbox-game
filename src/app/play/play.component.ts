import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
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
    }
  });

  $(".reset").click(function () {
    location.reload();
  });

}
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
        }
      });

      $(".reset").click(function () {
        location.reload();
      });

      $(".changebgc").click(function () {
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
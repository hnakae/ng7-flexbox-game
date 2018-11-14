import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng7-flexbox';

  public ngOnInit(){
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

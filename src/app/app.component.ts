import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Verkada Take Home';
  max_ts:number = 1503031520;
  min_ts:number = 1500348260;
  interval_ts:number = 20;
  counter:number = (this.max_ts - this.min_ts)/this.interval_ts;
  image_rows:number[]=[];

  waitingForImagesToLoad:boolean = false;

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

      var count = this.image_rows.length;
      if (count == 0){ return; }

      if (!this.waitingForImagesToLoad){
        this.waitingForImagesToLoad = true;
        this.loadSet(30,this.image_rows[count-1][2].ts);
        console.log('Bottom',new Date());
        this.waitingForImagesToLoad = false;
      }

    }
  }

  loadSet = function(_amount,_start_ts){

    console.log("loadSet:",_amount,_start_ts);
    var row = [];

    for(var i=1; i <= _amount; i++){

      var new_ts = _start_ts + (i*this.interval_ts);

      row.push({
        ts: new_ts,
        date: new Date(new_ts*1000),
        url: 'https://hiring.verkada.com/thumbs/'+new_ts+'.jpg'
      })

      if (i%3 == 0 || new_ts >= this.max_ts){

        this.image_rows.push(row);
        row = [];

      }

    }

  }

  ngOnInit(){

    // this.loadSet(30,this.max_ts-(this.interval_ts*10))
    this.loadSet(30,this.min_ts);

  }

}

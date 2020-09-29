import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {
  state = {
    data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    imgHeight: '184px'
  };

  ngOnInit(): void {

  }

  beforeChange(event: any): void {
    console.log('slide ' + event.from + ' to ' + event.to);
  }

  afterChange(event: any): void {
    console.log('slide to ' + event);
  }
}

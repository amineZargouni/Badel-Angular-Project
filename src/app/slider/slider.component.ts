import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent  {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sw-sent-bits',
  templateUrl: './sent-bits.component.html',
  styleUrls: ['./sent-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentBitsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

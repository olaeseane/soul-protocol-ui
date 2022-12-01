import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReceivedBitsService } from './services/received-bits.service';

@Component({
  selector: 'sw-received-bits',
  templateUrl: './received-bits.component.html',
  styleUrls: ['./received-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceivedBitsComponent implements OnInit {
  soulItems$ = this.receivedBitsService.fetchSoulItems();

  constructor(private readonly receivedBitsService: ReceivedBitsService) {}

  ngOnInit(): void {}
}

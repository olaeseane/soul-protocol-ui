import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'sw-sent-bits',
  templateUrl: './sent-bits.component.html',
  styleUrls: ['./sent-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentBitsComponent implements OnInit {
  bitsIds$ = this.dataService.getReceivedBitsIds();

  constructor(private readonly dataService: HomeService) {}

  ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'sw-received-bits',
  templateUrl: './received-bits.component.html',
  styleUrls: ['./received-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceivedBitsComponent implements OnInit {
  bits$ = this.dataService.getBits();

  constructor(private readonly dataService: HomeService) {}

  ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'sw-soul',
  templateUrl: './soul.component.html',
  styleUrls: ['./soul.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoulComponent implements OnInit {
  soul$ = this.dataService.getSoulParams();

  constructor(private readonly dataService: HomeService) {}

  ngOnInit(): void {}
}

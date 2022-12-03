import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Select } from '@ngxs/store';
import { HomeState } from '../../store/home.state';
import { Observable } from 'rxjs';
import { Soul } from '../../../../core/models/soul.model';
import { CoreState } from '../../../../core/state/core.state';

@Component({
  selector: 'sw-soul',
  templateUrl: './soul.component.html',
  styleUrls: ['./soul.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoulComponent implements OnInit {
  @Select(HomeState.soul) soul$: Observable<Soul | null>;
  @Select(CoreState.activeWalletAddress)
  activeWalletAddress$: Observable<string>;

  constructor(private readonly dataService: HomeService) {}

  getSoulImageUrl(soul: Soul | null): string {
    if (soul) {
      return soul.image;
    }

    return 'https://img.freepik.com/premium-vector/loading-icon_167801-435.jpg';
  }

  ngOnInit(): void {}
}

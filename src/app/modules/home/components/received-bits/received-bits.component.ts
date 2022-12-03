import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeState } from '../../store/home.state';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { CoreState } from '../../../../core/state/core.state';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { GetReceivedBitsIds } from '../../store/home.actions';

@Component({
  selector: 'sw-received-bits',
  templateUrl: './received-bits.component.html',
  styleUrls: ['./received-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ReceivedBitsComponent implements OnInit {
  @Select(HomeState.receivedBitsIds) bitsIds$: Observable<string[]>;
  @Select(CoreState.activeWalletAddress)
  activeWalletAddress$: Observable<string>;

  constructor(
    private readonly destroy$: TuiDestroyService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.activeWalletAddress$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.store.dispatch(new GetReceivedBitsIds()));
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { HomeState } from '../../store/home.state';
import { Observable, takeUntil } from 'rxjs';
import { CoreState } from '../../../../core/state/core.state';
import { GetSentBitsIds } from '../../store/home.actions';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'sw-sent-bits',
  templateUrl: './sent-bits.component.html',
  styleUrls: ['./sent-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class SentBitsComponent implements OnInit {
  @Select(HomeState.sentBitsIds) bitsIds$: Observable<string[]>;
  @Select(CoreState.activeWalletAddress)
  activeWalletAddress$: Observable<string>;

  constructor(
    private readonly destroy$: TuiDestroyService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.activeWalletAddress$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.store.dispatch(new GetSentBitsIds()));
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { HomeState } from '../../store/home.state';
import { Observable, takeUntil } from 'rxjs';
import { CoreState } from '../../../../core/state/core.state';
import { GetSentBitsIds } from '../../store/home.actions';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Bit } from '../../../../core/models/bit.model';

@Component({
  selector: 'sw-sent-bits',
  templateUrl: './sent-bits.component.html',
  styleUrls: ['./sent-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentBitsComponent implements OnInit {
  @Select(HomeState.sentBits) bits$: Observable<Bit[]>;
  @Select(CoreState.activeWalletAddress)
  activeWalletAddress$: Observable<string>;

  constructor(
    private readonly destroy$: TuiDestroyService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.activeWalletAddress$
      .pipe(takeUntil(this.destroy$))
      .subscribe((address) => this.store.dispatch(new GetSentBitsIds()));
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Web3Service } from '../../core/services/web3.service';
import { FormControl } from '@angular/forms';
import { TuiInputComponent } from '@taiga-ui/kit';
import { HomeService } from './services/home.service';
import { Select, Store } from '@ngxs/store';
import { CoreState } from '../../core/state/core.state';
import { Observable } from 'rxjs';
import { SetActiveWalletAddress } from '../../core/state/core.actions';

@Component({
  selector: 'sw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @Select(CoreState.myWalletAddress) myWalletAddress$: Observable<string>;
  search = new FormControl(null);

  constructor(
    private readonly web3Service: Web3Service,
    private readonly dataService: HomeService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {}

  onSearch({ nativeFocusableElement }: TuiInputComponent) {
    if (!this.search.value) {
      nativeFocusableElement?.focus();
      return;
    }

    this.store.dispatch(new SetActiveWalletAddress(this.search.value));
  }
}

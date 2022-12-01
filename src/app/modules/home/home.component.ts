import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Web3Service } from '../../core/services/web3.service';
import { FormControl } from '@angular/forms';
import { TuiInputComponent } from '@taiga-ui/kit';
import { HomeService } from './services/home.service';

@Component({
  selector: 'sw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  myWalletAddress$ = this.web3Service.myWalletAddress$;
  search = new FormControl(null);

  constructor(
    private readonly web3Service: Web3Service,
    private readonly dataService: HomeService
  ) {}

  ngOnInit(): void {}

  onSearch({ nativeFocusableElement }: TuiInputComponent) {
    if (!this.search.value) {
      nativeFocusableElement?.focus();
      return;
    }

    this.dataService.checkWallet(this.search.value);
  }
}

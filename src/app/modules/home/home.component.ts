import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Web3Service } from '../../core/services/web3.service';

@Component({
  selector: 'sw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  myWalletAddress$ = this.web3Service.myWalletAddress$;

  constructor(private readonly web3Service: Web3Service) {}

  ngOnInit(): void {}
}

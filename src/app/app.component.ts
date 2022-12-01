import { Component, OnInit } from '@angular/core';
import { Web3Service } from './core/services/web3.service';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TuiDestroyService],
})
export class AppComponent implements OnInit {
  data: string[] | undefined;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly destroy$: TuiDestroyService
  ) {}

  ngOnInit() {
    this.connect();
  }

  connect() {
    this.web3Service.connectAccount().then((response) => {
      this.data = response;
    });
  }
}

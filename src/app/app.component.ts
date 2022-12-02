import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConnectWallet } from './core/state/core.actions';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(new ConnectWallet());
  }
}

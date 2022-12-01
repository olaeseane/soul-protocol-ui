import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';

import { HomeService } from '../services/home.service';
import { GetReceivedBitsIds } from './home.actions';
import { Bit } from '../../../core/models/bit.model';
import { EMPTY } from 'rxjs';

export interface HomeStateModel {
  receivedBitsIds: string[];
  receivedBits: Bit[];
  myWalletAddress: string | null;
  activeWalletAddress?: string;
}

const defaults: HomeStateModel = {
  receivedBitsIds: [],
  receivedBits: [],
  myWalletAddress: null,
};

export const HOME_STATE_NAME = 'home';
export const HOME_STATE_TOKEN = new StateToken<HomeStateModel>(HOME_STATE_NAME);

@State({
  name: HOME_STATE_TOKEN,
  defaults,
})
@Injectable()
export class HomeState {
  constructor(
    private readonly dataService: HomeService,
    private readonly store: Store
  ) {}

  @Action(GetReceivedBitsIds)
  getObjectsList(ctx: StateContext<HomeStateModel>) {
    const state = ctx.getState();

    const activeAddress = state.activeWalletAddress;

    if (activeAddress) {
      return this.dataService
        .getReceivedBitsIds()
        .pipe
        // tap(({ data: projectBuildings }) => {
        //   projectBuildings?.sort((a, b) => {
        //     if (a.planId === null && b.planId === null) {
        //       return 0;
        //     }
        //
        //     if (b.planId === null) {
        //       return -1;
        //     }
        //
        //     return 0;
        //   });
        //
        //   ctx.setState({
        //     ...state,
        //     objectsList: projectBuildings,
        //   });
        // })
        ();
    }

    return EMPTY;
  }
}

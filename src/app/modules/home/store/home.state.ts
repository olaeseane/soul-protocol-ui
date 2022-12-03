import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';

import { HomeService } from '../services/home.service';
import { GetReceivedBitsIds, SaveReceivedBits } from './home.actions';
import { Bit } from '../../../core/models/bit.model';
import { BigNumberish } from '@ethersproject/bignumber';
import { CoreState } from '../../../core/state/core.state';
import { Web3Service } from '../../../core/services/web3.service';
import { convertUint256ArrayToStringArray } from '../utils/converting.utils';

export interface HomeStateModel {
  receivedBitsIds: string[];
  receivedBits: Bit[];
  sentBitsIds: string[];
  sentBits: Bit[];
}

const defaults: HomeStateModel = {
  receivedBitsIds: [],
  receivedBits: [],
  sentBitsIds: [],
  sentBits: [],
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
    private readonly store: Store,
    private readonly web3Service: Web3Service
  ) {}

  @Action(GetReceivedBitsIds)
  async getReceivedBitsIds(ctx: StateContext<HomeStateModel>) {
    const state = ctx.getState();

    const activeWalletAddress = this.store.selectSnapshot(
      CoreState.activeWalletAddress
    );

    const contract = this.web3Service.getContract();

    if (activeWalletAddress && contract) {
      const ids = (await contract['fetchSenderTokens'](
        activeWalletAddress
      )) as BigNumberish[];

      const stringIds = convertUint256ArrayToStringArray(ids);

      ctx.setState({
        ...state,
        receivedBitsIds: stringIds,
        receivedBits: [],
      });
    }
  }

  @Action(SaveReceivedBits)
  async saveReceivedBits(
    ctx: StateContext<HomeStateModel>,
    action: SaveReceivedBits
  ) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      receivedBits: action.receivedBits,
    });
  }

  // Далее селекторы

  @Selector()
  static receivedBitsIds(state: HomeStateModel): String[] {
    return state.receivedBitsIds;
  }

  @Selector()
  static receivedBitsQuantity(state: HomeStateModel): number {
    return state.receivedBitsIds.length;
  }

  @Selector()
  static sentBitsIds(state: HomeStateModel): string[] {
    return state.sentBitsIds;
  }

  @Selector()
  static sentBitsQuantity(state: HomeStateModel): number {
    return state.sentBitsIds.length;
  }
}

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
import { GetReceivedBits, GetReceivedBitsIds } from './home.actions';
import { Bit } from '../../../core/models/bit.model';
import { BigNumberish } from '@ethersproject/bignumber';
import { CoreState } from '../../../core/state/core.state';
import { Web3Service } from '../../../core/services/web3.service';
import {
  convertToBit,
  convertUint256ArrayToStringArray,
} from '../utils/converting.utils';

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
      });
    }
  }

  @Action(GetReceivedBits)
  async getReceivedBits(ctx: StateContext<HomeStateModel>) {
    const state = ctx.getState();

    const activeWalletAddress = this.store.selectSnapshot(
      CoreState.activeWalletAddress
    );

    const contract = this.web3Service.getContract();

    if (activeWalletAddress && contract) {
      const ids = (await contract['fetchSenderTokens'](
        activeWalletAddress
      )) as BigNumberish[];

      const bits: Bit[] = [];
      const stringIds = convertUint256ArrayToStringArray(ids);

      for (const id of stringIds) {
        const bit = (await contract['tokenURI'](id)) as string;
        bits.push(convertToBit(bit));
      }

      ctx.setState({
        ...state,
        receivedBitsIds: stringIds,
        receivedBits: bits,
      });
    }
  }

  // Далее селекторы

  @Selector()
  static receivedBits(state: HomeStateModel): Bit[] {
    return state.receivedBits;
  }

  @Selector()
  static receivedBitsQuantity(state: HomeStateModel): number {
    return state.receivedBits.length;
  }

  @Selector()
  static sentBits(state: HomeStateModel): Bit[] {
    return state.sentBits;
  }

  @Selector()
  static sentBitsQuantity(state: HomeStateModel): number {
    return state.sentBits.length;
  }
}

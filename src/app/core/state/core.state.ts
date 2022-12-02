import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { CoreDataService } from '../services/core-data.service';
import { ConnectWallet, SetActiveWalletAddress } from './core.actions';
import { Web3Service } from '../services/web3.service';

export interface CoreStateModel {
  myWalletAddress: string | null;
  activeWalletAddress: string | null;
}

const defaults: CoreStateModel = {
  myWalletAddress: null,
  activeWalletAddress: null,
};

export const CORE_STATE_NAME = 'Core';
export const CORE_STATE_TOKEN = new StateToken<CoreStateModel>(CORE_STATE_NAME);

@State({
  name: CORE_STATE_TOKEN,
  defaults,
})
@Injectable()
export class CoreState {
  constructor(
    private readonly dataService: CoreDataService,
    private readonly web3Service: Web3Service
  ) {}

  @Action(ConnectWallet)
  async connectWallet(ctx: StateContext<CoreStateModel>) {
    const state = ctx.getState();

    const accounts = await this.web3Service.connectAccount();

    if (accounts) {
      ctx.setState({
        ...state,
        myWalletAddress: accounts[0],
        // activeWalletAddress: accounts[0],
        //TODO отключить моковый кошелек
        activeWalletAddress: '0x34C064b128237DB2B917962c45083Ef140564bD8',
      });
    }
  }

  @Action(SetActiveWalletAddress)
  updateFilter(
    ctx: StateContext<CoreStateModel>,
    action: SetActiveWalletAddress
  ) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      activeWalletAddress: action.address,
    });
  }

  @Selector()
  static myWalletAddress(state: CoreStateModel): string | null {
    return state.myWalletAddress;
  }

  @Selector()
  static activeWalletAddress(state: CoreStateModel): string | null {
    return state.activeWalletAddress;
  }
}

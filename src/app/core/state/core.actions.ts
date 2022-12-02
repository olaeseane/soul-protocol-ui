export enum ActionsType {
  CONNECT_WALLET = '[CORE] Connect wallet',
  SET_ACTIVE_WALLET_ADDRESS = '[CORE] SET_ACTIVE_WALLET_ADDRESS',
}

export class ConnectWallet {
  static readonly type = ActionsType.CONNECT_WALLET;
}

export class SetActiveWalletAddress {
  static readonly type = ActionsType.SET_ACTIVE_WALLET_ADDRESS;
  constructor(public address: string) {}
}

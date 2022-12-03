import { Bit } from '../../../core/models/bit.model';

export enum ActionsType {
  GET_RECEIVED_BITS_IDS = '[HOME] GET_RECEIVED_BITS_IDS',
  SAVE_RECEIVED_BITS = '[HOME] SAVE_RECEIVED_BITS',
  GET_SENT_BITS_IDS = '[HOME] GET_SENT_BITS_IDS',
}

export class GetReceivedBitsIds {
  static readonly type = ActionsType.GET_RECEIVED_BITS_IDS;
}

export class SaveReceivedBits {
  static readonly type = ActionsType.SAVE_RECEIVED_BITS;
  constructor(public receivedBits: Bit[]) {}
}

export class GetSentBitsIds {
  static readonly type = ActionsType.GET_SENT_BITS_IDS;
}

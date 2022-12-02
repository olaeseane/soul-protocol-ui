export enum ActionsType {
  GET_RECEIVED_BITS_IDS = '[HOME] GET_RECEIVED_BITS_IDS',
  GET_RECEIVED_BITS = '[HOME] GET_RECEIVED_BITS',
  GET_SENT_BITS_IDS = '[HOME] GET_SENT_BITS_IDS',
  GET_SENT_BITS = '[HOME] GET_SENT_BITS',
}

export class GetReceivedBitsIds {
  static readonly type = ActionsType.GET_RECEIVED_BITS_IDS;
}

export class GetReceivedBits {
  static readonly type = ActionsType.GET_RECEIVED_BITS;
}

export class GetSentBitsIds {
  static readonly type = ActionsType.GET_SENT_BITS_IDS;
}

export class GetSentBits {
  static readonly type = ActionsType.GET_SENT_BITS;
}

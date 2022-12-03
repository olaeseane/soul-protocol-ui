export type Familiarity =
  | 'online'
  | 'zoom'
  | 'buddy'
  | 'colleague'
  | 'friend'
  | 'family'
  | 'lover';

export type Liking =
  | 'beloved'
  | 'nice'
  | 'funny'
  | 'obscure'
  | 'unpleasant'
  | 'nasty'
  | 'hated';

export type Solidity =
  | 'trusted'
  | 'solid'
  | 'safe'
  | 'unsafe'
  | 'risky'
  | 'critical';

export type Shine = 'shine' | 'blaze' | 'halo';

export type BitType = 'received' | 'sent';

export interface Bit {
  image: string;
  attributes: BitParam[];
}

interface BitParam {
  trait_type: string;
  value: string;
}

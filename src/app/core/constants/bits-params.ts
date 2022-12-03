import { Familiarity, Liking, Shine, Solidity } from '../models/bit.model';

export const FAMILIARITY_LIST: Familiarity[] = [
  'online',
  'zoom',
  'buddy',
  'colleague',
  'friend',
  'family',
  'lover',
];

export const LIKING_LIST: Liking[] = [
  'beloved',
  'nice',
  'funny',
  'obscure',
  'unpleasant',
  'nasty',
  'hated',
];

export const SOLIDITY_LIST: Solidity[] = [
  'trusted',
  'solid',
  'safe',
  'unsafe',
  'risky',
  'critical',
];

export const familiarityMapping = new Map<Familiarity, number>([
  ['online', 1],
  ['zoom', 2],
  ['buddy', 3],
  ['colleague', 4],
  ['friend', 5],
  ['family', 6],
  ['lover', 7],
]);

export const likingMapping = new Map<Liking, number>([
  ['beloved', 1],
  ['nice', 2],
  ['funny', 3],
  ['obscure', 4],
  ['unpleasant', 5],
  ['nasty', 6],
  ['hated', 7],
]);

export const solidityMapping = new Map<Solidity, number>([
  ['trusted', 1],
  ['solid', 2],
  ['safe', 3],
  ['unsafe', 4],
  ['risky', 5],
  ['critical', 6],
]);

export const shiningMapping = new Map<Shine, number>([
  ['empty', 0],
  ['shine', 1],
  ['blaze', 2],
  ['halo', 3],
]);

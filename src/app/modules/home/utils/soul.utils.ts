import {
  Bit,
  Familiarity,
  Liking,
  Shine,
  Solidity,
} from '../../../core/models/bit.model';
import { Soul } from '../../../core/models/soul.model';
import {
  familiarityMapping,
  likingMapping,
  shiningMapping,
  solidityMapping,
} from '../../../core/constants/bits-params';
import {
  familiaritySoulMapping,
  likingSoulMapping,
  shineSoulMapping,
  soliditySoulMapping,
} from '../../../core/constants/soul-params';

export function calculateSoul(receivedBits: Bit[]): Soul {
  const familiarityArray: number[] = [];
  const likingArray: number[] = [];
  const solidityArray: number[] = [];
  const shiningArray: number[] = [];
  const rarityArray: number[] = [];

  receivedBits.forEach((bit) => {
    bit.attributes.forEach((attr) => {
      if (attr.trait_type === 'Familiarity') {
        familiarityArray.push(
          familiarityMapping.get(attr.value as Familiarity) || 0
        );
      }

      if (attr.trait_type === 'Liking') {
        likingArray.push(likingMapping.get(attr.value as Liking) || 0);
      }

      if (attr.trait_type === 'Solidity') {
        solidityArray.push(solidityMapping.get(attr.value as Solidity) || 0);
      }

      if (attr.trait_type === 'Shining') {
        shiningArray.push(shiningMapping.get(attr.value as Shine) || 0);
      }

      if (attr.trait_type === 'Rarity') {
        rarityArray.push((attr.value as string) === 'community' ? 0 : 1);
      }
    });
  });

  const soulFamiliarity = getAverage(familiarityArray);
  const soulLiking = getAverage(likingArray);
  const soulSolidity = getAverage(solidityArray);
  const soulShining = getAverage(shiningArray);
  const soulRarity = getAverage(rarityArray);

  const soul = {
    image: getImagePath(
      soulFamiliarity,
      soulLiking,
      soulSolidity,
      soulShining,
      soulRarity
    ),
    familiarity: familiaritySoulMapping.get(soulFamiliarity) || 'unknown',
    liking: likingSoulMapping.get(soulLiking) || 'unknown',
    solidity: soliditySoulMapping.get(soulSolidity) || 'unknown',
    shining: shineSoulMapping.get(soulShining) || 'unknown',
    rarity: 'unknown',
    era: 'mvp',
    senders: {
      celebrities: 0,
      uncommon: likingArray.length,
      common: 0,
    },
  };

  return soul;
}

function getAverage(arr: number[]): number {
  if (arr.length) {
    const sum = arr.reduce((acc, number) => acc + number, 0);
    const length = arr.length;
    return Math.round(sum / length);
  }

  return 0;
}

function getNearestAvailableNumber(n: number): number {
  const imageAvailableOptions = [1, 4, 7];

  const result = imageAvailableOptions.sort(
    (a, b) => Math.abs(n - a) - Math.abs(n - b)
  )[0];

  return result;
}

function getImagePath(
  soulFamiliarity: number,
  soulLiking: number,
  soulSolidity: number,
  soulShining: number,
  soulRarity: number
): string {
  const imgName = `${getNearestAvailableNumber(
    soulFamiliarity
  )}${getNearestAvailableNumber(soulLiking)}${getNearestAvailableNumber(
    soulSolidity
  )}${soulShining > 1 ? 1 : 0}${soulRarity}`;

  return `https://amber-kind-walrus-924.mypinata.cloud/ipfs/Qmag3irqBk2iKNTJuJrD1yEeaygCkD1yRFRnivyPQzTtiC/nascent/${imgName}.png`;
}

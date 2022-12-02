import { BigNumberish } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { Bit } from '../../../core/models/bit.model';

export const convertUint256ArrayToStringArray = (numbers: BigNumberish[]) => {
  return numbers.map((el) => ethers.utils.formatUnits(el, 0));
};

export const convertToBit = (base64Link: string) => {
  const base64 = ethers.utils.base64.decode(base64Link.split(',')[1]);

  return JSON.parse(new Buffer(base64).toString()) as Bit;
};

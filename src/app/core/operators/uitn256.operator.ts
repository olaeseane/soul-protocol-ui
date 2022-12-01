import { map, Observable } from 'rxjs';
import { BigNumberish } from '@ethersproject/bignumber';
import { ethers } from 'ethers';

export function convertUint256ToString() {
  return function (source: Observable<BigNumberish[]>): Observable<string[]> {
    return source.pipe(
      map((data) => {
        return data.map((el) => ethers.utils.formatUnits(el, 0));
      })
    );
  };
}

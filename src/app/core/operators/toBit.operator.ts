import { map, Observable } from 'rxjs';
import { ethers } from 'ethers';
import { Bit } from '../models/bit.model';

export function toBit() {
  return function (source: Observable<string>): Observable<Bit> {
    return source.pipe(
      map((base64Link) => {
        const base64 = ethers.utils.base64.decode(base64Link.split(',')[1]);

        return JSON.parse(new Buffer(base64).toString()) as Bit;
      })
    );
  };
}

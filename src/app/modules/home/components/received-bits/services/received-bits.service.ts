import { Injectable } from '@angular/core';
import { Web3Service } from '../../../../../core/services/web3.service';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceivedBitsService {
  contract = this.web3Service.getContract();
  readonly myWalletAddress$ = this.web3Service.myWalletAddress$;

  constructor(private readonly web3Service: Web3Service) {}

  fetchSoulItems(): Observable<any> {
    return this.myWalletAddress$.pipe(
      switchMap((address) => {
        if (!address) {
          console.error('Нехватает адреса кошелька');

          return of(null);
        }

        // console.log('countSoulItems ->', ethers.utils.formatEther(countSoulItems));
        return from(this.contract['fetchSenderTokens'](address));
      })
    );
  }
}

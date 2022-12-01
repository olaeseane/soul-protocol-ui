import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Web3Service } from '../../../core/services/web3.service';
import { Soul } from '../../../core/models/soul.model';
import { ethers } from 'ethers';
import { BigNumberish } from '@ethersproject/bignumber';
import { convertUint256ToString } from '../../../core/operators/uitn256.operator';
import { toBit } from '../../../core/operators/toBit.operator';
import { Bit } from '../../../core/models/bit.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  activeWalletAddress$ = new BehaviorSubject<string>('');

  constructor(private readonly web3Service: Web3Service) {
    this.web3Service.myWalletAddress$.subscribe((address) => {
      if (address) {
        const testAddress = '0x34C064b128237DB2B917962c45083Ef140564bD8';
        this.activeWalletAddress$.next(testAddress);

        //TODO включить (убрать мок)
        // this.activeWalletAddress$.next(address);
      }
    });
  }

  checkWallet(address: string) {
    if (address) {
      const testAddress = '0x34C064b128237DB2B917962c45083Ef140564bD8';
      this.activeWalletAddress$.next(testAddress);

      //TODO включить (убрать мок)
      // this.activeWalletAddress$.next(address);

      alert('Проверяем адрес: ' + address);
    }
  }

  getSoulParams() {
    const contract = this.web3Service.getContract();

    return from(
      contract['totalOwners']() as Promise<Soul>

      //TODO PEPEGA заменить на корректный эндпоинт
      // contract['totalSupply'](this.activeWalletAddress) as Promise<Soul>
    );
  }

  getSendQuantity() {
    const contract = this.web3Service.getContract();

    return from(
      contract['totalOwners']() as Promise<number>

      //TODO PEPEGA заменить на корректный эндпоинт
      // contract['totalSupply'](this.activeWalletAddress) as Promise<Soul>
    ).pipe(map((data) => Number(ethers.utils.formatEther(data))));
  }

  getReceivedBitsIds(): Observable<string[]> {
    const contract = this.web3Service.getContract();

    return this.activeWalletAddress$.pipe(
      switchMap((address) => {
        return from(
          contract['fetchSenderTokens'](address) as Promise<BigNumberish[]>
        ).pipe(
          convertUint256ToString(),
          catchError(() => of([] as string[]))
        );
      })
    );
  }

  getBit(bitId: string | null): Observable<Bit | null> {
    if (!bitId) {
      return of(null);
    }

    const contract = this.web3Service.getContract();
    return from(contract['tokenURI'](bitId) as Promise<string>).pipe(toBit());
  }

  getBitOwner(bitId: string | null): Observable<string | null> {
    if (!bitId) {
      return of(null);
    }

    const contract = this.web3Service.getContract();
    return from(contract['ownerOf'](bitId) as Promise<string>);
  }

  getBitSender(bitId: string | null): Observable<string | null> {
    if (!bitId) {
      return of(null);
    }

    const contract = this.web3Service.getContract();
    return from(contract['senderOf'](bitId) as Promise<string>);
  }
}

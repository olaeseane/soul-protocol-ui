import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map } from 'rxjs';
import { Web3Service } from '../../../core/services/web3.service';
import { HttpClient } from '@angular/common/http';
import { Soul } from '../../../core/models/soul.model';
import { ethers } from 'ethers';
import { Bit } from '../../../core/models/bit.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  activeWalletAddress$ = new BehaviorSubject<string>('');
  private activeWalletAddress: string | null = null;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly http: HttpClient
  ) {
    this.web3Service.myWalletAddress$.subscribe((address) => {
      if (address) {
        this.activeWalletAddress = address;
        this.activeWalletAddress$.next(address);
      }
    });
  }

  checkWallet(address: string) {
    if (address) {
      this.activeWalletAddress = address;
      this.activeWalletAddress$.next(address);

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

  getReceivedQuantity() {
    const contract = this.web3Service.getContract();

    return from(
      contract['totalOwners']() as Promise<number>

      //TODO PEPEGA заменить на корректный эндпоинт
      // contract['totalSupply'](this.activeWalletAddress) as Promise<Soul>
    ).pipe(map((data) => Number(ethers.utils.formatEther(data))));
  }

  getSendQuantity() {
    const contract = this.web3Service.getContract();

    return from(
      contract['totalOwners']() as Promise<number>

      //TODO PEPEGA заменить на корректный эндпоинт
      // contract['totalSupply'](this.activeWalletAddress) as Promise<Soul>
    ).pipe(map((data) => Number(ethers.utils.formatEther(data))));
  }

  getBits() {
    const contract = this.web3Service.getContract();

    return from(
      contract['totalOwners']() as Promise<Bit[]>

      //TODO PEPEGA заменить на корректный эндпоинт
    );
  }
}

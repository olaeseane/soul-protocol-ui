import { Injectable } from '@angular/core';
import { Web3Service } from '../../../../../core/services/web3.service';
import { MintBitsParams } from '../send-bits.component';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendBitsService {
  contract = this.web3Service.getContract();

  constructor(private readonly web3Service: Web3Service) {}

  sendBit(params: MintBitsParams) {
    return from(
      this.contract['mintToken'](params.to, {
        familiarity: params.familiarity,
        liking: params.liking,
      })
    );
  }
}

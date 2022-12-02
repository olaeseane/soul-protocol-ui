import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Web3Service } from '../../../core/services/web3.service';
import { Soul } from '../../../core/models/soul.model';
import { toBit } from '../../../core/operators/toBit.operator';
import { Bit } from '../../../core/models/bit.model';
import { Select, Store } from '@ngxs/store';
import { CoreState } from '../../../core/state/core.state';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  @Select(CoreState.activeWalletAddress)
  activeWalletAddress$: Observable<string>;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly store: Store
  ) {}

  getSoulParams() {
    const contract = this.web3Service.getContract();

    return from(
      contract['totalOwners']() as Promise<Soul>

      //TODO PEPEGA заменить на корректный эндпоинт
      // contract['totalSupply'](this.activeWalletAddress) as Promise<Soul>
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

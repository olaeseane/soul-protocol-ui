import { Injectable } from '@angular/core';
import { from, Observable, of, tap } from 'rxjs';
import { Web3Service } from '../../../core/services/web3.service';
import { Soul } from '../../../core/models/soul.model';
import { toBit } from '../../../core/operators/toBit.operator';
import { Bit, BitType } from '../../../core/models/bit.model';
import { Select, Store } from '@ngxs/store';
import { CoreState } from '../../../core/state/core.state';
import { HomeState } from '../store/home.state';
import { SaveReceivedBits } from '../store/home.actions';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  @Select(CoreState.activeWalletAddress)
  activeWalletAddress$: Observable<string>;

  private receivedBits: Bit[] = [];

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

  getBit(bitId: string | null, type: BitType): Observable<Bit | null> {
    if (!bitId) {
      return of(null);
    }

    const contract = this.web3Service.getContract();
    return from(contract['tokenURI'](bitId) as Promise<string>).pipe(
      toBit(),
      tap((bit) => {
        this.saveBit(type, bit);
      })
    );
  }

  getBitOwnerAddress(bitId: string | null): Observable<string | null> {
    if (!bitId) {
      return of(null);
    }

    const contract = this.web3Service.getContract();
    return from(contract['ownerOf'](bitId) as Promise<string>);
  }

  getBitSenderAddress(bitId: string | null): Observable<string | null> {
    if (!bitId) {
      return of(null);
    }

    const contract = this.web3Service.getContract();
    return from(contract['senderOf'](bitId) as Promise<string>);
  }

  saveBit(type: BitType, bit: Bit) {
    if (type === 'received') {
      const receivedBitsQuantity = this.store.selectSnapshot<number>(
        HomeState.receivedBitsQuantity
      );

      this.receivedBits.push(bit);

      if (this.receivedBits.length === receivedBitsQuantity) {
        this.store.dispatch(new SaveReceivedBits(this.receivedBits));
        this.receivedBits = [];
      }
    }
  }
}

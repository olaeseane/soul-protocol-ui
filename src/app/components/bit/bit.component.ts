import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Bit, BitType } from '../../core/models/bit.model';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { HomeService } from '../../modules/home/services/home.service';

@Component({
  selector: 'sw-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class BitComponent implements OnInit {
  @Input() type: BitType = 'received';

  @Input() set bitId(id: string) {
    if (id) {
      this.bit$ = this.dataService.getBit(id, this.type);
      this.bitSender$ = this.dataService.getBitSenderAddress(id);
    }
  }

  bit$ = this.dataService.getBit(this.bitId, this.type);
  bitSender$ = this.dataService.getBitSenderAddress(this.bitId);

  constructor(
    private readonly dataService: HomeService,
    private readonly destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {}

  getBitImageUrl(bit: Bit | null): string {
    if (bit) {
      return `https://amber-kind-walrus-924.mypinata.cloud/ipfs/${
        bit.image.split('//')[1]
      }`;
    }

    return 'https://img.freepik.com/premium-vector/loading-icon_167801-435.jpg';
  }
}

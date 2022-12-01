import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { HomeService } from '../../modules/home/services/home.service';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'sw-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class BitComponent implements OnInit {
  bit$ = this.dataService.getBit(this.bitId);
  bitSender$ = this.dataService.getBitSender(this.bitId);

  @Input() set bitId(id: string) {
    if (id) {
      this.bit$ = this.dataService.getBit(id);
      this.bitSender$ = this.dataService.getBitSender(id);
    }
  }

  constructor(private readonly dataService: HomeService) {}

  ngOnInit(): void {}
}

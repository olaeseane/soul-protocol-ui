import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FAMILIARITY_LIST,
  LIKING_LIST,
  SOLIDITY_LIST,
} from '../../../../core/constants/bits-params';
import {
  Familiarity,
  Liking,
  Shine,
  Solidity,
} from '../../../../core/models/bit.model';
import { SendBitsService } from './services/send-bits.service';

export interface MintBitsParams {
  to: string;
  familiarity: Familiarity;
  liking: Liking;
  solidity: Solidity;
  shine: Shine;
}

@Component({
  selector: 'sw-send-bits',
  templateUrl: './send-bits.component.html',
  styleUrls: ['./send-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendBitsComponent implements OnInit {
  readonly bitForm = new FormGroup({
    to: new FormControl(``, Validators.required),
    familiarity: new FormControl(null, Validators.required),
    liking: new FormControl(null, Validators.required),
    solidity: new FormControl(null, Validators.required),
    shine: new FormControl('shine', Validators.required),
  });

  familiarityList = FAMILIARITY_LIST;
  likingList = LIKING_LIST;
  solidityList = SOLIDITY_LIST;

  constructor(private readonly sendBitsService: SendBitsService) {}

  ngOnInit(): void {}

  onSend() {
    this.sendBitsService.sendBit(this.bitForm.value).subscribe();
  }
}

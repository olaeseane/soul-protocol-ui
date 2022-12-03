import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  readonly bitForm = new UntypedFormGroup({
    to: new UntypedFormControl(``, Validators.required),
    familiarity: new UntypedFormControl(null, Validators.required),
    liking: new UntypedFormControl(null, Validators.required),
    solidity: new UntypedFormControl(null, Validators.required),
    shine: new UntypedFormControl('shine', Validators.required),
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
